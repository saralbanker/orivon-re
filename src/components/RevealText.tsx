import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export const RevealText = ({ text, className, delay = 0, as: Tag = "h2" }: Props) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>(".reveal-char");
    animate(chars, {
      translateY: ["110%", "0%"],
      opacity: [0, 1],
      duration: 1100,
      delay: stagger(28, { start: delay }),
      ease: "cubicBezier(0.16, 1, 0.3, 1)",
    });
  }, [text, delay]);

  return (
    <Tag ref={ref as any} className={cn("inline-block", className)}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
          {word.split("").map((c, ci) => (
            <span
              key={ci}
              className="reveal-char inline-block opacity-0"
              style={{ willChange: "transform" }}
            >
              {c}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
};
