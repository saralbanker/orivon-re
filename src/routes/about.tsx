import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { RevealText } from "@/components/RevealText";
import { Marquee } from "@/components/Marquee";
import { SpotlightCard } from "@/components/SpotlightCard";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Orivon Studio" },
      {
        name: "description",
        content: "An independent design studio of seven obsessives based between London and Lisbon.",
      },
      { property: "og:title", content: "About — Orivon Studio" },
      { property: "og:description", content: "Meet the studio behind Orivon." },
    ],
  }),
  component: About,
});

const SKILLS = [
  "Brand Strategy",
  "UX/UI",
  "Webflow",
  "TanStack",
  "Three.js",
  "GSAP",
  "Framer Motion",
  "Shopify",
  "Figma",
  "After Effects",
  "Cinema 4D",
  "Blender",
];

const TEAM = [
  {
    name: "Maya Iro",
    role: "Founder, ECD",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Theo Vance",
    role: "Design Director",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Sasha Lin",
    role: "Tech Director",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Noor Abadi",
    role: "Motion Lead",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop",
  },
];

function About() {
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">About</p>
        <RevealText
          text="A small studio,"
          as="h1"
          className="font-display text-5xl md:text-9xl font-bold leading-[0.9] block"
        />
        <RevealText
          text="big ambitions."
          as="h1"
          className="font-display text-5xl md:text-9xl font-bold leading-[0.9] block text-gradient-cyan"
          delay={300}
        />

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
          <div className="text-lg text-muted-foreground space-y-5 leading-relaxed">
            <p>
              Orivon is an independent design studio of seven obsessives based between London and
              Lisbon. We partner with founders and brand teams to build digital products that move
              people.
            </p>
            <p>
              We believe great work is the result of taste, craft and conviction — held in tension
              with curiosity and discipline. We say no to a lot, so we can say yes well.
            </p>
            <p>
              Since 2013 we've shipped 180+ projects for clients across fintech, fashion,
              aerospace, climate and beyond.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border"
          >
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80&auto=format&fit=crop"
              alt="Studio"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </motion.div>
        </div>

        <div className="mt-32">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-12">
            <span className="text-gradient">The team.</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border mb-4">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="h-full w-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-display text-xl font-bold">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-32">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-12">
            <span className="text-gradient-cyan">What we use.</span>
          </h2>
          <Marquee className="-mx-6">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="text-3xl md:text-5xl font-display font-bold flex items-center gap-12 text-foreground/60 hover:text-primary transition-colors"
              >
                {s} <span className="text-primary">✦</span>
              </span>
            ))}
          </Marquee>
        </div>

        <div className="mt-32 grid md:grid-cols-3 gap-6">
          {[
            { t: "Craft", c: "We obsess over the last 10%. It's where the magic lives." },
            { t: "Honesty", c: "Direct conversations, transparent timelines, no surprises." },
            { t: "Curiosity", c: "We learn in public and bring fresh thinking to every brief." },
          ].map((v) => (
            <SpotlightCard key={v.t} className="p-8">
              <h3 className="font-display text-2xl font-bold mb-3 text-gradient-cyan">{v.t}</h3>
              <p className="text-muted-foreground">{v.c}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
}
