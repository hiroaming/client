import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Skeleton } from "@/components/ui/skeleton";
import { getCountryByCode, getPackagesForCountry } from "@/services/locations";
import { CountryDetailContent } from "./country-detail-content";
import type { PriceSchedule } from "@/lib/price-utils";

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code } = await params;
  const country = await getCountryByCode(code.toUpperCase());

  if (!country) {
    return {
      title: "Negara tidak ditemukan - HIROAM",
    };
  }

  return {
    title: `Paket eSIM ${country.name} - HIROAM`,
    description: `Beli paket eSIM untuk ${country.name}. Mulai dari harga terjangkau dengan opsi unlimited tersedia.`,
  };
}

async function getActivePriceSchedules(): Promise<PriceSchedule[]> {
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("price_schedules")
    .select("*")
    .eq("is_active", true)
    .lte("starts_at", now)
    .gte("ends_at", now)
    .order("priority", { ascending: false });

  if (error) {
    console.error("Error fetching price schedules:", error);
    return [];
  }

  return (data as PriceSchedule[]) || [];
}

function CountrySkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-6 w-32 mb-6" />
      <div className="flex items-center gap-4 mb-8">
        <Skeleton className="w-16 h-12 rounded" />
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    </div>
  );
}

export default async function CountryDetailPage({ params }: PageProps) {
  const { code } = await params;
  const upperCode = code.toUpperCase();

  const [country, packages, priceSchedules] = await Promise.all([
    getCountryByCode(upperCode),
    getPackagesForCountry(upperCode),
    getActivePriceSchedules(),
  ]);

  if (!country) {
    notFound();
  }

  return (
    <Suspense fallback={<CountrySkeleton />}>
      <CountryDetailContent
        country={country}
        packages={packages}
        priceSchedules={priceSchedules}
      />
    </Suspense>
  );
}
