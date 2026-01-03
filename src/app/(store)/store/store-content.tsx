"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Globe, ChevronRight, ArrowRight } from "lucide-react";
import { StoreHero } from "@/components/store/store-hero";
import { BorderedContainer } from "@/components/bordered-container";
import { DestinationCard } from "@/components/landing/destination-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EsimBadge } from "@/components/ui/esim-badge";
import { useCurrencyStore } from "@/stores/currency-store";
import type {
  LocationWithPackageCount,
  RegionWithPackageCount,
} from "@/services/locations";
import { filterLocations } from "@/lib/locations";
import { CTASection } from "@/components/landing/cta-section";

interface StoreContentProps {
  countries: LocationWithPackageCount[];
  regions: RegionWithPackageCount[];
}

function formatMinPrice(
  priceUsdCents: number,
  priceIdr: number,
  currency: "USD" | "IDR"
): string {
  if (currency === "USD") {
    // esim-access format: 10000 = $1
    const dollars = priceUsdCents / 10000;
    return `$${dollars.toFixed(2)}`;
  }
  return `Rp ${priceIdr.toLocaleString("id-ID")}`;
}

export function StoreContent({ countries, regions }: StoreContentProps) {
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("A");
  const currency = useCurrencyStore((state) => state.currency);

  // Filter countries based on search (used in "All Country" section)
  const filteredCountries = useMemo(
    () => filterLocations(countries, search),
    [countries, search]
  );

  // Get popular countries
  const popularCountries = useMemo(() => {
    return countries.filter((c) => c.popular).slice(0, 9);
  }, [countries]);

  // Get all regions for Regions tab (same as Paket Regional section)
  const allRegions = useMemo(() => {
    return regions;
  }, [regions]);

  // Get all countries for Global tab
  const allCountries = useMemo(() => {
    return countries;
  }, [countries]);

  // Group countries by first letter for alphabet pills
  const allCountriesByLetter = useMemo(() => {
    const grouped: Record<string, LocationWithPackageCount[]> = {};
    allCountries.forEach((country) => {
      const letter = country.name.charAt(0).toUpperCase();
      (grouped[letter] ||= []).push(country);
    });
    return grouped;
  }, [allCountries]);

  const filteredCountriesByLetter = useMemo(() => {
    const grouped: Record<string, LocationWithPackageCount[]> = {};
    filteredCountries.forEach((country) => {
      const letter = country.name.charAt(0).toUpperCase();
      (grouped[letter] ||= []).push(country);
    });
    return grouped;
  }, [filteredCountries]);

  const alphabet = useMemo(
    () => Object.keys(allCountriesByLetter).sort(),
    [allCountriesByLetter]
  );

  const displayedCountries = useMemo(() => {
    const list =
      selectedLetter === "ALL"
        ? filteredCountries
        : filteredCountriesByLetter[selectedLetter] ?? [];
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredCountries, filteredCountriesByLetter, selectedLetter]);

  return (
    <div className="flex flex-col w-full">
      <div className="px-4 w-full">
        <div className="mb-10">
          <StoreHero
            badgeText="All e-sim 20% off!"
            title={
              <>
                <span className="text-primary">Promo!</span>
                <br />
                All e-sim 20% off!
              </>
            }
            subtitle="HiRoaming opening Promo all e-sim 20% off!"
            ctaLabel="Shop Plan"
            ctaHref="#destinations"
          />
        </div>
      </div>

      <div className="flex flex-col mx-12">
        {/* Popular Destinations */}
        <section className="mb-12" id="destinations">
          <div className="mb-6">
            <h2 className="text-5xl font-normal leading-12 tracking-normal">
              <span className="text-primary">Popular</span>{" "}
              <span className="text-foreground">Destination</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Get connected instantly in your favorite travel destinations
            </p>
          </div>

          <Tabs defaultValue="countries">
            <TabsList className="h-auto bg-transparent p-0 gap-3">
              <TabsTrigger
                value="countries"
                className="rounded-full px-5 py-2 border border-border data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Countries
              </TabsTrigger>
              <TabsTrigger
                value="regions"
                className="rounded-full px-5 py-2 border border-border data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Regions
              </TabsTrigger>
              <TabsTrigger
                value="global"
                className="rounded-full px-5 py-2 border border-border data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Global
              </TabsTrigger>
            </TabsList>

            <TabsContent value="countries" className="mt-6">
              <BorderedContainer
                className="border-primary bg-primary hidden md:block"
                innerClassName="bg-primary"
              >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {popularCountries.map((country) => (
                    <DestinationCard
                      key={country.code}
                      name={country.name}
                      code={country.code.toLowerCase()}
                      flag=""
                      price={country.minPriceUsdCents / 10000}
                      href={`/store/${country.code.toLowerCase()}`}
                    />
                  ))}
                </div>
              </BorderedContainer>
              <BorderedContainer
                className="border-primary bg-primary block md:hidden"
                innerClassName="bg-primary"
              >
                <div className="grid gap-4 grid-cols-1">
                  {popularCountries.slice(0, 3).map((country) => (
                    <DestinationCard
                      key={country.code}
                      name={country.name}
                      code={country.code.toLowerCase()}
                      flag=""
                      price={country.minPriceUsdCents / 10000}
                      href={`/store/${country.code.toLowerCase()}`}
                    />
                  ))}
                </div>
              </BorderedContainer>
            </TabsContent>

            <TabsContent value="regions" className="mt-6">
              <BorderedContainer
                className="border-primary bg-primary"
                innerClassName="bg-primary"
              >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {allRegions.map((region) => (
                    <RegionDestinationCard
                      key={region.code}
                      name={region.name}
                      code={region.code}
                      price={region.minPriceUsdCents / 10000}
                      href={`/store/region/${region.code}`}
                    />
                  ))}
                </div>
              </BorderedContainer>
            </TabsContent>

            <TabsContent value="global" className="mt-6">
              <BorderedContainer
                className="border-primary bg-primary"
                innerClassName="bg-primary"
              >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {allCountries.map((country) => (
                    <DestinationCard
                      key={country.code}
                      name={country.name}
                      code={country.code.toLowerCase()}
                      flag=""
                      price={country.minPriceUsdCents / 10000}
                      href={`/store/${country.code.toLowerCase()}`}
                    />
                  ))}
                </div>
              </BorderedContainer>
            </TabsContent>
          </Tabs>
        </section>

        {/* All Country */}
        <section className="mb-10">
          <div className="mb-6">
            <h2 className="text-5xl font-normal leading-12 tracking-normal">
              <span className="text-primary">All</span>{" "}
              <span className="text-foreground">Country</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Get connected instantly in your favorite travel destinations
            </p>
          </div>

          {/* Search (moved here) */}
          <div className="mb-6">
            <div className="relative w-full max-w-3xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for your destination (e.g., Japan, Europe, USA...)"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (selectedLetter !== "ALL") setSelectedLetter("ALL");
                }}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>

          {/* Alphabet Pills */}
          <div className="mb-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <button
                type="button"
                onClick={() => setSelectedLetter("ALL")}
                className={[
                  "shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                  selectedLetter === "ALL"
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50",
                ].join(" ")}
              >
                All
              </button>
              {alphabet.map((letter) => {
                const hasResults =
                  (filteredCountriesByLetter[letter]?.length ?? 0) > 0;
                const active = selectedLetter === letter;
                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => setSelectedLetter(letter)}
                    disabled={!hasResults}
                    className={[
                      "shrink-0 h-12 w-12 rounded-full border text-sm font-medium transition-colors",
                      active
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50",
                      !hasResults ? "opacity-40 cursor-not-allowed" : "",
                    ].join(" ")}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          <BorderedContainer>
            {displayedCountries.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-base text-muted-foreground">
                  No destinations found{search ? ` for "${search}"` : ""}.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {displayedCountries.map((country) => (
                  <AllCountryCard
                    key={country.code}
                    country={country}
                    currency={currency}
                  />
                ))}
              </div>
            )}
          </BorderedContainer>
        </section>
      </div>
      <CTASection className="translate-y-4" />
    </div>
  );
}

