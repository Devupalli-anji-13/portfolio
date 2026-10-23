import { Code2, Database, Layout, Server, Sparkles, Wrench } from "lucide-react";
import type { MouseEvent } from "react";
import { skills } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

const icons = [Code2, Layout, Server, Database, Wrench, Sparkles];

function spotlight(e: MouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Skills" title="My Technical Arsenal." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => {
            const Icon = icons[i] ?? Code2;
            return (
              <Reveal key={g.title} delay={i * 0.06}>
                <div
                  onMouseMove={spotlight}
                  className="group glow-border relative h-full overflow-hidden rounded-2xl bg-card p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(300px_circle_at_var(--mx)_var(--my),color-mix(in_oklab,var(--primary)_14%,transparent),transparent_70%)]" />
                  <div className="relative">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mb-4 text-lg font-semibold">{g.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <span key={s.name} className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs text-foreground/90 transition-colors hover:border-primary/50 hover:text-primary">
                          {s.name}
                          {s.note && <span className="ml-1.5 text-[10px] text-violet">· {s.note}</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
