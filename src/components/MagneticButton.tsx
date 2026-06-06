import {
  forwardRef,
  useEffect,
  useRef,
  type ReactNode,
  type ElementType,
  type ComponentPropsWithRef,
  type MutableRefObject,
  type ForwardedRef,
} from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

type MagneticButtonProps<T extends ElementType = "button"> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithRef<T>, "as" | "className" | "children">;

const MagneticButtonComponent = forwardRef(
  <T extends ElementType = "button">(
    { as, className, children, ...rest }: MagneticButtonProps<T>,
    fwdRef: ForwardedRef<HTMLElement>,
  ) => {
    const Component = as || "button";
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

MagneticButtonComponent.displayName = "MagneticButton";

export const MagneticButton = MagneticButtonComponent as unknown as <
  T extends ElementType = "button",
>(
  props: MagneticButtonProps<T>,
) => ReactNode;
