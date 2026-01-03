import { Metadata } from "next";
import { DeviceCompatibilityContent } from "./device-compatibility-content";
import { getBrandMeta } from "@/lib/device-compatibility";
import { PopularDestinationsSection } from "@/components/store/popular-destinations-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";

export const metadata: Metadata = {
  title: "Kompatibilitas Perangkat",
  description: "Cek apakah perangkat Anda mendukung eSIM.",
};

export default async function DeviceCompatibilityPage() {
  const meta = getBrandMeta();

  return (
    <div>
      <DeviceCompatibilityContent brandMeta={meta} />
      <div className="container max-w-6xl mx-auto flex flex-col gap-24 pb-24">
        <PopularDestinationsSection disableGlobal disableRegions />
        <FAQSection />
      </div>

      <CTASection />
    </div>
  );
}
