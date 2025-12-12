import { createConfig, http } from "wagmi"
import { base, baseSepolia } from "wagmi/chains"
import { injected } from "wagmi/connectors"

// Note: WalletConnect removed due to Next.js 16 Turbopack incompatibility
// with @walletconnect/ethereum-provider dependencies (pino/thread-stream)
// Users can connect via injected wallets (MetaMask, Coinbase Wallet, etc.)

export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  connectors: [injected()],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})
