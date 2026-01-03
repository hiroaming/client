"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DeviceSearchInput() {
  const [search, setSearch] = useState("");

  return (
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
  );
}

