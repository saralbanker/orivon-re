import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.client} — Orivon Case Study` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.client} — Orivon` },
          { property: "og:description", content: loaderData.description },
          { property: "og:image", content: loaderData.image },
          { name: "twitter:image", content: loaderData.image },
        ]
      : [{ title: "Project — Orivon" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen pt-40 px-6 text-center">
      <h1 className="font-display text-5xl font-bold">Project not found</h1>
      <Link to="/work" className="mt-6 inline-flex text-primary">← Back to work</Link>
    </div>
  ),
  component: CaseStudy,
});

function CaseStudy() {
  const p = Route.useLoaderData();
  const others = PROJECTS.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft size={16} /> All work
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
            {p.category} · {p.year}
          </p>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.9]">{p.title}</h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">{p.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative overflow-hidden rounded-3xl border border-border aspect-[16/9]"
        >
          <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Meta label="Client" value={p.client} />
          <Meta label="Year" value={p.year} />
          <Meta label="Services" value={p.services.join(" · ")} />
        </div>

        <div className="mt-24 grid md:grid-cols-2 gap-12 items-start">
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-gradient">The challenge</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {p.client} came to us looking to redefine their digital presence. The existing
            experience was dated and didn't reflect the ambition of the brand. Our task: create a
            world-class flagship site that would set the new bar in {p.category.toLowerCase()}.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <motion.img
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              src={`${p.image}&sig=${i}`}
              alt=""
              className="rounded-3xl border border-border aspect-[4/3] object-cover w-full"
            />
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-2 gap-12 items-start">
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-gradient-cyan">The outcome</span>
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              We built a system that scales — from brand fundamentals to a custom design system, a
              fully responsive marketing site and a re-architected onboarding flow.
            </p>
            <p>
              The new experience launched to wide industry recognition, with picks on Awwwards,
              FWA and a 38% lift in qualified leads in the first quarter.
            </p>
          </div>
        </div>

        <div className="mt-32">
          <h3 className="font-display text-3xl font-bold mb-8">Next projects</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/work/$slug"
                params={{ slug: o.slug }}
                className="group block relative overflow-hidden rounded-3xl border border-border aspect-[16/10]"
              >
                <img
                  src={o.image}
                  alt={o.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-primary">{o.category}</p>
                    <h4 className="font-display text-2xl font-bold mt-1">{o.title}</h4>
                  </div>
                  <ArrowUpRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border pt-4">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</div>
      <div className="font-display text-xl">{value}</div>
    </div>
  );
}
