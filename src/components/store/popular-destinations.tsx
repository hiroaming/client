"use client";

import { useMemo } from "react";
import Link from "next/link";
import { BorderedContainer } from "@/components/bordered-container";
import { DestinationCard } from "@/components/landing/destination-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type {
  LocationWithPackageCount,
  RegionWithPackageCount,
} from "@/services/locations";
import { cn } from "@/lib/utils";

interface PopularDestinationsProps {
  countries: LocationWithPackageCount[];
  regions: RegionWithPackageCount[];
  globalCountries: LocationWithPackageCount[];
  innerClassName?: string;
  borderClassName?: string;
}

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

export function PopularDestinations({
  countries,
  regions,
  innerClassName,
  globalCountries,
  borderClassName,
}: PopularDestinationsProps) {
  // Get popular countries
  const popularCountries = countries.filter((c) => c.popular).slice(0, 9);

  // Get all regions
  const allRegions = regions;

  // Get all countries for Global tab
  const allCountries = globalCountries;

  const isRegionVisible = allRegions.length > 0;
  const isCountryVisible = popularCountries.length > 0;
  const isGlobalVisible = allCountries.length > 0;

  const isHideTabs =
    [isCountryVisible, isRegionVisible, isGlobalVisible].filter(Boolean)
      .length === 1;

  return (
    <section>
      <PopularDestinationHeader />

      <Tabs defaultValue="countries">
        <TabsList
          className="h-auto bg-transparent p-0 gap-3"
          hidden={isHideTabs}
        >
          <TabsTrigger
            value="countries"
            hidden={!isCountryVisible}
            className="rounded-full px-5 py-2 border border-border data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Countries
          </TabsTrigger>
          <TabsTrigger
            value="regions"
            hidden={!isRegionVisible}
            className="rounded-full px-5 py-2 border border-border data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Regions
          </TabsTrigger>
          <TabsTrigger
            value="global"
            hidden={!isGlobalVisible}
            className="rounded-full px-5 py-2 border border-border data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Global
          </TabsTrigger>
        </TabsList>

        <TabsContent value="countries" className="mt-6">
          <BorderedContainer
            className={borderClassName}
            innerClassName={innerClassName}
          >
            <div className="gap-4 grid-cols-3 lg:grid hidden">
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
            <div className="gap-4 grid-cols-2 sm:grid hidden lg:hidden">
              {popularCountries.slice(3).map((country) => (
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
            <div className="grid gap-4 grid-cols-1 sm:hidden">
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
            className={borderClassName}
            innerClassName={innerClassName}
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
            className={borderClassName}
            innerClassName={innerClassName}
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
  );
}

export function PopularDestinationHeader() {
  return (
    <div className="mb-6">
      <h2 className="text-5xl font-normal leading-12 tracking-normal">
        <span className="text-primary">Popular</span>{" "}
        <span className="text-foreground">Destination</span>
      </h2>
      <p className="mt-2 text-muted-foreground">
        Get connected instantly in your favorite travel destinations
      </p>
    </div>
  );
}
