"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight cyan "fluid" background that follows the cursor.
 * Single canvas, ~30fps blob field — works on every page without the cost
 * of a full WebGL fluid simulation.
 */
export function SiteBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: w / 2, y: h / 2, tx: w / 2, ty: h / 2 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };
    window.addEventListener("pointermove", onMove);

    type Blob = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    const blobs: Blob[] = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 220 + Math.random() * 180,
      hue: i % 2 === 0 ? 195 : 270,
    }));

    let raf = 0;
    let last = 0;
    const FRAME = 1000 / 30;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < FRAME) return;
      last = t;

      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r || b.x > w + b.r) b.vx *= -1;
        if (b.y < -b.r || b.y > h + b.r) b.vy *= -1;

        // first blob follows the cursor
        if (i === 0) {
          b.x += (mouse.x - b.x) * 0.04;
          b.y += (mouse.y - b.y) * 0.04;
        }

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `hsla(${b.hue}, 95%, 60%, 0.18)`);
        grad.addColorStop(0.5, `hsla(${b.hue}, 95%, 60%, 0.06)`);
        grad.addColorStop(1, "hsla(220, 60%, 10%, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
    />
  );
}
