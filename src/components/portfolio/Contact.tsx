import { useState, type FormEvent } from "react";
import { Check, Copy, Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { z } from "zod";
import { contact } from "@/data/portfolio";
import { Reveal, SectionHeading, btn } from "./primitives";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  subject: z.string().trim().min(2, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000),
});
type Fields = z.infer<typeof schema>;
const empty: Fields = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [copied, setCopied] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(values);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Fields] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const body = `${r.data.message}\n\n— ${r.data.name} (${r.data.email})`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(r.data.subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
    setValues(empty);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  };

  const field = (k: keyof Fields, label: string, type = "text") => (
    <div>
      <label htmlFor={k} className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
      {k === "message" ? (
        <textarea id={k} rows={5} value={values[k]} onChange={(e) => setValues({ ...values, [k]: e.target.value })} aria-invalid={!!errors[k]} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
      ) : (
        <input id={k} type={type} value={values[k]} onChange={(e) => setValues({ ...values, [k]: e.target.value })} aria-invalid={!!errors[k]} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
      )}
      {errors[k] && <p className="mt-1 text-xs text-destructive" role="alert">{errors[k]}</p>}
    </div>
  );

  const links = [
    { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { icon: Linkedin, label: "LinkedIn", href: contact.linkedin },
    { icon: Github, label: "GitHub", href: contact.github },
  ];

  return (
    <section id="contact" className="relative py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Contact" title="Let's Build Something Great." />
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="max-w-md text-lg text-muted-foreground">
              Have an opportunity, a project idea, or a software challenge? I'd love to connect.
            </p>
            <ul className="mt-10 space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-primary/50">
                    <l.icon className="h-5 w-5 text-primary" />
                    <span className="flex-1 text-sm">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <button onClick={copy} className={`${btn.small} mt-4`}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied!" : "Copy email"}
            </button>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={submit} noValidate className="glass glow-border space-y-4 rounded-3xl p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {field("name", "Full name")}
                {field("email", "Email address", "email")}
              </div>
              {field("subject", "Subject")}
              {field("message", "Message")}
              <button type="submit" className={`${btn.primary} w-full`}>
                Send message <Send className="h-4 w-4" />
              </button>
              {status === "sent" && (
                <p className="rounded-lg border border-success/40 bg-success/10 px-4 py-3 text-sm text-success" role="status">
                  Your email app should open with the message ready to send. If it didn't, write to {contact.email}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
