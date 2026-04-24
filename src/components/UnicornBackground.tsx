"use client";

import UnicornScene from "unicornstudio-react";
import { useEffect, useState } from "react";

const SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.9/dist/unicornStudio.umd.js";

function useViewport() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const update = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

/** Site-wide animated background (Unicorn Studio scene). */
export function UnicornSiteBackground() {
  const { w, h } = useViewport();
  if (!w || !h) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    >
      <UnicornScene
        projectId="UkVWPoOMWqTHnnikz6Ap"
        width={`${w}px`}
        height={`${h}px`}
        scale={1}
        dpi={1.25}
        sdkUrl={SDK_URL}
      />
    </div>
  );
}

/** Inline scene that fills its parent container. */
export function UnicornInline({
  projectId,
  className = "",
  dpi = 1.25,
  scale = 1,
}: {
  projectId: string;
  className?: string;
  dpi?: number;
  scale?: number;
}) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const ref = (el: HTMLDivElement | null) => {
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.round(r.width), h: Math.round(r.height) });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
  };
  return (
    <div ref={ref} className={`relative w-full h-full ${className}`}>
      {size.w > 0 && size.h > 0 && (
        <UnicornScene
          projectId={projectId}
          width={`${size.w}px`}
          height={`${size.h}px`}
          scale={scale}
          dpi={dpi}
          sdkUrl={SDK_URL}
        />
      )}
    </div>
  );
}