import { Metadata } from "next";
import { StoreContent } from "./store-content";

export const metadata: Metadata = {
  title: "Store - Pilih Destinasi eSIM",
  description:
    "Pilih negara atau wilayah untuk membeli paket eSIM perjalanan Anda.",
};

export default function StorePage() {
  return <StoreContent />;
}
