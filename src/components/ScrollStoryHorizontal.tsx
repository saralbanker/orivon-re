import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollStoryHorizontalProps {
  projects: Project[];
}

export function ScrollStoryHorizontal({ projects }: ScrollStoryHorizontalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollSection = scrollRef.current;
    if (!container || !scrollSection) return;

    const scrollAmount = scrollSection.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollSection, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${scrollAmount * 1.5}`,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [projects]);

  // Saturated brand backgrounds that cycle: pink, teal, lavender, peach, ochre, coral
  const bgClasses = [
    "bg-[var(--brand-pink)] text-white",
    "bg-[var(--brand-teal)] text-white",
    "bg-[var(--brand-lavender)] text-black",
    "bg-[var(--brand-peach)] text-black",
    "bg-[var(--brand-ochre)] text-black",
    "bg-[var(--brand-coral)] text-white",
  ];

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-background">
      {/* Scroll indicator */}
      <div className="absolute top-28 left-6 md:left-12 z-20 flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
          Scroll vertically to explore cases
        </span>
      </div>

      <div ref={scrollRef} className="flex h-full w-max items-center">
        {/* Intro Slide */}
        <div
          data-panel
          className="w-screen h-screen flex-shrink-0 flex flex-col justify-center px-6 md:px-24 max-w-4xl"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[var(--cyan)] mb-4 block font-mono">
            Selected Craft
          </span>
          <h2 className="font-display font-bold leading-[0.95] text-[clamp(2.5rem,7vw,5.5rem)] tracking-tight">
            How we solve complex problems with <span className="text-gradient-cyan">beautiful interfaces.</span>
          </h2>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Every website we build is a storytelling engine. We design for clarity, feel, and performance.
          </p>
          <div className="mt-12 flex items-center gap-4 text-sm font-semibold text-foreground/50">
            <span>Drag or scroll down</span>
            <span className="text-[var(--cyan)] text-lg">→</span>
          </div>
        </div>

        {/* Project Slides */}
        {projects.map((p, index) => {
          const cardBg = bgClasses[index % bgClasses.length];
          return (
            <div
              key={p.slug}
              data-panel
              className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-4 md:px-16"
            >
              <div
                className={`w-full max-w-6xl min-h-[75vh] md:min-h-0 md:aspect-[16/9] rounded-xl p-6 md:p-14 grid md:grid-cols-12 gap-6 md:gap-12 items-center overflow-y-auto md:overflow-hidden border border-border/10 shadow-elegant ${cardBg}`}
              >
                {/* Left side: Case Study Metadata */}
                <div className="md:col-span-5 flex flex-col h-full justify-between py-2">
                  <div>
                    <div className="flex gap-2 mb-6 font-mono text-xs opacity-75">
                      <span className="border border-current/30 rounded-full px-3 py-1">{p.category}</span>
                      <span className="border border-current/30 rounded-full px-3 py-1">{p.year}</span>
                    </div>

                    <h3 className="font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight mb-4">
                      {p.title.split(" — ")[0]}
                    </h3>
                    <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {p.services.map((s) => (
                        <span key={s} className="bg-current/10 rounded px-2.5 py-1 text-xs font-mono font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/work/$slug"
                    params={{ slug: p.slug }}
                    className="inline-flex items-center gap-2 group self-start border-b-2 border-current pb-1 text-sm font-bold tracking-wider uppercase transition-all hover:gap-3"
                  >
                    Explore case <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {/* Right side: High-fidelity CSS Mockup (No Placeholders or 3D) */}
                <div className="md:col-span-7 h-full flex items-center justify-center relative">
                  <div className="w-full h-full bg-black/10 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-2xl relative">
                    
                    {/* Window Controls */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-white/20" />
                        <span className="w-3 h-3 rounded-full bg-white/20" />
                        <span className="w-3 h-3 rounded-full bg-white/20" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest opacity-40">ORIVON.STUDIO // {p.slug.toUpperCase()}</span>
                    </div>

                    {/* CSS Vector Content tailored to each case */}
                    <div className="flex-1 flex items-center justify-center py-6 relative">
                      {p.slug === "lumen-finance" && (
                        <div className="w-full max-w-sm space-y-4">
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                            <span className="text-xs opacity-60 font-mono">FINANCE_CAPITAL</span>
                            <span className="text-base font-bold font-mono">$842,912.00</span>
                          </div>
                          {/* Mini styled chart */}
                          <div className="h-28 flex items-end justify-between gap-1.5 pt-4">
                            {[40, 25, 55, 30, 85, 45, 95, 60, 110, 75, 120].map((val, i) => (
                              <div
                                key={i}
                                className="w-full bg-gradient-to-t from-[var(--brand-pink)] to-white/40 rounded-t-sm transition-all duration-500 hover:opacity-100"
                                style={{ height: `${(val / 120) * 100}%`, opacity: 0.3 + (i * 0.05) }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {p.slug === "noctis-music" && (
                        <div className="w-full flex flex-col items-center justify-center space-y-4">
                          <div className="relative w-32 h-32 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                              <span className="w-4 h-4 rounded-full bg-white/50" />
                            </div>
                          </div>
                          {/* Equalizer lines */}
                          <div className="flex items-center gap-1.5 h-6">
                            {[10, 18, 14, 24, 8, 16, 22, 12].map((h, i) => (
                              <div
                                key={i}
                                className="w-1 bg-white/70 rounded-full animate-pulse"
                                style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {p.slug === "orbit-aerospace" && (
                        <div className="w-full max-w-xs space-y-6 text-left">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono opacity-50">ORBIT_TRACKER</span>
                            <span className="text-xs font-mono text-[var(--brand-peach)]">L-04:12:05</span>
                          </div>
                          {/* Orbital path */}
                          <div className="relative h-24 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                            <div className="absolute w-40 h-40 rounded-full border border-white/20 -bottom-28 animate-[spin_60s_linear_infinite]" />
                            <div className="absolute w-3 h-3 rounded-full bg-[var(--brand-peach)] shadow-[0_0_15px_#ffb084]" />
                            <span className="text-[10px] font-mono opacity-30 absolute bottom-2 right-2">ALT. 408KM</span>
                          </div>
                        </div>
                      )}

                      {p.slug === "verdant-eco" && (
                        <div className="w-full max-w-xs space-y-4">
                          <div className="text-center font-display text-2xl font-bold opacity-80">98.4%</div>
                          <p className="text-[10px] font-mono text-center opacity-50 uppercase tracking-widest">ECO_REDUCTION_TARGET</p>
                          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/15">
                            <div className="bg-white/80 h-full rounded-full" style={{ width: "98.4%" }} />
                          </div>
                        </div>
                      )}

                      {p.slug === "atelier-fashion" && (
                        <div className="w-full max-w-sm grid grid-cols-2 gap-4">
                          <div className="border border-white/10 rounded-lg p-3 flex flex-col justify-between aspect-square bg-white/5">
                            <span className="text-[10px] font-mono opacity-40">01 / CAPE</span>
                            <span className="font-display text-lg font-medium opacity-80">ATELIER CAFE</span>
                          </div>
                          <div className="border border-white/10 rounded-lg p-3 flex flex-col justify-between aspect-square bg-white/5">
                            <span className="text-[10px] font-mono opacity-40">02 / SILK</span>
                            <span className="font-display text-lg font-medium opacity-80">COUTURE NOIR</span>
                          </div>
                        </div>
                      )}

                      {p.slug === "halo-health" && (
                        <div className="w-full flex flex-col items-center space-y-3">
                          {/* Pulsing breathing ring */}
                          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-ping">
                            <div className="w-16 h-16 rounded-full bg-white/10" />
                          </div>
                          <span className="text-xs font-mono opacity-50">INHALE ... EXHALE</span>
                        </div>
                      )}
                    </div>

                    {/* Footer Row */}
                    <div className="flex justify-between items-center text-[9px] font-mono opacity-40">
                      <span>CRAFTED IN ORIVON LABS</span>
                      <span>©2026 // ALL RIGHTS RESERVED</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
