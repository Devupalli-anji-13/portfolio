import { Compass, Cpu, RefreshCw } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";

const paragraphs = [
  "I'm Devupalli Anji, an aspiring full-stack developer with a strong interest in Python development, modern web applications, database systems, and AI-powered tools.",
  "I enjoy transforming ideas into functional applications, building intuitive interfaces, developing backend APIs, and experimenting with intelligent automation.",
  "Through academic and personal projects, I have explored authentication workflows, database-driven applications, administrative dashboards, and AI-assisted desktop automation.",
  "I'm continuously improving my technical skills and looking for opportunities to contribute to meaningful software projects while growing as a developer.",
];

const cards = [
  { icon: Compass, label: "Focus", value: "Full-Stack Development" },
  { icon: Cpu, label: "Interest", value: "AI & Automation" },
  { icon: RefreshCw, label: "Approach", value: "Learn, Build, Improve" },
];

function StackIllustration() {
  const layers = [
    { name: "Interface", tech: "HTML · CSS · JS · Angular" },
    { name: "API", tech: "Flask · Spring Boot · REST" },
    { name: "Intelligence", tech: "OpenAI APIs · Automation" },
    { name: "Data", tech: "MySQL" },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md [perspective:1200px]">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 [transform:rotateX(55deg)_rotateZ(-35deg)] [transform-style:preserve-3d]">
        {layers.map((l, i) => (
          <div
            key={l.name}
            className="glass glow-border flex h-20 w-72 items-center justify-between rounded-2xl px-5 shadow-card transition-transform duration-500 hover:[transform:translateZ(30px)]"
            style={{ transform: `translateZ(${(layers.length - i) * 18}px)` }}
          >
            <span className="font-mono text-xs text-primary">0{i + 1}</span>
            <div className="text-right">
              <p className="font-display text-sm font-semibold">{l.name}</p>
              <p className="text-[11px] text-muted-foreground">{l.tech}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="About" title="Beyond the Code." />
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "text-foreground" : ""}>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <StackIllustration />
          </Reveal>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.1}>
              <div className="glow-border rounded-2xl bg-card p-6 transition-transform duration-300 hover:-translate-y-1">
                <c.icon className="mb-4 h-5 w-5 text-primary" />
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{c.label}</p>
                <p className="mt-1 font-display text-lg font-semibold">{c.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
