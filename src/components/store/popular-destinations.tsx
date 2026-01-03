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

interface PopularDestinationsProps {
  countries: LocationWithPackageCount[];
  regions: RegionWithPackageCount[];
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
}: PopularDestinationsProps) {
  // Get popular countries
  const popularCountries = useMemo(() => {
    return countries.filter((c) => c.popular).slice(0, 9);
  }, [countries]);

  // Get all regions
  const allRegions = useMemo(() => {
    return regions;
  }, [regions]);

  // Get all countries for Global tab
  const allCountries = useMemo(() => {
    return countries;
  }, [countries]);

  return (
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
  );
}

