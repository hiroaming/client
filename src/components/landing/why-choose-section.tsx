import { Button } from "@/components/ui/button";
import { BorderedContainer } from "@/components/bordered-container";
import { cn } from "@/lib/utils";
import {
  IdCard,
  DamIcon,
  Tag,
  Gift,
  Wallet,
  UserCircleIcon,
  ChevronRight,
  Coins,
  CirclePoundSterling,
} from "lucide-react";

export function WhyChooseHiRoamingSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl">
            Why Choose <span className="text-primary">HiRoaming</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            HiRoaming is built for modern travelers who want freedom,
            flexibility, and better value—without the usual roaming headaches.
          </p>
        </div>

        <BorderedContainer className="rounded-2xl" innerClassName="rounded-2xl">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Anonymous Mode */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm overflow-hidden">
              <div className="mb-4 text-2xl font-semibold">Anonymous Mode</div>
              <p className="mb-6 text-sm text-muted-foreground">
                Buy ESIM without exposing your personal data. Name, emails,
                account are optional!
              </p>

              <div className="relative rounded-xl bg-muted/60 p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg bg-background px-3 py-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      <UserCircleIcon className="h-5 w-5" />
                    </div>
                    <div className="h-2.5 w-28 rounded bg-muted" />
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-background px-3 py-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      <IdCard className="h-5 w-5" />
                    </div>
                    <div className="h-2.5 w-24 rounded bg-muted" />
                  </div>
                </div>
                <div className="absolute top-0 right-0">
                  <div className="flex flex-col items-center justify-center">
                    <div className="rounded-full bg-primary text-secondary-foreground flex items-center justify-center w-24 h-24 p-2 z-1">
                      <img src="/detective.svg" alt="Anonymous" />
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-black px-3 py-2 text-xs font-bold text-primary-foreground shadow-md scale-[1.5] rotate-4">
                      Fully Anonymous <br /> No Personal Data
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flexible Data Packages (wide) */}
            <div className="rounded-3xl border border-border bg-black p-8 text-white shadow-sm lg:col-span-2 overflow-hidden">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-center">
                {/* Left copy */}
                <div className="max-w-md">
                  <h3 className="text-2xl font-normal leading-tight md:text-4xl">
                    Flexible
                    <br />
                    Data Packages
                  </h3>
                  <p className="mt-6 text-base text-white/50">
                    Choose plans that fit your needs—daily, weekly, or custom
                    data options you can adjust anytime.
                  </p>
                </div>

                {/* Right product card */}
                <div className="relative w-full rounded-3xl bg-white p-6 text-foreground shadow-lg">
                  <div className="absolute right-6 top-6 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    ESIM
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[1fr_220px] lg:items-stretch">
                    {/* Plan info */}
                    <div className="pr-0 lg:pr-2">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted text-2xl">
                          🇺🇸
                        </div>
                        <div className="text-xl font-semibold text-foreground">
                          United States of America
                        </div>
                      </div>

                      <div className="mt-6 text-4xl font-semibold tracking-tight">
                        500MB
                        <span className="font-normal text-muted-foreground">
                          /Day
                        </span>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        {["3 Days", "7 Days", "14 Days", "30 Days"].map(
                          (label) => (
                            <div
                              key={label}
                              className={cn(
                                "rounded-full border px-4 py-2 text-sm",
                                label === "7 Days"
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border bg-white text-muted-foreground"
                              )}
                            >
                              {label}
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Price panel */}
                    <div className="flex flex-col justify-between rounded-2xl bg-muted/40 p-6">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Total 7 Days
                        </div>
                        <div className="mt-2 text-4xl font-semibold">$7</div>
                      </div>
                      <Button className="mt-6 h-12 rounded-full bg-black px-8 text-white hover:bg-black/90">
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Affordable Pricing */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-4 text-2xl font-semibold">
                Affordable Pricing
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Enjoy competitive eSIM plans designed to give you the best
                value, no hidden fees, no surprises.
              </p>

              <div className="rounded-2xl bg-black p-5 text-white">
                <div className="inline-flex mb-4 items-center rounded-full border border-[#E4E4E766] transition-shadow text-sm">
                  <div className="bg-[#E0F8F3] text-primary px-2 py-1.5 rounded-full font-medium text-xs ml-1 mt-1 mb-1">
                    Promo!
                  </div>
                  <div className="px-1 py-1 text-sm font-medium">
                    e-sim 20% off!
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground mr-3" />
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-lg">Starting from</div>
                  <div className="flex items-end gap-2">
                    <div className="text-2xl text-white/40 line-through">
                      $5
                    </div>
                    <div className="text-3xl font-bold text-primary">$3</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Redeemable Points */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-4 text-2xl font-semibold">
                Redeemable Points
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Earn points every time you top up and redeem them for discounts
                on your next data package.
              </p>

              <div className="rounded-2xl bg-linear-to-t rotate-2 from-[#1D9387] to-[#27BC98] p-5 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold">John Doe</div>
                    <div className="mt-3 flex items-center gap-2">
                      <CirclePoundSterling className="h-4 w-4 text-yellow-300" />
                      <div className="text-lg font-semibold">520 Points</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="rounded-full bg-white/20 px-3 py-1 text-xs">
                      Member
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full"
                    >
                      Redeem
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Crypto Payments */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm grid grid-cols-2 overflow-hidden">
              <div className="flex-col">
                <div className="mb-4 text-2xl font-semibold">
                  Crypto Payments Supported
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Pay with crypto for faster, borderless, and more flexible
                  transactions worldwide.
                </p>
              </div>

              <div className="flex justify-end items-end">
                <div className="flex p-4 items-center scale-[2.5] justify-center rounded-full bg-black">
                  <img src="/solana.svg" alt="Solana" className="h-12 w-12" />
                </div>
              </div>
            </div>
          </div>
        </BorderedContainer>
      </div>
    </section>
  );
}
