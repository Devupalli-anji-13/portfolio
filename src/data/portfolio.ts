export const RESUME_PATH = "/resume.pdf"; // place the PDF at public/resume.pdf

export const contact = {
  email: "devupallianji6@gmail.com",
  phone: "+91 8688457968",
  linkedin: "https://www.linkedin.com/in/devupalli-anji-336436319",
  github: "https://github.com/Devupalli-anji-13",
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export type SkillGroup = { title: string; items: { name: string; note?: string }[] };
export const skills: SkillGroup[] = [
  { title: "Programming", items: [{ name: "Python" }, { name: "JavaScript" }, { name: "TypeScript", note: "Learning" }] },
  { title: "Frontend", items: [{ name: "HTML" }, { name: "CSS" }, { name: "JavaScript" }, { name: "Angular" }] },
  { title: "Backend", items: [{ name: "Python Flask" }, { name: "Spring Boot" }, { name: "REST API Development" }, { name: "OpenAI API Integrations" }] },
  { title: "Database", items: [{ name: "MySQL" }] },
  { title: "Tools", items: [{ name: "Git" }, { name: "GitHub" }] },
  { title: "Additional", items: [{ name: "Full-Stack Web Development" }, { name: "UI/UX Basics" }, { name: "API Integration" }] },
];

export type Project = {
  id: string;
  number: string;
  title: string;
  description: string;
  stack: string[];
  features: string[];
  preview: "exam" | "jarvis" | "college";
  /** Leave empty to hide the button */
  liveUrl?: string;
  sourceUrl?: string;
};

export const projects: Project[] = [
  {
    id: "exam",
    number: "01",
    title: "Examination Management System",
    description: "A web-based examination management system designed to streamline hall-ticket requests and approval workflows.",
    stack: ["Python Flask", "MySQL", "HTML", "CSS", "JavaScript"],
    features: [
      "Secure admin and student dashboards with role-based login",
      "Hall-ticket request management",
      "Fee verification and approval workflow",
      "Request tracking",
      "Automated hall-ticket generation with downloadable output",
    ],
    preview: "exam",
    liveUrl: "",
    sourceUrl: "",
  },
  {
    id: "jarvis",
    number: "02",
    title: "AI Desktop Assistant: Jarvis",
    description: "An intelligent Python desktop assistant designed to simplify everyday computer interactions through natural language and voice commands.",
    stack: ["Python", "Tkinter", "OpenAI APIs"],
    features: [
      "Natural language responses",
      "Voice-command interactions",
      "Application launching and search",
      "Reminders and quick actions",
      "System-control utilities",
      "Modern desktop user interface",
    ],
    preview: "jarvis",
    liveUrl: "",
    sourceUrl: "",
  },
  {
    id: "college",
    number: "03",
    title: "College Management System",
    description: "A database-driven college management application designed to organize student information and attendance.",
    stack: ["Python Flask", "MySQL", "HTML", "CSS", "JavaScript"],
    features: [
      "Student information management",
      "Department management",
      "Attendance management",
      "Responsive administration interface",
      "Backend APIs and database integration",
    ],
    preview: "college",
    liveUrl: "",
    sourceUrl: "",
  },
];

export const process = [
  { n: "01", title: "Discover", text: "Understand the problem, requirements, and intended users." },
  { n: "02", title: "Design", text: "Plan the architecture, user interface, and database structure." },
  { n: "03", title: "Develop", text: "Build the frontend, backend, APIs, and application logic." },
  { n: "04", title: "Improve", text: "Test functionality, fix issues, and refine the user experience." },
];

export const education = [
  { title: "Bachelor of Computer Applications (BCA)", school: "Ideal College of Arts and Sciences", place: "Kakinada, Andhra Pradesh", meta: "Status: Pursuing", score: "83%" },
  { title: "Intermediate", school: "PR Junior College", place: "Kakinada, Andhra Pradesh", meta: "Year: 2022 – 2023", score: "86%" },
];

export const softSkills = ["Communication", "Time Management", "Problem-Solving", "Teamwork", "Attention to Detail", "Adaptability"];
export const languages = [
  { name: "Telugu", level: "Native" },
  { name: "English", level: "Professional Proficiency" },
];
