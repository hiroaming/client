import React from "react";

interface FloatingFlagConfig {
  flag: React.ReactNode;
  finalLeft: string;
  finalTop: string;
  finalY: string;
  animationDelay: string;
  sizeClasses: string;
  comment?: string;
}

interface FloatingFlagsProps {
  flags: FloatingFlagConfig[];
  className?: string;
}

export function FloatingFlags({ flags, className = "" }: FloatingFlagsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none z-20 ${className}`}>
      {flags.map((flagConfig, index) => (
        <div
          key={index}
          className="absolute flag-breathe"
          style={
            {
              "--final-left": flagConfig.finalLeft,
              "--final-top": flagConfig.finalTop,
              "--final-y": flagConfig.finalY,
              animationDelay: flagConfig.animationDelay,
            } as React.CSSProperties
          }
        >
          <div className={`rounded-lg bg-white  shadow-lg px-2 py-4`}>
            <div
              className={`shadow-lg items-center flex justify-center rounded-lg overflow-hidden ${flagConfig.sizeClasses}`}
            >
              {flagConfig.flag}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
