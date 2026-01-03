"use client";

import Image from "next/image";
import { useState } from "react";

interface CountryFlagProps {
  code: string;
  name: string;
  size?: number;
  className?: string;
}

export function CountryFlag({
  code,
  name,
  size = 48,
  className,
}: CountryFlagProps) {
  const [useEmoji, setUseEmoji] = useState(false);

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-white flex items-center justify-center shadow-sm ${
        className ?? ""
      }`}
      style={{ width: size, height: size }}
    >
      <Image
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${code.toUpperCase()}.svg`}
        alt={name}
        fill
        className="object-cover rounded-full border"
        onError={() => setUseEmoji(true)}
      />
    </div>
  );
}
