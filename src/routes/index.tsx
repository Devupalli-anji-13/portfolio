import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Process } from "@/components/portfolio/Process";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Devupalli Anji — Full-Stack Developer (Python)" },
      { name: "description", content: "Portfolio of Devupalli Anji, a full-stack Python developer building intelligent applications, Flask web apps, and AI-powered tools." },
      { property: "og:title", content: "Devupalli Anji — Full-Stack Developer (Python)" },
      { property: "og:description", content: "Intelligent applications, Flask + MySQL systems, and AI desktop automation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Process />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
