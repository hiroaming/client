"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, Loader2 } from "lucide-react"
import {
  useAccount,
  useConnect,
  useDisconnect,
  useChainId,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi"
import { base, baseSepolia } from "wagmi/chains"
import type { NetworkPaymentRequirements, PaymentStatus, NetworkType } from "@/types/x402"
import { NETWORK_TO_CAIP2 } from "@/types/x402"

interface EVMWalletConnectProps {
  network: "base" | "base-sepolia"
  paymentRequirements: NetworkPaymentRequirements
  onStatusChange: (status: PaymentStatus) => void
  onSuccess: (paymentPayload: string) => void
  onError: (error: string) => void
}

// ERC-20 transfer ABI
const ERC20_ABI = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const

export function EVMWalletConnect({
  network,
  paymentRequirements,
  onStatusChange,
  onSuccess,
  onError,
}: EVMWalletConnectProps) {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const [isProcessing, setIsProcessing] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>()

  const targetChainId = network === "base" ? base.id : baseSepolia.id
  const targetChain = network === "base" ? base : baseSepolia
  const isCorrectChain = chainId === targetChainId

  // USDC contract addresses
  const usdcAddress =
    network === "base"
      ? "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
      : "0x036CbD53842c5426634e7929541eC2318f3dCF7e"

  // Write contract hook for ERC-20 transfer
  const { writeContract, isPending: isWritePending } = useWriteContract()

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed && txHash && address) {
      console.log("[EVM] Transaction confirmed:", txHash)

      // Create payment payload with transaction hash
      const caip2Network = NETWORK_TO_CAIP2[network as NetworkType]
      const paymentPayload = JSON.stringify({
        x402Version: 1,
        scheme: "exact",
        network: caip2Network,
        payload: {
          transactionHash: txHash,
          from: address,
          to: paymentRequirements.payTo,
          amount: paymentRequirements.maxAmountRequired,
        },
      })

      setIsProcessing(false)
      onSuccess(paymentPayload)
    }
  }, [isConfirmed, txHash, address, network, paymentRequirements, onSuccess])

  const handleConnect = async () => {
    onStatusChange("connecting")
    try {
      // Try to connect with injected wallet (MetaMask, etc.)
      const injectedConnector = connectors.find((c) => c.id === "injected")
      if (injectedConnector) {
        connect({ connector: injectedConnector })
      } else if (connectors[0]) {
        connect({ connector: connectors[0] })
      }
    } catch {
      onStatusChange("idle")
      onError("Failed to connect wallet")
    }
  }

  const handleSwitchChain = async () => {
    try {
      switchChain({ chainId: targetChainId })
    } catch {
      onError("Failed to switch network")
    }
  }

  const handlePayment = async () => {
    if (!address || !paymentRequirements) return

    setIsProcessing(true)
    onStatusChange("signing")

    try {
      // Parse amount (USDC has 6 decimals)
      // maxAmountRequired is already in atomic units (e.g., "600000" for $0.60)
      const amount = BigInt(paymentRequirements.maxAmountRequired)

      console.log("[EVM] Starting direct transfer:", {
        from: address,
        to: paymentRequirements.payTo,
        amount: amount.toString(),
        usdcContract: usdcAddress,
        network,
      })

      // Submit transfer transaction - user pays gas
      writeContract(
        {
          address: usdcAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "transfer",
          args: [paymentRequirements.payTo as `0x${string}`, amount],
          chainId: targetChainId,
        },
        {
          onSuccess: (hash) => {
            console.log("[EVM] Transaction submitted:", hash)
            setTxHash(hash)
            onStatusChange("verifying")
          },
          onError: (error) => {
            console.error("[EVM] Transaction error:", error)
            setIsProcessing(false)
            onStatusChange("idle")

            let errorMessage = "Transaction failed"
            if (error.message.includes("insufficient funds")) {
              errorMessage = "Insufficient ETH for gas fee"
            } else if (error.message.includes("user rejected") || error.message.includes("User rejected")) {
              errorMessage = "Transaction rejected by user"
            } else if (error.message.includes("transfer amount exceeds balance")) {
              errorMessage = "Insufficient USDC balance"
            }

            onError(errorMessage)
          },
        }
      )
    } catch (error) {
      console.error("[EVM] Payment error:", error)
      setIsProcessing(false)
      onStatusChange("idle")
      onError(error instanceof Error ? error.message : "Payment failed")
    }
  }

  // Auto-switch chain when connected but on wrong chain
  useEffect(() => {
    if (isConnected && !isCorrectChain) {
      // Small delay to ensure stable state
      const timer = setTimeout(handleSwitchChain, 500)
      return () => clearTimeout(timer)
    }
  }, [isConnected, isCorrectChain])

  const isLoading = isProcessing || isWritePending || isConfirming

  if (!isConnected) {
    return (
      <Button className="w-full" onClick={handleConnect} disabled={isConnecting}>
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </>
        )}
      </Button>
    )
  }

  if (!isCorrectChain) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">
          Please switch to {targetChain.name}
        </p>
        <Button className="w-full" onClick={handleSwitchChain}>
          Switch to {targetChain.name}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Connected:</span>
        <span className="font-mono">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </div>

      {/* Gas fee notice */}
      <p className="text-xs text-muted-foreground text-center">
        You will pay a small gas fee in ETH for this transaction
      </p>

      <Button className="w-full" onClick={handlePayment} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isConfirming ? "Confirming..." : "Processing..."}
          </>
        ) : (
          "Pay with USDC"
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-full"
        onClick={() => disconnect()}
      >
        Disconnect
      </Button>
    </div>
  )
}
