import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BorderedContainer } from "@/components/bordered-container";
import { BrandMeta, toSlug } from "@/lib/device-compatibility";
import { DeviceSearchInput } from "@/components/device-compatibility/device-search-input";

interface DeviceCompatibilityContentProps {
  brandMeta: BrandMeta[];
}

export function DeviceCompatibilityContent({
  brandMeta,
}: DeviceCompatibilityContentProps) {
  return (
    <div className="w-full flex-col">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section (match landing hero vibe) */}
        <section
          className="relative overflow-hidden rounded-4xl px-6 py-14 md:px-12 md:py-20"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 1) 52%, rgba(206, 255, 243, 1) 100%)",
          }}
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-normal tracking-normal leading-[1.05] md:text-7xl">
                Device <br />
                <span className="text-primary">Compatibility</span>
              </h1>
            </div>
            <p className="max-w-md text-sm text-muted-foreground text-center md:text-right md:text-base">
              You'll need to make sure your device supports eSIMs and has no
              carrier restrictions to use HiRoam.
            </p>
          </div>
        </section>

        {/* Brand / Search section (as per reference) */}
        <section className="mt-12 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-medium md:text-4xl">
              What devices support eSIMs?
            </h2>
          </div>

          <DeviceSearchInput />

          <div className="mx-auto mt-10 max-w-6xl">
            <BorderedContainer>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {brandMeta.map((meta) => {
                  return (
                    <Link
                      key={meta.key}
                      href={`/device-compatibility/${toSlug(meta.key)}`}
                      className="group block"
                    >
                      <div className="h-full rounded-3xl border border-border bg-white p-6 transition-shadow group-hover:shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-h-8 text-sm font-medium text-muted-foreground">
                            <img
                              src={meta.icon}
                              alt={`${meta.title} logo`}
                              className={meta.className}
                            />
                          </div>
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted-foreground">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="mt-6 text-xl font-medium text-foreground">
                          {meta.title}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </BorderedContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
