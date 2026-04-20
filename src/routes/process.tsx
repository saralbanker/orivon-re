import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "@/components/RevealText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — Orivon Studio" },
      {
        name: "description",
        content: "Our six-step process: discover, define, design, build, ship and grow.",
      },
      { property: "og:title", content: "Process — Orivon Studio" },
      { property: "og:description", content: "How Orivon turns ambitious briefs into shipped work." },
    ],
  }),
  component: Process,
});

const STEPS = [
  {
    n: "01",
    title: "Discover",
    copy: "We start every engagement with research — stakeholder interviews, market analysis and a deep look at what's working and what's not.",
  },
  {
    n: "02",
    title: "Define",
    copy: "We turn insight into a sharp brief: positioning, principles, scope and success metrics. Everyone aligns before a pixel moves.",
  },
  {
    n: "03",
    title: "Design",
    copy: "From mood to motion to system — we explore widely, then commit. You see real work in week one, not lorem ipsum mocks.",
  },
  {
    n: "04",
    title: "Build",
    copy: "Engineering and design ship together. We use modern tooling — TanStack, R3F, GSAP — and write code we'd want to maintain.",
  },
  {
    n: "05",
    title: "Ship",
    copy: "QA across devices, performance budgets, accessibility audits — then we launch with confidence (and a back-up plan).",
  },
  {
    n: "06",
    title: "Grow",
    copy: "Post-launch we keep iterating. Analytics, A/B tests and quarterly retainers to compound the gains.",
  },
];

function Process() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current) return;
    const ctx = gsap.context(() => {
      const steps = wrap.current!.querySelectorAll<HTMLElement>("[data-step]");
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 80%" },
          },
        );
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-40 pb-32 px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Process</p>
        <RevealText
          text="How we work."
          as="h1"
          className="font-display text-6xl md:text-9xl font-bold leading-[0.9]"
        />
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          A simple, repeatable framework that makes ambitious work feel calm.
        </p>

        <div ref={wrap} className="mt-24 relative">
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />
          {STEPS.map((s) => (
            <div
              key={s.n}
              data-step
              className="relative pl-20 md:pl-32 pb-20 last:pb-0"
            >
              <div className="absolute left-0 top-0 flex items-center justify-center h-12 w-12 md:h-24 md:w-24 rounded-full glass border-primary/30">
                <span className="font-display text-lg md:text-3xl font-bold text-primary">
                  {s.n}
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-gradient-cyan">{s.title}</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
