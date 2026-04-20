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

function WorkPage() {
  const cats = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="pt-40 pb-32 px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Selected work</p>
        <RevealText
          text="Things we've made."
          as="h1"
          className="font-display text-6xl md:text-9xl font-bold leading-[0.9]"
        />
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          A handful of recent projects across brand, web and product. Each one shipped with obsessive
          attention to detail.
        </p>

        <div className="flex flex-wrap gap-2 mt-12">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm transition-all border ${
                filter === c
                  ? "bg-primary text-primary-foreground border-primary shadow-glow-cyan"
                  : "border-border glass hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-x-8 gap-y-16">
          {items.map((p, i) => (
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
                <div className="relative overflow-hidden rounded-3xl border border-border aspect-[4/3]">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="glass rounded-full px-3 py-1 text-xs">{p.category}</span>
                    <span className="glass rounded-full px-3 py-1 text-xs">{p.year}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 rounded-full glass p-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                <div className="mt-5">
                  <h2 className="font-display text-3xl font-bold group-hover:text-primary transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-muted-foreground mt-2">{p.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
