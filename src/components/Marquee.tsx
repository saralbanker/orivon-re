import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Marquee = ({
  children,
  className,
  reverse,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
}) => {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="marquee gap-12"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <div className="flex items-center gap-12 pr-12">{children}</div>
        <div className="flex items-center gap-12 pr-12" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
};
