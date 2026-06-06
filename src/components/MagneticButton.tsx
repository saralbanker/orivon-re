import {
  forwardRef,
  useEffect,
  useRef,
  type ReactNode,
  type ElementType,
  type HTMLAttributes,
  type MutableRefObject,
} from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export const MagneticButton = forwardRef<HTMLElement, Props>(
  ({ as: Component = "button", className, children, ...rest }, fwdRef) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, {
            x: x * 0.35,
            y: y * 0.35,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, scale: 1, duration: 1, ease: "elastic.out(1, 0.4)" });
        };
        el.addEventListener("mousemove", onMove as EventListener);
        el.addEventListener("mouseleave", onLeave);
        return () => {
          el.removeEventListener("mousemove", onMove as EventListener);
          el.removeEventListener("mouseleave", onLeave);
        };
      }, el);
      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          if (ref) {
            (ref as MutableRefObject<HTMLElement | null>).current = node;
          }
          if (typeof fwdRef === "function") {
            fwdRef(node);
          } else if (fwdRef) {
            (fwdRef as MutableRefObject<HTMLElement | null>).current = node;
          }
        }}
        className={cn("inline-block cursor-pointer will-change-transform", className)}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);
MagneticButton.displayName = "MagneticButton";
