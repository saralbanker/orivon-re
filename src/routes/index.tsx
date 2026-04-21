import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Layers } from "lucide-react";
import { BackgroundPaths } from "@/components/BackgroundPaths";
import { RevealText } from "@/components/RevealText";
import { MagneticButton } from "@/components/MagneticButton";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Marquee } from "@/components/Marquee";
import { NeonButton } from "@/components/ui/neon-button";
import { HeroOrb } from "@/components/HeroOrb";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";
import { PROJECTS } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orivon — Award-winning digital design studio" },
      {
        name: "description",
        content:
          "Independent design studio building immersive websites, brand systems and digital products that win awards.",
      },
      { property: "og:title", content: "Orivon — Award-winning digital design studio" },
      {
        property: "og:description",
        content: "Brand. Web. Motion. Crafted with obsessive detail.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <Hero />
      <ScrollingTicker />
      <FeaturedWork />
      <Capabilities />
      <Numbers />
      <BigCTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center pt-32 pb-16">
      {/* SVG paths layer */}
      <BackgroundPaths />

      {/* Aurora + grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 bg-aurora pointer-events-none opacity-70" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Available for new projects · Q3 2025
        </motion.div>

        <h1 className="font-display font-bold tracking-tight leading-[0.9] text-[clamp(3rem,12vw,11rem)]">
          <span className="block text-gradient">We design the</span>
          <span className="block text-gradient-cyan">future, today.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto max-w-xl text-base md:text-lg text-muted-foreground mb-10 mt-10"
        >
          Orivon is an independent studio crafting brands, websites and digital products
          for ambitious teams who want to win.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/work">
            <NeonButton variant="solid" size="lg">
              Explore the work <ArrowRight size={18} />
            </NeonButton>
          </Link>
          <Link to="/contact">
            <NeonButton variant="default" size="lg">
              Start a project
            </NeonButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ScrollingTicker() {
  const items = [
    "Awwwards SOTD",
    "FWA",
    "CSS Design Awards",
    "Webby Honoree",
    "Lovie Gold",
    "ADC Bronze",
  ];
  return (
    <section className="border-y border-border py-8 bg-background/50 backdrop-blur-sm">
      <Marquee>
        {items.map((it) => (
          <span key={it} className="flex items-center gap-12 text-2xl font-display font-medium">
            <span className="text-foreground/70">{it}</span>
            <span className="text-primary">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const cards = ref.current!.querySelectorAll<HTMLElement>("[data-fw-card]");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const featured = PROJECTS.slice(0, 4);

  return (
    <section ref={ref} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-16 gap-6 flex-wrap">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Selected work</p>
            <RevealText
              text="Recent projects"
              as="h2"
              className="font-display text-5xl md:text-7xl font-bold"
            />
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {featured.map((p, i) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              data-fw-card
              className={`group relative block ${i % 2 === 1 ? "md:translate-y-16" : ""}`}
            >
              <div className="relative overflow-hidden rounded-3xl border border-border aspect-[4/3]">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="glass rounded-full px-3 py-1 text-xs">{p.category}</span>
                  <span className="glass rounded-full px-3 py-1 text-xs">{p.year}</span>
                </div>
              </div>
              <div className="flex items-start justify-between mt-5 gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{p.client}</p>
                </div>
                <span className="rounded-full glass p-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const items = [
    {
      Icon: Sparkles,
      title: "Brand identity",
      copy: "Strategy, naming, visual systems and guidelines that scale.",
    },
    {
      Icon: Layers,
      title: "Web & product",
      copy: "Websites, e-commerce and SaaS interfaces engineered for impact.",
    },
    {
      Icon: Zap,
      title: "Motion & 3D",
      copy: "Cinematic moments — from micro-interactions to WebGL worlds.",
    },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">What we do</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">
            <span className="text-gradient">A studio for</span>{" "}
            <span className="text-gradient-cyan">ambitious brands.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map(({ Icon, title, copy }) => (
            <SpotlightCard key={title} className="p-8 h-full">
              <Icon className="text-primary mb-6" size={28} />
              <h3 className="font-display text-2xl font-bold mb-3">{title}</h3>
              <p className="text-muted-foreground">{copy}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  const stats = [
    { v: "12+", l: "Years of craft" },
    { v: "180", l: "Shipped projects" },
    { v: "27", l: "Industry awards" },
    { v: "98%", l: "Client retention" },
  ];
  return (
    <section className="py-24 px-6 border-y border-border">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="font-display text-5xl md:text-7xl font-bold text-gradient-cyan">
              {s.v}
            </div>
            <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BigCTA() {
  return (
    <section className="relative py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-5xl text-center">
        <h2 className="font-display font-bold text-[clamp(2.5rem,9vw,7rem)] leading-[0.95]">
          <span className="text-gradient">Let's build</span>{" "}
          <span className="text-gradient-cyan">something legendary.</span>
        </h2>
        <p className="mt-8 text-muted-foreground text-lg max-w-xl mx-auto">
          We take on a small number of partners each quarter. If you have an idea worth doing right,
          we'd love to hear it.
        </p>
        <div className="mt-12">
          <MagneticButton
            as={Link}
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-9 py-5 text-lg font-semibold shadow-glow-cyan"
          >
            Start a project <ArrowRight size={20} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
