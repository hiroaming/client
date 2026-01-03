interface EsimBadgeProps {
  className?: string;
}

export function EsimBadge({ className = "" }: EsimBadgeProps) {
  return (
    <div
      className={`rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground ${className}`}
    >
      ESIM
    </div>
  );
}
