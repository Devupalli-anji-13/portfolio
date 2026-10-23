import { useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Github, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ProjectPreview } from "./ProjectPreview";
import { Reveal, SectionHeading, btn } from "./primitives";

function ProjectLinks({ p }: { p: Project }) {
  if (!p.liveUrl && !p.sourceUrl) return null;
  return (
    <div className="flex gap-2">
      {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className={btn.small} onClick={(e) => e.stopPropagation()}><ExternalLink className="h-3.5 w-3.5" /> Live Demo</a>}
      {p.sourceUrl && <a href={p.sourceUrl} target="_blank" rel="noreferrer" className={btn.small} onClick={(e) => e.stopPropagation()}><Github className="h-3.5 w-3.5" /> Source Code</a>}
    </div>
  );
}

function TiltCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 15 });
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onMouseMove={move}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen())}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${p.title}`}
      className="group glow-border relative flex h-full cursor-pointer flex-col rounded-3xl bg-card p-5 shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="h-52 [transform:translateZ(40px)] transition-transform duration-500 group-hover:scale-[1.02]">
        <ProjectPreview kind={p.preview} />
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-xs text-primary">PROJECT {p.number}</span>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
        <h3 className="text-xl font-semibold">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] text-muted-foreground">{s}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Projects" title="Things I've Built." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} className="h-full">
              <TiltCard p={p} onOpen={() => setOpen(p)} />
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-card">
          {open && (
            <>
              <div className="h-56"><ProjectPreview kind={open.preview} /></div>
              <span className="mt-2 font-mono text-xs text-primary">PROJECT {open.number}</span>
              <DialogTitle className="font-display text-2xl">{open.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground">{open.description}</DialogDescription>
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Key features</p>
                <ul className="space-y-2">
                  {open.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {open.stack.map((s) => (
                  <span key={s} className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] text-muted-foreground">{s}</span>
                ))}
              </div>
              <ProjectLinks p={open} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
