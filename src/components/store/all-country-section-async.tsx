import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getCountriesWithPackages } from "@/services/locations";
import { AllCountrySection } from "./all-country-section";

function AllCountrySectionSkeleton() {
  return (
    <section className="mb-10">
      <div className="mb-6">
        <Skeleton className="h-12 w-64 mb-2" />
        <Skeleton className="h-6 w-96" />
      </div>
      <div className="mb-6">
        <Skeleton className="h-12 w-full max-w-3xl" />
      </div>
      <div className="mb-6">
        <div className="flex gap-3">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-12 rounded-full" />
          ))}
        </div>
      </div>
      <div className="border border-border rounded-3xl p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AllCountrySectionAsync() {
  return (
    <Suspense fallback={<AllCountrySectionSkeleton />}>
      <Content />
    </Suspense>
  );
}

async function Content() {
  const countries = await getCountriesWithPackages();
  return <AllCountrySection countries={countries} />;
}
