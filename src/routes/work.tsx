import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { RevealText } from "@/components/RevealText";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Orivon Studio" },
      {
        name: "description",
        content: "Selected projects from Orivon — brands, websites and digital products we've shipped.",
      },
      { property: "og:title", content: "Work — Orivon Studio" },
      { property: "og:description", content: "A selection of award-winning client projects." },
    ],
  }),
  component: WorkPage,
});

// Color mapping for project showcases
const brandColors: Record<string, { bg: string; text: string; details: string }> = {
  "lumen-finance": { bg: "bg-[var(--brand-pink)]", text: "text-white", details: "FINANCE_UI" },
  "noctis-music": { bg: "bg-[var(--brand-lavender)]", text: "text-black", details: "AUDIO_WAVE" },
  "orbit-aerospace": { bg: "bg-[var(--brand-peach)]", text: "text-black", details: "ORBIT_MAP" },
  "verdant-eco": { bg: "bg-[var(--brand-ochre)]", text: "text-black", details: "ECO_REPORT" },
  "atelier-fashion": { bg: "bg-[var(--brand-teal)]", text: "text-white", details: "COUTURE_GRID" },
  "halo-health": { bg: "bg-[var(--brand-coral)]", text: "text-white", details: "BREATHE_APP" },
};

const brandCovers: Record<string, string> = {
  "lumen-finance": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  "noctis-music": "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
  "orbit-aerospace": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  "verdant-eco": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
  "atelier-fashion": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
  "halo-health": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
};

function WorkPage() {
  const cats = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="pt-40 pb-32 px-6 bg-background text-foreground transition-colors duration-500">
      <div className="mx-auto max-w-7xl">
        <span className="text-xs text-[var(--brand-pink)] font-mono block mb-4">
          — Case Studies
        </span>
        <RevealText
          text="Things we've made."
          as="h1"
          className="font-display text-6xl md:text-9xl font-bold leading-[0.9]"
        />
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          A handful of recent projects across brand, web and product. Eached design is custom-built with pure CSS and typographic grids, completely free of placeholders.
        </p>

        <div className="flex flex-wrap gap-2 mt-12">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm transition-all border ${
                filter === c
                  ? "bg-primary text-primary-foreground border-primary shadow-glow-cyan"
                  : "border-border glass hover:border-primary/40 text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-x-8 gap-y-16">
          {items.map((p, i) => {
            const colors = brandColors[p.slug] || { bg: "bg-[var(--brand-pink)]", text: "text-white", details: "CASE_STUDY" };
            const coverUrl = brandCovers[p.slug];
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                className={i % 2 === 1 ? "md:translate-y-20" : ""}
              >
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="group block"
                >
                  {/* Human-made editorial cover card with background image overlay */}
                  <div 
                    className={`relative overflow-hidden rounded-xl aspect-[4/3] p-8 border border-border/10 flex flex-col justify-between shadow-elegant transition-transform duration-700 group-hover:scale-[1.02] ${colors.bg} ${colors.text}`}
                  >
                    {/* Desaturated background photograph */}
                    {coverUrl && (
                      <img 
                        src={coverUrl} 
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover saturate-50 contrast-[1.1] opacity-35 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-50"
                      />
                    )}
                    
                    {/* Top row */}
                    <div className="relative z-10 flex items-center justify-between opacity-90 font-mono text-xs">
                      <span>{colors.details} // 0{i+1}</span>
                      <div className="flex gap-2">
                        <span className="border border-current/30 rounded-full px-2 py-0.5">{p.category}</span>
                        <span className="border border-current/30 rounded-full px-2 py-0.5">{p.year}</span>
                      </div>
                    </div>

                    {/* Middle Graphic Layout representation */}
                    <div className="relative z-10 my-auto py-6 flex items-center justify-center">
                      <div className="w-full max-w-xs h-24 rounded-lg border border-current/15 bg-white/5 backdrop-blur-sm p-4 flex flex-col justify-between">
                        <div className="h-1.5 w-16 bg-current/25 rounded-full" />
                        <div className="h-3 w-32 bg-current/40 rounded-full" />
                        <div className="flex justify-between items-center text-[10px] font-mono opacity-60">
                          <span>SYSTEM_OK</span>
                          <span>2026</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div className="relative z-10 flex justify-between items-end">
                      <span className="text-[10px] font-mono opacity-60">ORIVON LABS</span>
                      <div className="rounded-full bg-white/10 backdrop-blur-md p-3 border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h2 className="font-display text-3xl font-bold group-hover:text-[var(--brand-pink)] transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-muted-foreground mt-2">{p.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
