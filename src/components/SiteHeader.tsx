import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-6",
        "backdrop-blur-xl",
        scrolled
          ? "bg-background/70 border-b border-border/50"
          : "bg-background/30 md:bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 border border-primary/30">
            <span className="h-2 w-2 rounded-full bg-primary shadow-glow-cyan" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            ORIVON<span className="text-primary">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors",
                  active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <span className="absolute inset-0 rounded-full bg-primary shadow-glow-cyan -z-10" />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <MagneticButton
            as={Link}
            to="/contact"
            className="rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold"
          >
            Let's talk →
          </MagneticButton>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden glass rounded-full p-2.5"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mx-6 mt-3 rounded-2xl p-4 flex flex-col gap-1 bg-background/95 backdrop-blur-2xl border border-border shadow-xl">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                pathname === item.to
                  ? "bg-primary/15 text-primary"
                  : "text-foreground/80 hover:bg-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
