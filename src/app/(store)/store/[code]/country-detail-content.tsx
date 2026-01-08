"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BorderedContainer } from "@/components/bordered-container";
import { GroupedPackages } from "./grouped-packages";
import type { EsimPackage } from "@/types/database";
import type { PriceSchedule } from "@/lib/price-utils";
import type { LocationWithPackageCount } from "@/services/locations";
import { isUnlimitedPackage } from "@/types/location";

interface CountryDetailContentProps {
  country: LocationWithPackageCount;
  packages: EsimPackage[];
  priceSchedules: PriceSchedule[];
}

export function CountryDetailContent({
  country,
  packages,
  priceSchedules,
}: CountryDetailContentProps) {
  // Separate packages into fixed and unlimited
  const fixedPackages = packages.filter(
    (pkg) => !isUnlimitedPackage(pkg.data_type),
  );
  const unlimitedPackages = packages.filter((pkg) =>
    isUnlimitedPackage(pkg.data_type),
  );
  const hasFixed = fixedPackages.length > 0;
  const hasUnlimited = unlimitedPackages.length > 0;

  // Use state for tab switching
  const [activeTab, setActiveTab] = useState<"prepaid" | "unlimited">(
    hasFixed ? "prepaid" : "unlimited",
  );

  // Determine which packages to display
  const displayPackages = activeTab === "prepaid" ? fixedPackages : unlimitedPackages;

  return (
    <div className="flex flex-col w-full gap-12 -mt-24">
      {/* Hero Section with Background */}
      <div>
        <div className="relative bg-primary rounded-0 m-0 lg:rounded-4xl lg:m-4 p-4 pt-32 h-[320px] overflow-hidden">
          {country.imageUrl && (
            <Image
              src={country.imageUrl}
              alt={`${country.name} background`}
              fill
              className="object-cover -z-10"
              priority
            />
          )}
        </div>

        <div className="container mx-auto max-w-6xl px-4 -mt-48 relative z-10">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm">
            <Link
              href="/store"
              className="text-primary-foreground/70 hover:text-foreground transition-colors"
            >
              Store
            </Link>
            <span className="text-primary-foreground/70"> / </span>
            <span className="text-primary-foreground">{country.name}</span>
          </div>

          <BorderedContainer className="bg-transparent">
            <div className="rounded-3xl p-8 bg-white">
              {/* Country Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted shadow-sm">
                    <Image
                      src={country.flagUrl}
                      alt={country.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-semibold mb-2">
                      {country.name}
                    </h1>
                    <p className="text-muted-foreground">
                      {country.packageCount} Prepaid Plan
                      {country.hasUnlimitedPackages && " & Unlimited Plan"}
                    </p>
                  </div>
                </div>
                {country.popular && (
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Popular
                  </span>
                )}
              </div>

              {/* Tabs inside same card */}
              {hasFixed && hasUnlimited && (
                <div className="mt-6">
                  <div className="inline-flex h-auto bg-muted/50 p-1 rounded-full">
                    <button
                      type="button"
                      onClick={() => setActiveTab("prepaid")}
                      className={[
                        "rounded-full px-6 py-2 transition-all",
                        activeTab === "prepaid"
                          ? "bg-white text-foreground shadow-sm"
                          : "bg-transparent text-muted-foreground",
                      ].join(" ")}
                    >
                      Prepaid
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("unlimited")}
                      className={[
                        "rounded-full px-6 py-2 transition-all",
                        activeTab === "unlimited"
                          ? "bg-white text-foreground shadow-sm"
                          : "bg-transparent text-muted-foreground",
                      ].join(" ")}
                    >
                      Unlimited
                    </button>
                  </div>
                </div>
              )}
            </div>
          </BorderedContainer>

          {/* Packages */}
          <div className="mt-6">
            <GroupedPackages
              packages={hasFixed && hasUnlimited ? displayPackages : packages}
              countryName={country.name}
              priceSchedules={priceSchedules}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
