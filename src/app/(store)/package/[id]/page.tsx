import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatDataSize } from "@/lib/utils";
import { getCountryName } from "@/lib/locations";
import { PackageDetailContent } from "./package-detail-content";
import type { EsimPackage } from "@/types/database";

interface PackageDetailPageProps {
  params: Promise<{ id: string }>;
}

// Helper to get location display name from location codes
function getLocationDisplayName(locationCodes: string[] | null): string {
  if (!locationCodes || locationCodes.length === 0) return "";

  // Single country
  if (locationCodes.length === 1) {
    return getCountryName(locationCodes[0]);
  }

  // Multiple countries - show count
  return `${locationCodes.length} countries`;
}

async function getPackage(id: string): Promise<EsimPackage | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("esim_packages")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching package:", error);
    return null;
  }

  return data as EsimPackage;
}

async function getRelatedPackages(
  currentId: string,
  category: string | null,
): Promise<EsimPackage[]> {
  const supabase = await createClient();

  let query = supabase
    .from("esim_packages")
    .select("*")
    .eq("is_active", true)
    .neq("id", currentId)
    .limit(3);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching related packages:", error);
    return [];
  }

  return (data as EsimPackage[]) || [];
}

export async function generateMetadata({
  params,
}: PackageDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const pkg = await getPackage(id);

  if (!pkg) {
    return {
      title: "Paket Tidak Ditemukan",
    };
  }

  const locationName = getLocationDisplayName(pkg.location_codes);

  return {
    title: pkg.display_name || pkg.name,
    description:
      pkg.description ||
      `Paket eSIM ${pkg.display_name || pkg.name} - ${formatDataSize(pkg.volume_bytes)} untuk ${pkg.duration} ${pkg.duration_unit === "day" ? "hari" : pkg.duration_unit}${locationName ? ` di ${locationName}` : ""}`,
  };
}

export default async function PackageDetailPage({
  params,
}: PackageDetailPageProps) {
  const { id } = await params;
  const pkg = await getPackage(id);

  if (!pkg) {
    notFound();
  }

  const relatedPackages = await getRelatedPackages(id, pkg.category);
  const locationName = getLocationDisplayName(pkg.location_codes);

  return (
    <PackageDetailContent
      pkg={pkg}
      relatedPackages={relatedPackages}
      locationName={locationName}
    />
  );
}
