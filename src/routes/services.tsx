import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Palette, Code2, Sparkles, Camera, ShoppingBag, LineChart } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { RevealText } from "@/components/RevealText";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Orivon Studio" },
      {
        name: "description",
        content:
          "Brand, web, product, motion and e-commerce — six core services from Orivon, an independent design studio.",
      },
      { property: "og:title", content: "Services — Orivon Studio" },
      {
        property: "og:description",
        content: "What Orivon does best — brand systems, websites, product design and motion.",
      },
    ],
  }),
  component: Services,
});

const SERVICES = [
  {
    Icon: Palette,
    title: "Brand identity",
    copy: "Strategy, naming, logos and visual systems that work hard everywhere.",
    items: ["Brand strategy", "Visual identity", "Guidelines", "Naming"],
  },
  {
    Icon: Code2,
    title: "Web & development",
    copy: "Marketing sites, complex web apps and headless e-commerce — fast, accessible, beautiful.",
    items: ["Marketing sites", "Web apps", "Headless CMS", "Performance"],
  },
  {
    Icon: Sparkles,
    title: "Motion & 3D",
    copy: "From micro-interactions to full WebGL experiences. We make pixels move with intent.",
    items: ["UI motion", "WebGL/3D", "Brand films", "Product reveals"],
  },
  {
    Icon: ShoppingBag,
    title: "E-commerce",
    copy: "Shopify, Centra and headless storefronts that convert and feel premium.",
    items: ["Shopify", "Headless", "Conversion", "Subscription"],
  },
  {
    Icon: Camera,
    title: "Art direction",
    copy: "Photography, CGI and content systems that elevate your brand.",
    items: ["Photo direction", "CGI", "Content systems", "Campaigns"],
  },
  {
    Icon: LineChart,
    title: "Product design",
    copy: "End-to-end product UX — from research and prototypes to design systems and ship.",
    items: ["UX research", "Prototyping", "Design systems", "Iteration"],
  },
];

function Services() {
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Services</p>
        <RevealText
          text="What we do best."
          as="h1"
          className="font-display text-6xl md:text-9xl font-bold leading-[0.9]"
        />
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          Six tightly integrated practices, one studio. We move quickly between disciplines so your
          brand stays coherent end-to-end.
        </p>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ Icon, title, copy, items }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <SpotlightCard className="p-8 h-full">
                <Icon size={28} className="text-primary mb-6" />
                <h3 className="font-display text-2xl font-bold mb-3">{title}</h3>
                <p className="text-muted-foreground mb-6">{copy}</p>
                <ul className="space-y-2 text-sm">
                  {items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {it}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 glass rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-bold">
              Got a brief? <span className="text-gradient-cyan">Let's scope it together.</span>
            </h3>
            <p className="text-muted-foreground mt-3 max-w-md">
              Tell us about the project — we'll come back within 48 hours.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 font-semibold shadow-glow-cyan whitespace-nowrap"
          >
            Get in touch <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
