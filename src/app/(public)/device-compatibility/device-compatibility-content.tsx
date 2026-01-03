"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { BorderedContainer } from "@/components/bordered-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrandMeta, getBrandMeta, toSlug } from "@/lib/device-compatibility";
import { CTASection } from "@/components/landing/cta-section";
import { FAQSection } from "@/components/landing/faq-section";
import { PopularDestinations } from "@/components/store/popular-destinations";
import type {
  LocationWithPackageCount,
  RegionWithPackageCount,
} from "@/services/locations";

// Local type definition for compatible devices (no database table exists)
interface CompatibleDevice {
  id: string;
  brand: string;
  model: string;
  is_compatible: boolean;
}

interface DeviceCompatibilityContentProps {
  countries: LocationWithPackageCount[];
  regions: RegionWithPackageCount[];
  brandMeta: BrandMeta[];
}

export function DeviceCompatibilityContent({
  countries,
  regions,
  brandMeta,
}: DeviceCompatibilityContentProps) {
  const [search, setSearch] = useState("");

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

          <div className="mx-auto mt-6 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for your device (e.g., iPhone 17, Galaxy Z Flip5, Pixel 10...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-full border-2 pl-12 pr-4"
              />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
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

        {/* Quick Check Guide */}
        <Card className="mb-12 mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>Cara Cek Manual</CardTitle>
            <CardDescription>
              Jika perangkat Anda tidak ada di daftar, cek secara manual dengan
              langkah berikut:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">iPhone</h4>
                <p className="text-sm text-muted-foreground">
                  Buka{" "}
                  <strong>Pengaturan → Seluler → Tambah Paket Seluler</strong>.
                  Jika opsi ini tersedia, iPhone Anda mendukung eSIM.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Android</h4>
                <p className="text-sm text-muted-foreground">
                  Buka{" "}
                  <strong>
                    Pengaturan → Jaringan & Internet → Kartu SIM → Tambah eSIM
                  </strong>
                  . Lokasi menu mungkin berbeda tergantung merek.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Destinations */}
      <div className="flex flex-col mx-12">
        <PopularDestinations countries={countries} regions={regions} />
      </div>

      <FAQSection />
      <CTASection />
    </div>
  );
}
