"use client";

import { useState, useMemo } from "react";
import { Wifi, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cart-store";
import { useCurrencyStore } from "@/stores/currency-store";
import { formatDataSize } from "@/lib/utils";
import type { EsimPackage } from "@/types/database";
import {
  calculateEffectivePrice,
  formatPriceWithDiscount,
  type PriceSchedule,
} from "@/lib/price-utils";
import { toast } from "sonner";
import { BorderedContainer } from "@/components/bordered-container";

interface GroupedPackagesProps {
  packages: EsimPackage[];
  countryName: string;
  priceSchedules: PriceSchedule[];
}

// Get unique durations from packages
function getUniqueDurations(packages: EsimPackage[]): number[] {
  const durations = new Set<number>();
  packages.forEach((pkg) => {
    if (pkg.duration_unit?.toLowerCase() === "day") {
      durations.add(pkg.duration);
    }
  });
  return Array.from(durations).sort((a, b) => a - b);
}

// Group packages by duration
function groupPackagesByDuration(
  packages: EsimPackage[],
): Map<number, EsimPackage[]> {
  const grouped = new Map<number, EsimPackage[]>();
  packages.forEach((pkg) => {
    if (pkg.duration_unit?.toLowerCase() === "day") {
      const existing = grouped.get(pkg.duration) || [];
      existing.push(pkg);
      grouped.set(pkg.duration, existing);
    }
  });
  // Sort packages within each group by data volume
  grouped.forEach((pkgs, key) => {
    grouped.set(
      key,
      pkgs.sort((a, b) => (a.volume_bytes || 0) - (b.volume_bytes || 0)),
    );
  });
  return grouped;
}

export function GroupedPackages({
  packages,
  countryName,
  priceSchedules,
}: GroupedPackagesProps) {
  const currency = useCurrencyStore((state) => state.currency);
  const addItem = useCartStore((state) => state.addItem);

  const durations = useMemo(() => getUniqueDurations(packages), [packages]);
  const [selectedDuration, setSelectedDuration] = useState<number | "all">(
    "all",
  );

  const groupedPackages = useMemo(
    () => groupPackagesByDuration(packages),
    [packages],
  );

  // Calculate effective prices
  const packagePrices = useMemo(() => {
    const priceMap = new Map<
      string,
      ReturnType<typeof calculateEffectivePrice>
    >();
    packages.forEach((pkg) => {
      priceMap.set(
        pkg.id,
        calculateEffectivePrice(
          pkg.id,
          pkg.price_usd_cents,
          pkg.price_idr,
          priceSchedules,
        ),
      );
    });
    return priceMap;
  }, [packages, priceSchedules]);

  const handleAddToCart = (pkg: EsimPackage) => {
    addItem(pkg);
    toast.success(`${pkg.display_name || pkg.name} ditambahkan ke keranjang`);
  };

  // Filter durations to display based on selection
  const displayDurations =
    selectedDuration === "all"
      ? durations
      : durations.filter((d) => d === selectedDuration);

  return (
    <div className="space-y-4 mb-8">
      {/* Duration Filters */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setSelectedDuration("all")}
          className={[
            "shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-colors",
            selectedDuration === "all"
              ? "border-primary text-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50",
          ].join(" ")}
        >
          All
        </button>
        {durations.map((duration) => (
          <button
            key={duration}
            type="button"
            onClick={() => setSelectedDuration(duration)}
            className={[
              "shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-colors",
              selectedDuration === duration
                ? "border-primary text-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50",
            ].join(" ")}
          >
            {duration} Days
          </button>
        ))}
      </div>

      {/* Grouped Packages */}
      <BorderedContainer>
        <div className="space-y-8 py-2 px-1">
          {displayDurations.map((duration) => {
            const pkgs = groupedPackages.get(duration) || [];
            if (pkgs.length === 0) return null;

            return (
              <div key={duration} className="space-y-4">
                {/* Duration Header */}
                <h3 className="text-xl font-semibold">
                  {duration} {duration === 1 ? "Day" : "Days"}
                </h3>

                {/* Package Cards Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {pkgs.map((pkg) => {
                    const effectivePrice = packagePrices.get(pkg.id);
                    const formatted = effectivePrice
                      ? formatPriceWithDiscount(effectivePrice, currency)
                      : null;

                    return (
                      <PackageCard
                        key={pkg.id}
                        pkg={pkg}
                        effectivePrice={effectivePrice}
                        formatted={formatted}
                        onAddToCart={handleAddToCart}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </BorderedContainer>

      {packages.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            Tidak ada paket tersedia untuk negara ini.
          </p>
        </div>
      )}
    </div>
  );
}

// Individual Package Card Component
function PackageCard({
  pkg,
  effectivePrice,
  formatted,
  onAddToCart,
}: {
  pkg: EsimPackage;
  effectivePrice: ReturnType<typeof calculateEffectivePrice> | undefined;
  formatted: ReturnType<typeof formatPriceWithDiscount> | null;
  onAddToCart: (pkg: EsimPackage) => void;
}) {
  // Determine badge type
  const getBadge = () => {
    if (effectivePrice?.hasDiscount) {
      const discountPercent = effectivePrice.discountPercentage;
      return (
        <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
          Discount {discountPercent}%
        </Badge>
      );
    }
    if (pkg.is_bestseller) {
      return (
        <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
          Best Seller
        </Badge>
      );
    }
    return (
      <Badge className="bg-muted text-muted-foreground hover:bg-muted">
        Essentials
      </Badge>
    );
  };

  return (
    <button
      type="button"
      onClick={() => onAddToCart(pkg)}
      className="group w-full text-left bg-white rounded-2xl border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all flex flex-col min-h-[100px]"
    >
      {/* Top row - Badge and Price label */}
      <div className="flex items-start justify-between gap-4 mb-auto">
        <div className="h-6">{getBadge()}</div>
        <p className="text-sm text-muted-foreground">Price</p>
      </div>

      {/* Bottom content - Package Info and Price */}
      <div className="flex items-center justify-between gap-4 mt-2">
        {/* Left side - Package Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-lg">
            <Wifi className="h-5 w-5 text-primary shrink-0" />
            <span className="font-medium">
              {formatDataSize(pkg.volume_bytes)}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {pkg.duration} {pkg.duration === 1 ? "Day" : "Days"}
            </span>
          </div>
        </div>

        {/* Right side - Price value */}
        <div className="text-right shrink-0">
          <div className="flex items-baseline gap-2 justify-end">
            <span className="text-2xl font-bold">
              {formatted?.final || "$0.00"}
            </span>
            {effectivePrice?.hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatted?.original}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
