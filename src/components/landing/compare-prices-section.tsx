import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BorderedContainer } from "@/components/bordered-container";
import { cn } from "@/lib/utils";

type ProviderKey = "ubigi" | "airalo" | "holafly" | "hiroaming";

type CompareRow = {
  label: string;
  amount: string;
  duration: string;
  prices: Record<ProviderKey, string>;
  best?: ProviderKey;
};

const providers: Array<{
  key: ProviderKey;
  name: string;
  logo?: string;
  className?: string;
}> = [
  { key: "ubigi", name: "Ubigi", logo: "/esim/ubigi.png" },
  { key: "airalo", name: "airalo", logo: "/esim/airalo.png" },
  { key: "holafly", name: "Holafly", logo: "/esim/holafly.png" },
  { key: "hiroaming", name: "HiRoaming", className: "text-primary" },
];

const rows: CompareRow[] = [
  {
    label: "United States",
    amount: "5GB",
    duration: "15 days",
    prices: {
      ubigi: "$12.00",
      airalo: "$15.00",
      holafly: "$19.00",
      hiroaming: "$12.00",
    },
    best: "hiroaming",
  },
  {
    label: "Europe",
    amount: "10GB",
    duration: "30 days",
    prices: {
      ubigi: "$22.00",
      airalo: "$28.00",
      holafly: "$34.00",
      hiroaming: "$18.00",
    },
    best: "hiroaming",
  },
  {
    label: "Asia Pacific",
    amount: "3GB",
    duration: "30 days",
    prices: {
      ubigi: "$22.00",
      airalo: "$28.00",
      holafly: "$34.00",
      hiroaming: "$16.00",
    },
    best: "hiroaming",
  },
  {
    label: "Global",
    amount: "5GB",
    duration: "30 days",
    prices: {
      ubigi: "$69.00",
      airalo: "$89.00",
      holafly: "$99.00",
      hiroaming: "$45.00",
    },
    best: "hiroaming",
  },
];

function BestBadge() {
  return (
    <span className="ml-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      Best
    </span>
  );
}

export function ComparePricesSection() {
  return (
    <section id="compare-prices" className="container mx-auto">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="mb-2 text-5xl font-normal leading-none tracking-normal">
            <span className="text-primary">Compare</span>{" "}
            <span className="text-foreground">Prices</span>
          </h2>
          <p className="text-muted-foreground">
            Flexible options for every type of traveler
          </p>
        </div>

        <Button
          className="h-12 rounded-full px-8 bg-primary hover:bg-primary/90"
          asChild
        >
          <Link href="/store">Shop All Plan</Link>
        </Button>
      </div>

      <BorderedContainer
        className="rounded-2xl"
        innerClassName="rounded-2xl bg-gray-100"
      >
        <div className="rounded-2xl bg-white p-2 sm:p-4">
          <div className="overflow-x-auto">
            <div className="min-w-[980px] rounded-2xl overflow-hidden">
              {/* Table wrapper with relative positioning */}
              <div className="relative">
                {/* Seamless background for HiRoaming column - spans full height */}
                <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                  <div className="grid grid-cols-[260px_repeat(4,1fr)] h-full">
                    <div className="col-start-5 col-end-6 bg-muted/40" />
                  </div>
                </div>

                {/* Header Row */}
                <div className="grid grid-cols-[260px_repeat(4,1fr)] items-center border-b border-border relative z-10">
                  <div className="py-10" />
                  {providers.map((p) => (
                    <div
                      key={p.key}
                      className={cn(
                        "flex items-center justify-center py-10 relative z-10",
                        p.className
                      )}
                    >
                      {p.logo ? (
                        <Image
                          src={p.logo}
                          alt={p.name}
                          width={200}
                          height={40}
                          className="object-contain h-24 translate-x-10"
                        />
                      ) : (
                        <span className="text-2xl font-semibold text-foreground/80">
                          {p.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Body Rows */}
                {rows.map((row, rowIdx) => (
                  <div
                    key={row.label}
                    className={cn(
                      "grid grid-cols-[260px_repeat(4,1fr)] items-center border-b border-border relative z-10",
                      rowIdx === rows.length - 1 && "border-b-0"
                    )}
                  >
                    {/* Plan cell */}
                    <div className="px-6 py-10 relative z-10">
                      <div className="text-base font-medium text-foreground">
                        {row.label}
                      </div>
                      <div className="mt-2 flex items-baseline gap-3">
                        <div className="text-3xl font-medium text-primary">
                          {row.amount}
                        </div>
                        <div className="text-base text-muted-foreground">
                          {row.duration}
                        </div>
                      </div>
                    </div>

                    {/* Provider cells */}
                    {providers.map((p) => {
                      const isHi = p.key === "hiroaming";
                      const isBest = row.best === p.key;
                      return (
                        <div
                          key={`${row.label}-${p.key}`}
                          className={cn(
                            "px-6 py-10 text-center relative z-10",
                            isHi && "text-foreground"
                          )}
                        >
                          {isHi ? (
                            <div className="flex items-center justify-center">
                              <span className="text-base font-medium text-foreground">
                                {row.prices[p.key]}
                              </span>
                              {isBest ? <BestBadge /> : null}
                            </div>
                          ) : (
                            <span className="text-base text-muted-foreground">
                              {row.prices[p.key]}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BorderedContainer>
    </section>
  );
}
