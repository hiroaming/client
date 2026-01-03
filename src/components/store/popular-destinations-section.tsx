import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getCountriesWithPackages,
  getRegionsWithPackages,
} from "@/services/locations";
import { PopularDestinations } from "./popular-destinations";

function PopularDestinationsSkeleton() {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <Skeleton className="h-12 w-64 mb-2" />
        <Skeleton className="h-6 w-96" />
      </div>
      <div className="flex gap-3 mb-6">
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="h-10 w-24 rounded-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl" />
        ))}
      </div>
    </section>
  );
}

export async function PopularDestinationsSection() {
  const [countries, regions] = await Promise.all([
    getCountriesWithPackages(),
    getRegionsWithPackages(),
  ]);

  return (
    <Suspense fallback={<PopularDestinationsSkeleton />}>
      <PopularDestinations countries={countries} regions={regions} />
    </Suspense>
  );
}

