import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MarqueeRow = () => (
  <div className="marquee whitespace-nowrap text-[clamp(2rem,6vw,5rem)] font-display font-bold py-3">
    {Array.from({ length: 8 }).map((_, i) => (
      <span key={i} className="px-8 inline-flex items-center gap-8 text-foreground/40">
        Available for projects <span className="text-primary">✦</span>
        Crafting digital experiences <span className="text-primary">✦</span>
      </span>
    ))}
  </div>
);

export const CinematicFooter = () => {
  const wrap = useRef<HTMLElement>(null);
  const giant = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        giant.current,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: wrap.current, start: "top 80%", end: "bottom bottom", scrub: 1 },
        },
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={wrap}
      className="relative overflow-hidden border-t border-border bg-background pt-20"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 bg-aurora opacity-50 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="overflow-hidden border-y border-border">
          <MarqueeRow />
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 py-20">
          <div>
            <h3 className="font-display text-3xl font-bold mb-4">
              Have a vision worth <span className="text-gradient-cyan">building</span>?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              We design and build award-winning digital products that move people and grow brands.
            </p>
            <MagneticButton
              as={Link}
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold shadow-glow-cyan"
            >
              Start a project →
            </MagneticButton>
          </div>

          <FooterCol
            title="Studio"
            links={[
              { label: "Work", to: "/work" },
              { label: "Services", to: "/services" },
              { label: "Process", to: "/process" },
              { label: "About", to: "/about" },
            ]}
          />
          <FooterCol
            title="Connect"
            links={[
              { label: "Contact", to: "/contact" },
              { label: "hello@orivon.studio", href: "mailto:hello@orivon.studio" },
            ]}
          />
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-widest text-muted-foreground">
              Social
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Github, label: "GitHub" },
                { Icon: Mail, label: "Email" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="glass rounded-full p-3 hover:border-primary/40 hover:text-primary transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={giant}
          className="text-center font-display font-black leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-primary/30 to-transparent select-none"
          style={{ fontSize: "clamp(5rem, 26vw, 26rem)" }}
        >
          ORIVON
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 border-t border-border text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Orivon Studio. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 hover:text-primary transition-colors"
          >
            <ArrowUp size={16} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; to?: string; href?: string }[];
}) => (
  <div>
    <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-widest text-muted-foreground">
      {title}
    </h4>
    <ul className="space-y-2.5">
      {links.map((l) => (
        <li key={l.label}>
          {l.to ? (
            <Link to={l.to} className="hover:text-primary transition-colors">
              {l.label}
            </Link>
          ) : (
            <a href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
);
