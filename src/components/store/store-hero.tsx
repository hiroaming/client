"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CountryFlag } from "@/components/country-flag";
import { EsimBadge } from "@/components/ui/esim-badge";

export type StoreHeroPreviewCard = {
  countryName: string;
  countryCode: string;
  planTitle: string;
  durationLabel: string;
  priceNow: string;
  priceWas?: string;
  tag?: string;
};

export type StoreHeroProps = {
  badgeText?: string;
  badgeHref?: string;
  title: ReactNode;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  previewCards?: StoreHeroPreviewCard[];
};

function DotPattern() {
  return (
    <div
      className="absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.20) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
        backgroundPosition: "0 0",
      }}
    />
  );
}

function PreviewCard({
  card,
  badgeText,
}: {
  card: StoreHeroPreviewCard;
  badgeText: string;
}) {
  return (
    <Card className="w-[360px] bg-white shadow-lg rounded-2xl">
      <CardContent className="p-6">
        {/* Promo Badge */}
        <div className="inline-flex items-center rounded-full border border-gray-200 bg-white transition-shadow text-sm mb-4">
          <div className="bg-[#E0F8F3] text-primary px-2 py-1 rounded-full font-medium text-xs ml-0.5 my-0.5">
            Promo!
          </div>
          <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
            {badgeText}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground mr-2" />
        </div>

        <div className="flex flex-row w-full justify-between">
          {/* Flag */}
          <div className="flex justify-start mb-4">
            <CountryFlag
              code={card.countryCode.toLowerCase()}
              name={card.countryName}
              size={56}
            />
          </div>
          <div className="self-start">
            <EsimBadge />
          </div>
        </div>

        {/* Country & Plan */}
        <h3 className="text-lg font-medium mb-2 leading-tight">
          {card.countryName}
        </h3>
        <p className="text-base mb-4 leading-tight">
          <span className="font-medium">{card.planTitle.split("/")[0]}</span>
          <span className="text-muted-foreground">
            /{card.planTitle.split("/")[1]}
          </span>
        </p>

        {/* Pricing */}
        <div className="mt-4 rounded-xl bg-muted p-4">
          <div className="text-sm text-muted-foreground mb-2">
            {card.durationLabel}
          </div>
          <div className="flex items-end gap-2">
            <div className="text-3xl font-medium leading-none">
              {card.priceNow}
            </div>
            {card.priceWas && (
              <div className="text-lg text-muted-foreground line-through mb-0.5">
                {card.priceWas}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StoreHero({
  badgeText = "All e-sim 20% off!",
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  previewCards = [
    {
      countryName: "United States of America",
      countryCode: "us",
      planTitle: "500MB/Day",
      durationLabel: "Total 7 Days",
      priceNow: "$3",
      priceWas: "$7",
      tag: "ESIM",
    },
    {
      countryName: "United States of America",
      countryCode: "jp",
      planTitle: "500MB/Day",
      durationLabel: "Total 7 Days",
      priceNow: "$3",
      priceWas: "$7",
      tag: "ESIM",
    },
    {
      countryName: "United States of America",
      countryCode: "jp",
      planTitle: "500MB/Day",
      durationLabel: "Total 7 Days",
      priceNow: "$3",
      priceWas: "$7",
      tag: "ESIM",
    },
  ],
}: StoreHeroProps) {
  return (
    <section
      className="w-full py-8 px-8 rounded-4xl"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 1) 52%, rgba(206, 255, 243, 1) 100%)",
      }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-black text-white max-w-5xl mx-auto">
        <DotPattern />

        {/* Pattern SVG in bottom-left (reuses CTA motif) */}
        <div className="absolute bottom-0 left-0 pointer-events-none opacity-70">
          <Image
            src="/pattern.svg"
            alt=""
            width={420}
            height={420}
            className="opacity-60 scale-150 translate-y-1/2"
            priority={false}
          />
        </div>

        <div className="flex flex-col gap-10 ps-10 py-14 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h1 className="text-5xl font-normal leading-[1.05] tracking-normal md:text-6xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-6 text-base text-white/80">{subtitle}</p>
            ) : null}
            <div className="mt-8">
              <Button className="h-12 px-10 font-medium" asChild>
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            </div>
          </div>

          <div className="lg:flex max-w-[40%] justify-start lg:justify-end hidden">
            <div
              className="flex gap-6 overflow-x-auto pb-4 px-10 group/scroll preview-scroll"
              style={{ scrollbarWidth: "none" }}
            >
              {previewCards.map((card, idx) => (
                <div key={idx} className="shrink-0">
                  <PreviewCard card={card} badgeText={badgeText} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
