import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  findBrandBySlug,
  getBrandMeta,
  getCompatibleDevices,
  groupDevicesByBrand,
} from "@/lib/device-compatibility";
import { BrandDetailContent } from "./brand-detail-content";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const devices = getCompatibleDevices();
  const byBrand = groupDevicesByBrand(devices);
  const brand = findBrandBySlug(Object.keys(byBrand), brandSlug);
  if (!brand) {
    return {
      title: "Device Compatibility",
      description: "Check whether your device supports eSIM.",
    };
  }

  return {
    title: `${brand} Compatibility`,
    description: `Check whether your ${brand} device supports eSIM.`,
  };
}

export default async function DeviceCompatibilityBrandPage({
  params,
}: PageProps) {
  const { brand: brandSlug } = await params;
  const devices = getCompatibleDevices();
  const byBrand = groupDevicesByBrand(devices);
  const brand = findBrandBySlug(Object.keys(byBrand), brandSlug);
  const meta = getBrandMeta();
  const brandMeta = meta.find((m) => m.key === brand);
  if (!brand || !brandMeta) notFound();

  return <BrandDetailContent brand={brand} devices={byBrand[brand]} brandMeta={brandMeta} />;
}


