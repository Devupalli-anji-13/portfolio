import { ArrowUp, Github, Linkedin } from "lucide-react";
import { contact, navItems } from "@/data/portfolio";
import { Logo } from "./Nav";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-muted-foreground">Designed with curiosity. Built with code.</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground" aria-label="Footer">
          {navItems.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="hover:text-foreground">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-border p-2.5 hover:border-primary/50 hover:text-primary"><Github className="h-4 w-4" /></a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-border p-2.5 hover:border-primary/50 hover:text-primary"><Linkedin className="h-4 w-4" /></a>
          <a href="#home" aria-label="Back to top" className="rounded-full bg-primary p-2.5 text-primary-foreground hover:shadow-glow"><ArrowUp className="h-4 w-4" /></a>
        </div>
      </div>
      <p className="mt-10 text-center font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} Devupalli Anji</p>
    </footer>
  );
}
