import { motion } from "framer-motion";
import { process } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

export function Process() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Process" title="How I Bring Ideas to Life." />
        <div className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          <motion.div
            className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-primary via-violet to-transparent md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          {process.map((s, i) => (
            <Reveal key={s.n} delay={0.2 + i * 0.2}>
              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-background font-mono text-sm text-primary shadow-glow">
                  {s.n}
                </div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
