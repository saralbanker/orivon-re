import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Layers, ShoppingBag } from "lucide-react";
import { RevealText } from "@/components/RevealText";
import { MagneticButton } from "@/components/MagneticButton";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Marquee } from "@/components/Marquee";
import { NeonButton } from "@/components/ui/neon-button";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import { ScrollStoryHorizontal } from "@/components/ScrollStoryHorizontal";
import { ScrollRevealPanel } from "@/components/ScrollRevealPanel";
import { PROJECTS } from "@/data/projects";
import { LusionSandbox } from "@/components/LusionSandbox";
import { MorphingBlob } from "@/components/canvas/MorphingBlob";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative bg-background text-foreground transition-colors duration-500 font-sans">
      <Hero />
      <ScrollingTicker />
      
      {/* Horizontal Storytelling Scroll for Selected Work */}
      <section className="relative">
        <ScrollStoryHorizontal projects={PROJECTS} />
      </section>

      {/* Capabilities Vertical Stacking Cards */}
      <section className="py-32 px-6 bg-background relative z-10">
        <div className="mx-auto max-w-5xl mb-20" data-cursor-text="SERVICES">
          <span className="text-xs text-[var(--brand-pink)] font-mono font-medium mb-4 block">
            — Capabilities
          </span>
          <h2 className="font-serif text-4xl md:text-7xl font-normal leading-[1.05] tracking-tighter">
            Bespoke capabilities <br />
            <span className="text-muted-foreground font-sans font-bold text-3xl md:text-5xl block mt-3">engineered for digital impact.</span>
          </h2>
        </div>
        <ScrollRevealPanel panels={CAPABILITIES} />
      </section>

      <StudioManifesto />
      <Numbers />
      <BigCTA />
    </div>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      // Subtle scroll fade for hero title
      gsap.to(titleRef.current, {
        opacity: 0.2,
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom 90%",
          end: "bottom 30%",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden flex items-center pt-32 pb-24">
      {/* Interactive Physics Sandbox Backdrop */}
      <LusionSandbox isHeroBg={true} />
      
      {/* Morphing 3D WebGL shape background */}
      <MorphingBlob />
      
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-aurora pointer-events-none opacity-20" />

      <div className="relative z-10 mx-auto max-w-4xl w-full px-6 flex flex-col items-center text-center">
        <div className="flex justify-center mb-6" data-cursor-text="INFO">
          <AnimatedBadge text="Crafted by humans · Q3 2026" />
        </div>

        <h1
          ref={titleRef}
          className="font-serif font-normal tracking-tighter leading-[0.95] text-[clamp(3.5rem,8vw,7.5rem)] text-foreground text-center"
        >
          We design <br />
          <em className="text-[var(--brand-pink)] italic">storytelling</em> <br />
          websites.
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl text-base md:text-lg text-muted-foreground mt-8 leading-relaxed font-sans font-normal text-center"
        >
          Orivon is an independent design studio. We reject template layouts and complex 3D meshes to focus on high-fidelity typography, tactile interfaces, and meaningful storytelling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-4 mt-10"
        >
          <Link to="/work" data-cursor-text="WORK">
            <NeonButton variant="solid" size="lg">
              Explore the work <ArrowRight size={18} className="ml-1" />
            </NeonButton>
          </Link>
          <Link to="/contact" data-cursor-text="TALK">
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
    "FWA Site of the Month",
    "CSS Design Awards",
    "Webby Honoree",
    "Lovie Gold Winner",
    "ADC Design Award",
  ];
  return (
    <section className="border-y border-border py-8 bg-background/50 backdrop-blur-sm relative z-10" data-cursor-text="HONORS">
      <Marquee>
        {items.map((it) => (
          <span key={it} className="flex items-center gap-12 text-2xl font-serif font-normal">
            <span className="text-foreground/70">{it}</span>
            <span className="text-[var(--brand-pink)] font-sans">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

interface ScrollWordParagraphProps {
  text: string;
  className?: string;
}

function ScrollWordParagraph({ text, className = "" }: ScrollWordParagraphProps) {
  const words = text.split(" ");
  return (
    <p data-split-words className={`${className} leading-tight`}>
      {words.map((word, i) => (
        <span key={i} className="manifesto-word inline-block mr-[0.25em] transition-colors duration-150">
          {word}
        </span>
      ))}
    </p>
  );
}

function StudioManifesto() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      const paragraphs = textRef.current!.querySelectorAll("[data-split-words]");
      paragraphs.forEach((p) => {
        const words = p.querySelectorAll(".manifesto-word");
        
        // Highlight words staggered on scroll
        gsap.fromTo(
          words,
          { 
            opacity: 0.15,
          },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
              end: "bottom 55%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, textRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-40 px-6 bg-[var(--muted)] relative z-10 border-y border-border" data-cursor-text="CREED">
      <div className="mx-auto max-w-4xl text-left" ref={textRef}>
        <span className="text-xs text-[var(--brand-pink)] font-mono mb-6 block">
          — Philosophy
        </span>
        <div className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal leading-relaxed space-y-8 text-foreground">
          <ScrollWordParagraph text="We believe that templates dilute your brand value." />
          <ScrollWordParagraph text="An award-winning website is not built with 3D spinners or pre-made UI blocks." />
          <ScrollWordParagraph text="It is crafted with bespoke typography scales, custom layouts, and animations that adapt to the user’s scroll cadence." />
          <ScrollWordParagraph text="Every pixel should feel human-made." className="text-[var(--brand-pink)] font-serif italic font-medium" />
        </div>
      </div>
    </section>
  );
}

const CAPABILITIES = [
  {
    n: "01",
    title: "Brand strategy",
    copy: "Strategy, positioning, and visual systems that scale across every digital viewport.",
    Icon: Sparkles,
    color: "var(--brand-pink)",
    textDark: false,
  },
  {
    n: "02",
    title: "Web & product design",
    copy: "Marketing sites, design systems, and complex product interfaces engineered to perform.",
    Icon: Layers,
    color: "var(--brand-teal)",
    textDark: false,
  },
  {
    n: "03",
    title: "Motion direction",
    copy: "Bespoke page transitions, scroll-tied events, and subtle micro-interactions.",
    Icon: Zap,
    color: "var(--brand-lavender)",
    textDark: true,
  },
  {
    n: "04",
    title: "Headless E-commerce",
    copy: "Fast-loading online storefronts tailored for conversion and premium design feel.",
    Icon: ShoppingBag,
    color: "var(--brand-peach)",
    textDark: true,
  },
];

interface StatCounterProps {
  value: string;
}

function StatCounter({ value }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: numericPart,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          setDisplayValue(Math.floor(obj.val));
        },
      });
    }, el);

    return () => ctx.revert();
  }, [numericPart]);

  return (
    <span ref={containerRef}>
      {displayValue}
      {suffix}
    </span>
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
    <section className="py-24 px-6 border-b border-border bg-background relative z-10" data-cursor-text="STATS">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <SpotlightCard key={s.l} className="p-6 md:p-8 bg-[var(--card)] border border-border">
            <div className="font-serif text-5xl md:text-7xl font-normal text-[var(--brand-pink)]">
              <StatCounter value={s.v} />
            </div>
            <div className="mt-2 text-xs text-muted-foreground font-mono font-medium">
              {s.l}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

interface KineticTextProps {
  text: string;
}

function KineticText({ text }: KineticTextProps) {
  const onLetterHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    gsap.to(el, {
      x: (Math.random() - 0.5) * 25,
      y: (Math.random() - 0.5) * 25,
      rotation: (Math.random() - 0.5) * 40,
      color: "var(--brand-teal)",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const onLetterLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    gsap.to(el, {
      x: 0,
      y: 0,
      rotation: 0,
      color: "inherit",
      duration: 0.8,
      ease: "elastic.out(1.1, 0.4)",
    });
  };

  return (
    <span className="inline-block">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block cursor-default select-none transition-colors duration-150"
          style={{ display: char === " " ? "inline" : "inline-block" }}
          onMouseEnter={onLetterHover}
          onMouseLeave={onLetterLeave}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function BigCTA() {
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;
    const ctx = gsap.context(() => {
      // Scale up text as user scrolls into the CTA section
      gsap.fromTo(
        textRef.current,
        { scale: 0.85 },
        {
          scale: 1.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-48 px-6 overflow-hidden bg-background border-b border-border">
      <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-5xl text-center flex flex-col items-center">
        <h2 className="font-serif font-normal leading-[0.95] text-[clamp(3rem,8vw,7rem)] tracking-tighter">
          <span ref={textRef} className="block text-[var(--brand-pink)] origin-center transition-transform">
            <KineticText text="Let's build" /> <br />
            <em className="font-serif italic text-foreground">
              <KineticText text="something legendary." />
            </em>
          </span>
        </h2>
        <p className="mt-8 text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed font-sans">
          We take on a small number of partners each quarter. If you have an idea worth doing right, we'd love to hear it.
        </p>
        <div className="mt-12">
          <MagneticButton
            as={Link}
            to="/contact"
            data-cursor-text="TALK"
            className="inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-8 py-4.5 text-base font-semibold shadow-glow-cyan"
          >
            Start a project <ArrowRight size={18} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
