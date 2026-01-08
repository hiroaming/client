import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getCountriesWithPackages,
  getRegionsWithPackages,
} from "@/services/locations";
import {
  PopularDestinationHeader,
  PopularDestinations,
} from "./popular-destinations";

function PopularDestinationsSkeleton({ centerHeader }: Props) {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <PopularDestinationHeader centered={centerHeader} />
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

type Props = {
  disableRegions?: boolean;
  disableCountries?: boolean;
  disableGlobal?: boolean;
  innerClassName?: string;
  borderClassName?: string;
  centerHeader?: boolean;
};

export function PopularDestinationsSection(props: Props) {
  return (
    <Suspense fallback={<PopularDestinationsSkeleton {...props} />}>
      <PopularDestinationsSectionAsync {...props} />
    </Suspense>
  );
}

async function PopularDestinationsSectionAsync({
  disableRegions,
  disableCountries,
  disableGlobal,
  innerClassName,
  borderClassName,
  centerHeader,
}: Props) {
  const [countries, regions] = await Promise.all([
    disableCountries ? Promise.resolve([]) : getCountriesWithPackages(),
    disableRegions ? Promise.resolve([]) : getRegionsWithPackages(),
  ]);

  const globalCountries = disableGlobal ? [] : countries;

  return (
    <PopularDestinations
      countries={countries}
      regions={regions}
      globalCountries={globalCountries}
      innerClassName={innerClassName}
      borderClassName={borderClassName}
      centerHeader={centerHeader}
    />
  );
}
