import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Hide on mobile/tablet viewports
    if (window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = e.clientX;
      mouse.current.targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Dynamic hover event delegation for UI links and buttons
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
    let curX = 0;
    let curY = 0;

    const tick = () => {
      const targetX = mouse.current.targetX;
      const targetY = mouse.current.targetY;

      // Lerp logic for personality lag
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;

      if (cursor) {
        cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (typeof window === "undefined" || (typeof window !== "undefined" && window.innerWidth < 768)) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor fixed pointer-events-none z-[9999] opacity-0 transition-opacity duration-300 ${isHovering ? "hover-active" : ""} ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="custom-cursor-text">{cursorText}</div>
    </div>
  );
}
