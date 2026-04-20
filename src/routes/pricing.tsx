import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { RevealText } from "@/components/RevealText";
import { NeonButton } from "@/components/ui/neon-button";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Orivon Studio" },
      {
        name: "description",
        content: "Transparent engagement models for brand, web and product partnerships.",
      },
      { property: "og:title", content: "Pricing — Orivon Studio" },
      { property: "og:description", content: "Engagement models built for ambitious teams." },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Sprint",
    description: "A focused 2–3 week burst for landing pages, brand refreshes or launch moments.",
    price: 12,
    yearlyPrice: 99,
    cta: "Start a sprint",
    popular: false,
    includes: [
      "Includes:",
      "Discovery & strategy session",
      "1 senior designer + 1 engineer",
      "Up to 3 page templates",
      "Motion micro-interactions",
      "Async daily updates",
      "30-day post-launch support",
    ],
  },
  {
    name: "Studio",
    description: "Our flagship engagement — full brand systems, websites and product UI.",
    price: 48,
    yearlyPrice: 399,
    cta: "Book the studio",
    popular: true,
    includes: [
      "Everything in Sprint, plus:",
      "Dedicated cross-functional team",
      "Brand strategy + identity system",
      "Up to 12 page templates / flows",
      "3D / WebGL moments",
      "CMS integration",
      "Quarterly evolution roadmap",
    ],
  },
  {
    name: "Atelier",
    description: "An embedded partnership for in-house teams scaling design across the org.",
    price: 96,
    yearlyPrice: 899,
    cta: "Talk to founders",
    popular: false,
    includes: [
      "Everything in Studio, plus:",
      "Embedded design + eng pod",
      "Design system + governance",
      "Unlimited templates / surfaces",
      "Native motion direction",
      "Weekly senior reviews",
      "12-month strategic partnership",
    ],
  },
];

function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="relative pt-40 pb-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-40 pointer-events-none" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="relative mx-auto max-w-6xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4 inline-flex items-center gap-2">
          <Sparkles size={14} /> Engagement models
        </p>
        <RevealText
          text="Plans built for"
          as="h1"
          className="font-display text-5xl md:text-8xl font-bold leading-[0.9] block"
        />
        <RevealText
          text="ambitious teams."
          as="h1"
          className="font-display text-5xl md:text-8xl font-bold leading-[0.9] block text-gradient-cyan"
          delay={300}
        />
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
          Transparent fixed-fee partnerships. Pick the cadence that fits — every plan ships
          award-grade craft.
        </p>

        {/* Billing toggle */}
        <div className="mt-12 inline-flex items-center rounded-full glass border border-border p-1">
          {[
            { k: "monthly", label: "Monthly" },
            { k: "yearly", label: "Yearly · save 15%" },
          ].map((opt) => {
            const active = (opt.k === "yearly") === yearly;
            return (
              <button
                key={opt.k}
                onClick={() => setYearly(opt.k === "yearly")}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                  active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="bill-toggle"
                    className="absolute inset-0 rounded-full bg-primary shadow-glow-cyan"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div className="relative mx-auto mt-20 grid max-w-7xl gap-6 md:grid-cols-3">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={cn(
              "relative rounded-3xl p-8 border transition-all",
              p.popular
                ? "bg-primary/5 border-primary/40 shadow-glow-cyan"
                : "glass border-border hover:border-primary/30",
            )}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                Most loved
              </span>
            )}
            <h3 className="font-display text-2xl font-bold">{p.name}</h3>
            <div className="mt-6 flex items-end gap-1">
              <span className="font-display text-6xl font-bold text-gradient-cyan">
                ${yearly ? p.yearlyPrice : p.price}k
              </span>
              <span className="text-muted-foreground pb-2">/{yearly ? "year" : "engagement"}</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{p.description}</p>

            <NeonButton
              variant={p.popular ? "solid" : "default"}
              size="lg"
              className="mt-8 w-full"
            >
              {p.cta}
            </NeonButton>

            <div className="mt-8 space-y-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                {p.includes[0]}
              </p>
              {p.includes.slice(1).map((f) => (
                <div key={f} className="flex items-start gap-3 text-sm">
                  <Check size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/80">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-20 text-center text-sm text-muted-foreground">
        Custom scope? <a href="/contact" className="text-primary hover:underline">Tell us about your project →</a>
      </div>
    </div>
  );
}
