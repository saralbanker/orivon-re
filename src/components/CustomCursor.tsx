import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Disable on touch devices
    if (window.innerWidth < 768) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = e.clientX;
      mouse.current.targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseDown = () => {
      setIsClicked(true);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Dynamic hover event delegation for links, buttons and custom hover text
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const hoverEl = target.closest('[data-cursor-text], a, button, [role="button"]');
      if (hoverEl) {
        setIsHovering(true);
        const text = hoverEl.getAttribute("data-cursor-text");
        setCursorText(text || "VIEW");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    document.addEventListener("mouseover", onMouseOver);

    let rafId = 0;
    // Current positions for Dot (fast follow)
    let dotX = 0;
    let dotY = 0;
    // Current positions for Ring (organic lag)
    let ringX = 0;
    let ringY = 0;

    const tick = () => {
      const targetX = mouse.current.targetX;
      const targetY = mouse.current.targetY;

      // Fast follow for dot
      dotX += (targetX - dotX) * 0.25;
      dotY += (targetY - dotY) * 0.25;

      // Slow follow with momentum for ring
      ringX += (targetX - ringX) * 0.12;
      ringY += (targetY - ringY) * 0.12;

      if (dot) {
        // Dot clicks feel punchier when scaled down or up
        const dotScale = isClicked ? "scale(1.8)" : "scale(1)";
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) ${dotScale}`;
      }

      if (ring) {
        // Squeeze outer ring on click or hover
        const ringScale = isClicked ? "scale(0.75)" : "scale(1)";
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) ${ringScale}`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, isClicked]);

  if (typeof window === "undefined" || (typeof window !== "undefined" && window.innerWidth < 768)) return null;

  return (
    <>
      {/* Center dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot fixed pointer-events-none z-[10000] opacity-0 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundColor: isHovering ? "var(--brand-teal)" : "var(--brand-pink)",
        }}
      />
      {/* Outer lagging ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring fixed pointer-events-none z-[9999] opacity-0 transition-opacity duration-300 ${isHovering ? "hover-active" : ""} ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="custom-cursor-text">{cursorText}</div>
      </div>
    </>
  );
}
