import { Metadata } from "next";
import { DeviceCompatibilityContent } from "./device-compatibility-content";
import { getBrandMeta, getCompatibleDevices, groupDevicesByBrand } from "@/lib/device-compatibility";
import {
  getCountriesWithPackages,
  getRegionsWithPackages,
} from "@/services/locations";

export const metadata: Metadata = {
  title: "Kompatibilitas Perangkat",
  description: "Cek apakah perangkat Anda mendukung eSIM.",
}

export default async function DeviceCompatibilityPage() {
  const [devices, countries, regions, meta] = await Promise.all([
    Promise.resolve(getCompatibleDevices()),
    getCountriesWithPackages(),
    getRegionsWithPackages(),
    Promise.resolve(getBrandMeta()),
  ]);

  return (
    <DeviceCompatibilityContent
      countries={countries}
      regions={regions}
      brandMeta={meta}
    />
  );
}
