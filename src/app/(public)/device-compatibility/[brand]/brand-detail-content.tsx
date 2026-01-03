"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BorderedContainer } from "@/components/bordered-container";
import { Button } from "@/components/ui/button";
import type { CompatibleDevice } from "@/lib/device-compatibility";

export type BrandDetailContentProps = {
  brand: string;
  devices: CompatibleDevice[];
};

export function BrandDetailContent({
  brand,
  devices,
}: BrandDetailContentProps) {
  const models = [...devices]
    .filter((d) => d.is_compatible)
    .map((d) => d.model)
    .sort((a, b) => a.localeCompare(b));

  const half = Math.ceil(models.length / 2);
  const left = models.slice(0, half);
  const right = models.slice(half);

  const brandTitle = brand === "Apple" ? "Iphone" : brand;
  const brandMark = brand === "Apple" ? "" : brand.slice(0, 2).toUpperCase();

  const introText =
    brand === "Apple"
      ? "Apple is one of the phone makers that tapped into the eSIM technology. Since 2018, all Apple phones have had eSIM capability. Here are Apple products that support eSIM:"
      : `${brand} is one of the phone makers that supports eSIM technology. Here are ${brand} devices that support eSIM:`;

  return (
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

      <div className="mx-auto max-w-5xl mt-12">
        <BorderedContainer innerClassName="p-3 md:p-4">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="h-12 w-12 rounded-full"
              >
                <Link
                  href="/device-compatibility"
                  aria-label="Back to compatibility"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg font-semibold text-foreground">
                  {brandMark}
                </div>
                <h1 className="text-2xl font-medium md:text-3xl">
                  {brandTitle}
                </h1>
              </div>
            </div>

            <p className="mt-10 text-sm leading-relaxed text-muted-foreground md:text-base">
              {introText}
            </p>

            <div className="mt-6 grid gap-10 md:grid-cols-2">
              <ul className="list-disc space-y-2 pl-5 text-sm md:text-base">
                {left.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <ul className="list-disc space-y-2 pl-5 text-sm md:text-base">
                {right.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>

            <div className="mt-12 space-y-6 text-sm leading-relaxed text-muted-foreground">
              {brand === "Apple" ? (
                <>
                  <p>
                    Notice: Device compatibility also varies from country to
                    country. eSIM on the iPhone is not offered on the mainland
                    of China. For example, iPhones XS, XS Max, and XR sold in
                    China, Macau, and Hong Kong are not eSIM compatible (dual
                    SIM phones with two physical SIM slots).
                  </p>
                  <p>
                    Your device must be unlocked and the iOS version must be
                    updated to 14.1 or newer. You can check with your carrier to
                    see if there is anything you can do to unlock the eSIM in
                    your device.
                  </p>
                  <p>
                    If you have a Turkish-produced device and it prevents you
                    from installing our eSIM, please have your device restored
                    to factory settings first according to the instruction
                    mentioned here:{" "}
                    <a
                      href="https://support.apple.com/tr-tr/HT211023"
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2"
                    >
                      https://support.apple.com/tr-tr/HT211023
                    </a>{" "}
                    (Turkish language) or{" "}
                    <a
                      href="https://support.apple.com/en-us/HT211023"
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2"
                    >
                      https://support.apple.com/en-us/HT211023
                    </a>{" "}
                    (English language).
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Notice: Device compatibility can vary by country, carrier,
                    and whether the phone is carrier-locked. If you're unsure,
                    check your device settings for “Add eSIM” / “Add Cellular
                    Plan”.
                  </p>
                </>
              )}
            </div>
          </div>
        </BorderedContainer>
      </div>
    </div>
  );
}
