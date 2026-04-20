import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Send } from "lucide-react";
import { RevealText } from "@/components/RevealText";
import { MagneticButton } from "@/components/MagneticButton";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Orivon Studio" },
      {
        name: "description",
        content: "Tell us about your project. We respond within 48 hours.",
      },
      { property: "og:title", content: "Contact — Orivon Studio" },
      { property: "og:description", content: "Start a project with Orivon Studio." },
    ],
  }),
  component: Contact,
});

const BUDGETS = ["< $25k", "$25–75k", "$75–150k", "$150k+"];
const SERVICES = ["Brand", "Web", "Product", "Motion / 3D", "E-commerce"];

function Contact() {
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (s: string) =>
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-40 pb-32 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Contact</p>
        <RevealText
          text="Let's make something"
          as="h1"
          className="font-display text-5xl md:text-9xl font-bold leading-[0.9] block"
        />
        <RevealText
          text="unforgettable."
          as="h1"
          className="font-display text-5xl md:text-9xl font-bold leading-[0.9] block text-gradient-cyan"
          delay={300}
        />

        <div className="mt-20 grid lg:grid-cols-[1.4fr_1fr] gap-16">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-12 text-center"
            >
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mb-6">
                <Send className="text-primary" />
              </div>
              <h2 className="font-display text-3xl font-bold mb-3">Message received.</h2>
              <p className="text-muted-foreground">
                Thanks for reaching out. We'll be in touch within 48 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Your name" name="name" placeholder="Ada Lovelace" required />
                <Field label="Email" name="email" type="email" placeholder="ada@studio.com" required />
              </div>
              <Field label="Company" name="company" placeholder="Acme Inc." />

              <div>
                <Label>What can we help with?</Label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggle(s)}
                      className={`rounded-full px-4 py-2 text-sm border transition-all ${
                        selected.includes(s)
                          ? "bg-primary text-primary-foreground border-primary shadow-glow-cyan"
                          : "border-border glass hover:border-primary/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Budget</Label>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <label
                      key={b}
                      className="rounded-full px-4 py-2 text-sm border border-border glass hover:border-primary/40 transition-colors cursor-pointer has-checked:bg-primary has-checked:text-primary-foreground has-checked:border-primary"
                    >
                      <input type="radio" name="budget" value={b} className="sr-only" />
                      {b}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label>Tell us more</Label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="What are you trying to build? When do you want to launch?"
                  className="w-full rounded-2xl glass border border-border bg-transparent px-5 py-4 text-base placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>

              <MagneticButton
                as="button"
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 font-semibold shadow-glow-cyan"
              >
                Send message <ArrowRight size={18} />
              </MagneticButton>
            </form>
          )}

          <aside className="space-y-8">
            <Info Icon={Mail} label="Email" value="hello@orivon.studio" />
            <Info Icon={MapPin} label="Studios" value="London · Lisbon" />
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold mb-2">Response time</h3>
              <p className="text-sm text-muted-foreground">
                We reply to every brief within 48 hours, Monday to Friday.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold mb-2">Press & speaking</h3>
              <p className="text-sm text-muted-foreground">
                For interviews and event invitations:{" "}
                <a className="text-primary" href="mailto:press@orivon.studio">
                  press@orivon.studio
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{children}</div>
);

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl glass border border-border bg-transparent px-5 py-4 text-base placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}

function Info({
  Icon,
  label,
  value,
}: {
  Icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full glass p-3">
        <Icon className="text-primary" size={18} />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
        <div className="font-display text-xl">{value}</div>
      </div>
    </div>
  );
}
