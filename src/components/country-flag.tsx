"use client"

import Image from "next/image"
import { useState } from "react"

interface CountryFlagProps {
  code: string
  name: string
  emoji: string
  size?: number
  className?: string
}

export function CountryFlag({ code, name, emoji, size = 48, className }: CountryFlagProps) {
  const [useEmoji, setUseEmoji] = useState(false)

  if (useEmoji) {
    return (
      <div
        className={`rounded-full bg-white flex items-center justify-center shadow-sm ${className ?? ""}`}
        style={{ width: size, height: size }}
      >
        <span className="text-2xl">{emoji}</span>
      </div>
    )
  }

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-white flex items-center justify-center shadow-sm ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={`/img/flags/${code}.png`}
        alt={name}
        fill
        className="object-cover rounded-full"
        onError={() => setUseEmoji(true)}
      />
    </div>
  )
}


