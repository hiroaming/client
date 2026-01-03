import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBrandMeta,
  getCompatibleDevices,
  groupDevicesByBrand,
} from "@/lib/device-compatibility";
import { BrandDetailContent } from "./brand-detail-content";
import { PopularDestinationsSection } from "@/components/store/popular-destinations-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { brand } = await params;

  if (!brand)
    return {
      title: "Device Compatibility",
      description: "Check whether your device supports eSIM.",
    };

  return {
    title: `${brand} Compatibility`,
    description: `Check whether your ${brand} device supports eSIM.`,
  };
}

export default async function DeviceCompatibilityBrandPage({
  params,
}: PageProps) {
  const { brand } = await params;
  const devices = getCompatibleDevices();
  const byBrand = groupDevicesByBrand(devices);
  const meta = getBrandMeta();
  const brandMeta = meta.find((m) => m.key === brand);
  if (!brand) notFound();

  return (
    <div>
      <BrandDetailContent
        brand={brand}
        devices={byBrand[brand]}
        brandMeta={brandMeta}
      />
      <div className="container max-w-6xl mx-auto flex flex-col gap-24 pb-24">
        <PopularDestinationsSection disableGlobal disableRegions />
        <FAQSection />
      </div>

      <CTASection />
    </div>
  );
}