function formatMinPriceForCard(
  priceUsdCents: number,
  priceIdr: number,
  currency: "USD" | "IDR"
) {
  if (currency === "USD") {
    const dollars = priceUsdCents / 10000;
    const label = Number.isInteger(dollars)
      ? `$${dollars.toFixed(0)}`
      : `$${dollars.toFixed(2)}`;
    return { value: label, suffix: "/7 days" };
  }
  return { value: `Rp ${priceIdr.toLocaleString("id-ID")}`, suffix: "" };
}

function AllCountryCard({
  country,
  currency,
}: {
  country: LocationWithPackageCount;
  currency: "USD" | "IDR";
}) {
  const price = formatMinPriceForCard(
    country.minPriceUsdCents,
    country.minPriceIdr,
    currency
  );

  return (
    <Link href={`/store/${country.code.toLowerCase()}`} className="group">
      <Card className="relative rounded-2xl bg-white transition-all hover:shadow-md hover:border-primary/40">
        <CardContent className="p-6">
          {/* Badges - Top Right */}
          <EsimBadge className="absolute top-6 right-6" />
          {country.hasUnlimitedPackages ? (
            <Badge
              variant="secondary"
              className="absolute top-6 right-20 text-xs"
            >
              Unlimited tersedia
            </Badge>
          ) : null}

          {/* Main Content */}
          <div className="pr-20">
            {/* Flag */}
            <Image
              src={
                country.flagUrl ??
                `/img/flags/${country.code.toLowerCase()}.png`
              }
              alt={country.name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover bg-muted"
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
            />

            {/* Country */}
            <h3 className="mt-5 truncate text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {country.name}
            </h3>

            {/* Price */}
            <div className="mt-8">
              <p className="text-base text-muted-foreground">Starting from</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-foreground">
                  {price.value}
                </span>
                {price.suffix ? (
                  <span className="text-base text-muted-foreground">
                    {price.suffix}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Arrow Button - Bottom Right */}
          <div className="absolute bottom-6 right-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-white transition-colors group-hover:border-primary/40">
              <ArrowRight className="h-5 w-5 text-foreground group-hover:text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Region Destination Card Component (for Popular Destinations section)
function RegionDestinationCard({
  name,
  code,
  price,
  href,
}: {
  name: string;
  code: string;
  price: number;
  href?: string;
}) {
  const cardContent = (
    <Card className="relative rounded-2xl bg-white transition-all hover:shadow-md hover:border-primary/40">
      <CardContent className="p-6">
        {/* ESIM Badge - Top Right */}
        <EsimBadge className="absolute top-6 right-6" />

        {/* Main Content */}
        <div className="pr-20">
          {/* Globe Icon */}
          <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Globe className="h-7 w-7 text-primary" />
          </div>

          {/* Region Name */}
          <h3 className="mt-5 min-h-16 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Price */}
          <div className="mt-8">
            <p className="text-base text-muted-foreground">Starting from</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-foreground">
                ${price}
              </span>
              <span className="text-base text-muted-foreground">/7 days</span>
            </div>
          </div>
        </div>

        {/* Arrow Button - Bottom Right */}
        <div className="absolute bottom-6 right-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-white transition-colors group-hover:border-primary/40">
            <ArrowRight className="h-5 w-5 text-foreground group-hover:text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="group">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

// Region Card Component
function RegionCard({
  region,
  currency,
}: {
  region: RegionWithPackageCount;
  currency: "USD" | "IDR";
}) {
  return (
    <Link href={`/store/region/${region.code}`}>
      <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/50 h-full">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            {/* Icon/Image */}
            <div className="w-12 h-12 rounded-lg bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          {/* Info */}
          <h3 className="font-semibold group-hover:text-primary transition-colors">
            {region.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {region.countryCount} negara
          </p>
          <div className="flex items-center justify-between">
            <p className="text-sm">
              Mulai{" "}
              <span className="font-semibold text-primary">
                {formatMinPrice(
                  region.minPriceUsdCents,
                  region.minPriceIdr,
                  currency
                )}
              </span>
            </p>
            <Badge variant="outline" className="text-xs">
              {region.packageCount} paket
            </Badge>
          </div>
          {region.hasUnlimitedPackages && (
            <Badge variant="secondary" className="mt-2 text-xs">
              Unlimited tersedia
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
