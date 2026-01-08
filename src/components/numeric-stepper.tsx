"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NumericStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function NumericStepper({
  value,
  onIncrement,
  onDecrement,
  min = 1,
  max = Infinity,
  label = "Days",
  size = "md",
}: NumericStepperProps) {
  const sizeClasses = {
    sm: {
      button: "h-8 w-8",
      icon: "h-3 w-3",
      text: "text-sm",
      minWidth: "min-w-[60px]",
    },
    md: {
      button: "h-10 w-10",
      icon: "h-4 w-4",
      text: "text-base",
      minWidth: "min-w-[80px]",
    },
    lg: {
      button: "h-12 w-12",
      icon: "h-4 w-4",
      text: "text-xl",
      minWidth: "min-w-[100px]",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className="flex items-center shrink-0 border border-border rounded-lg overflow-hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDecrement}
        disabled={value <= min}
        className={cn("rounded-none border-r", classes.button)}
      >
        <Minus className={classes.icon} />
      </Button>
      <div className={cn("text-center px-4", classes.minWidth)}>
        <span className={classes.text}>
          {value} {label}
        </span>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onIncrement}
        disabled={value >= max}
        className={cn("rounded-none border-l", classes.button)}
      >
        <Plus className={classes.icon} />
      </Button>
    </div>
  );
}
