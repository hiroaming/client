import { StoreHero } from "@/components/store/store-hero";
import { AllCountrySectionAsync } from "@/components/store/all-country-section-async";
import { CTASection } from "@/components/landing/cta-section";
import { PopularDestinationsSection } from "@/components/store/popular-destinations-section";

export function StoreContent() {
  return (
    <div className="flex flex-col w-full">
      <div className="px-4 w-full">
        <div className="mb-10">
          <StoreHero
            badgeText="All e-sim 20% off!"
            title={
              <>
                <span className="text-primary">Promo!</span>
                <br />
                All e-sim 20% off!
              </>
            }
            subtitle="HiRoaming opening Promo all e-sim 20% off!"
            ctaLabel="Shop Plan"
            ctaHref="#destinations"
          />
        </div>
      </div>

      <div className="flex flex-col gap-12 container max-w-6xl mx-auto">
        <PopularDestinationsSection
          innerClassName="bg-primary"
          borderClassName="border-primary bg-primary"
        />
        <AllCountrySectionAsync />
      </div>
      <CTASection className="translate-y-4" />
    </div>
  );
}
