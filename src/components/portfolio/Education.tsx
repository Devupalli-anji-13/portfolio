import { GraduationCap, Languages, MessageSquare, Clock, Puzzle, Users, ScanSearch, Shuffle } from "lucide-react";
import { education, languages, softSkills } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

const softIcons = [MessageSquare, Clock, Puzzle, Users, ScanSearch, Shuffle];

export function Education() {
  return (
    <section id="education" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Education" title="My Academic Journey." />
        <div className="relative space-y-6 border-l border-border pl-8 md:pl-12">
          {education.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.15}>
              <div className="relative">
                <span className="absolute -left-[41px] top-7 h-3 w-3 rounded-full bg-primary shadow-glow md:-left-[57px]" />
                <div className="glass glow-border flex flex-col gap-4 rounded-2xl p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-4">
                    <GraduationCap className="mt-1 h-6 w-6 shrink-0 text-primary" />
                    <div>
                      <h3 className="text-xl font-semibold">{e.title}</h3>
                      <p className="text-muted-foreground">{e.school}, {e.place}</p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">{e.meta}</p>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <p className="font-display text-3xl font-bold text-gradient">{e.score}</p>
                    <p className="text-[11px] text-muted-foreground">Resume-listed score</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-10 md:grid-cols-[2fr_1fr]">
          <Reveal>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-primary">Soft skills</p>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((s, i) => {
                const I = softIcons[i];
                return (
                  <span key={s} className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/50">
                    <I className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" /> {s}
                  </span>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-primary">Languages</p>
            <ul className="space-y-3">
              {languages.map((l) => (
                <li key={l.name} className="flex items-center justify-between border-b border-border pb-3">
                  <span className="flex items-center gap-2"><Languages className="h-4 w-4 text-muted-foreground" />{l.name}</span>
                  <span className="text-sm text-muted-foreground">{l.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
