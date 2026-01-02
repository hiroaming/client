import { Button } from "@/components/ui/button"
import { BorderedContainer } from "@/components/bordered-container"
import { cn } from "@/lib/utils"
import { IdCard, DamIcon, Tag, Gift, Wallet } from "lucide-react"

function SolanaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      aria-hidden="true"
      className={cn("h-14 w-14", className)}
    >
      <defs>
        <linearGradient id="sol" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00FFA3" />
          <stop offset="50%" stopColor="#A0F" />
          <stop offset="100%" stopColor="#00E0FF" />
        </linearGradient>
      </defs>
      <path
        fill="url(#sol)"
        d="M54.6 168.2c2.5-2.6 6-4 9.6-4h160.2c8.7 0 13 10.6 6.8 16.8l-29.8 30.4c-2.5 2.6-6 4-9.6 4H31.6c-8.7 0-13-10.6-6.8-16.8l29.8-30.4z"
      />
      <path
        fill="url(#sol)"
        d="M54.6 44.8c2.6-2.6 6.1-4 9.7-4h160.1c8.7 0 13 10.6 6.8 16.8L201.4 88c-2.6 2.6-6.1 4-9.7 4H31.6c-8.7 0-13-10.6-6.8-16.8l29.8-30.4z"
      />
      <path
        fill="url(#sol)"
        d="M201.4 106.6c-2.6-2.6-6.1-4-9.7-4H31.6c-8.7 0-13 10.6-6.8 16.8l29.8 30.4c2.6 2.6 6.1 4 9.7 4h160.1c8.7 0 13-10.6 6.8-16.8l-29.8-30.4z"
      />
    </svg>
  )
}

export function WhyChooseHiRoamingSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl">
            Why Choose <span className="text-primary">HiRoaming</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            HiRoaming is built for modern travelers who want freedom, flexibility, and better value—without the usual roaming headaches.
          </p>
        </div>

        <BorderedContainer className="rounded-2xl" innerClassName="rounded-2xl">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Anonymous Mode */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-2 text-lg font-semibold">Anonymous Mode</div>
              <p className="mb-6 text-sm text-muted-foreground">
                Stay connected without exposing personal data. Perfect for users who value privacy and security.
              </p>

              <div className="relative rounded-xl bg-muted/60 p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg bg-background px-3 py-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      <DamIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="h-2.5 w-28 rounded bg-muted" />
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-background px-3 py-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      <IdCard className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="h-2.5 w-24 rounded bg-muted" />
                  </div>
                </div>

                <div className="absolute -right-3 -bottom-3 flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-md">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/15">
                    <DamIcon className="h-4 w-4" />
                  </span>
                  Fully Anonymous • No Personal Data
                </div>
              </div>
            </div>

            {/* Flexible Data Packages (wide) */}
            <div className="rounded-2xl border border-border bg-black p-6 text-white shadow-sm lg:col-span-2">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-md">
                  <div className="mb-2 text-lg font-semibold">Flexible</div>
                  <div className="mb-4 text-2xl font-semibold leading-tight">Data Packages</div>
                  <p className="text-sm text-white/70">
                    Choose plans that fit your needs—daily, weekly, or custom data options you can adjust anytime.
                  </p>
                </div>

                <div className="w-full max-w-xl rounded-2xl bg-white p-5 text-foreground shadow-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">
                        🇺🇸
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">United States of America</div>
                        <div className="mt-2 text-xl font-semibold">500MB/Day</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Total 7 Days</div>
                      <div className="mt-1 text-2xl font-bold">$7</div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {["3 Days", "7 Days", "14 Days", "30 Days"].map((label) => (
                      <div
                        key={label}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs",
                          label === "7 Days"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-muted-foreground"
                        )}
                      >
                        {label}
                      </div>
                    ))}
                    <div className="flex-1" />
                    <Button size="sm" className="rounded-full bg-black text-white hover:bg-black/90">
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Affordable Pricing */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-2 text-lg font-semibold">Affordable Pricing</div>
              <p className="mb-6 text-sm text-muted-foreground">
                Enjoy competitive eSIM plans designed to give you the best value, no hidden fees, no surprises.
              </p>

              <div className="rounded-2xl bg-black p-5 text-white">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90">
                  <Tag className="h-3.5 w-3.5" />
                  Promo! e-sim 20% off!
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-lg">Starting from</div>
                  <div className="flex items-end gap-2">
                    <div className="text-sm text-white/40 line-through">$5</div>
                    <div className="text-3xl font-bold text-primary">$3</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Redeemable Points */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-2 text-lg font-semibold">Redeemable Points</div>
              <p className="mb-6 text-sm text-muted-foreground">
                Earn points every time you top up and redeem them for discounts on your next data package.
              </p>

              <div className="rounded-2xl bg-gradient-to-t rotate-4 from-[#1D9387] to-[#27BC98] p-5 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold">John Doe</div>
                    <div className="mt-3 flex items-center gap-2">
                      <Gift className="h-4 w-4" />
                      <div className="text-lg font-semibold">520 Points</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="rounded-full bg-white/20 px-3 py-1 text-xs">Member</div>
                    <Button size="sm" variant="secondary" className="rounded-full">
                      Redeem
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Crypto Payments */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-2 text-lg font-semibold">Crypto Payments Supported</div>
              <p className="mb-6 text-sm text-muted-foreground">
                Pay with crypto for faster, borderless, and more flexible transactions worldwide.
              </p>

              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Wallet className="h-4 w-4" />
                  Wallet ready
                </div>

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black">
                  <SolanaMark className="h-12 w-12" />
                </div>
              </div>
            </div>
          </div>
        </BorderedContainer>
      </div>
    </section>
  )
}



