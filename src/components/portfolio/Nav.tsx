import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navItems, RESUME_PATH } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <a href="#home" className="font-display text-xl font-bold tracking-tight">
      ANJI<span className="text-primary">.</span>
    </a>
  );
}

export function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
          scrolled ? "glass shadow-card" : "border border-transparent",
        )}
        aria-label="Main"
      >
        <Logo />
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={cn(
                  "relative px-3 py-2 text-sm transition-colors",
                  active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {n.label}
                {active === n.id && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-px bg-primary" />
                )}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={RESUME_PATH}
          download="Devupalli_Anji_Resume.pdf"
          className="hidden items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:inline-flex"
        >
          <Download className="h-3.5 w-3.5" /> Resume
        </a>
        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 md:hidden"
          >
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className={cn("block rounded-lg px-3 py-3", active === n.id ? "text-primary" : "text-foreground")}>
                {n.label}
              </a>
            ))}
            <a href={RESUME_PATH} download="Devupalli_Anji_Resume.pdf" className="mt-2 flex items-center gap-2 rounded-lg bg-primary px-3 py-3 font-semibold text-primary-foreground">
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
