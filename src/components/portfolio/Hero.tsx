import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { ClientOnly } from "@tanstack/react-router";
import { RESUME_PATH } from "@/data/portfolio";
import { btn, Magnetic } from "./primitives";

const HeroScene = lazy(() => import("./HeroScene"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function SceneFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-56 w-56 rounded-full border border-primary/30 bg-[radial-gradient(circle_at_30%_30%,var(--primary),transparent_60%)] opacity-40 blur-sm" />
    </div>
  );
}

function SceneSlot() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => setOk(hasWebGL()), []);
  if (!ok) return <SceneFallback />;
  return (
    <Suspense fallback={<SceneFallback />}>
      <HeroScene />
    </Suspense>
  );
}

const heading = ["Hi,", "I'm", "Devupalli", "Anji."];

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-violet/20 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-6 lg:grid-cols-2">
        <div className="relative z-10">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-primary"
          >
            Full-Stack Developer | Python
          </motion.p>
          <h1 className="text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
            {heading.map((w, i) => (
              <motion.span
                key={w}
                className={`mr-[0.25em] inline-block ${i >= 2 ? "text-gradient" : ""}`}
                initial={reduce ? false : { opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
            <p className="mt-6 text-xl font-medium text-foreground/90 md:text-2xl">
              I build intelligent applications and immersive digital experiences.
            </p>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Passionate about full-stack development, Python automation, AI-powered applications, and building practical software solutions that solve real-world problems.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#projects" className={btn.primary}>
                  Explore My Work <ArrowRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className={btn.ghost}>Let's Connect</a>
              </Magnetic>
              <a href={RESUME_PATH} download="Devupalli_Anji_Resume.pdf" className="inline-flex items-center gap-2 px-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                <Download className="h-4 w-4" /> Resume
              </a>
            </div>
            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-border bg-secondary/40 px-4 py-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Open to Software Development Opportunities
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="relative h-[380px] sm:h-[480px] lg:h-[600px]"
          aria-hidden
        >
          <ClientOnly fallback={<SceneFallback />}>
            <SceneSlot />
          </ClientOnly>
          <div className="glass pointer-events-none absolute left-2 top-10 rounded-lg px-3 py-2 font-mono text-[11px] text-primary sm:left-6">
            {"</> flask.run()"}
          </div>
          <div className="glass pointer-events-none absolute bottom-16 right-2 rounded-lg px-3 py-2 font-mono text-[11px] text-muted-foreground sm:right-6">
            <span className="text-violet">def</span> build(idea): <span className="text-primary">ship</span>()
          </div>
        </motion.div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex" aria-label="Scroll to About">
        <span className="flex h-9 w-5 justify-center rounded-full border border-border pt-2">
          <span className="animate-scrolldot h-1.5 w-1 rounded-full bg-primary" />
        </span>
        Scroll
      </a>
    </section>
  );
}
