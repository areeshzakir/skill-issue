export interface SkillStack {
  id: string;
  name: string;
  slug: string;
  description: string;
  skillIds: string[];
  icon: string;
}

export const stacks: SkillStack[] = [
  {
    id: "quality-engineering",
    name: "Quality Engineering",
    slug: "quality-engineering",
    description:
      "Ship reliable code with test-driven development, systematic debugging, and thorough code reviews.",
    skillIds: ["tdd-workflow", "systematic-debugging", "code-review", "refactoring"],
    icon: "shield",
  },
  {
    id: "frontend-toolkit",
    name: "Frontend Toolkit",
    slug: "frontend-toolkit",
    description:
      "Build distinctive, polished interfaces with cohesive design, purposeful animation, and responsive adaptation.",
    skillIds: ["frontend-design", "animate", "polish", "adapt"],
    icon: "palette",
  },
  {
    id: "design-review",
    name: "Design Review Pipeline",
    slug: "design-review-pipeline",
    description:
      "Evaluate, refine, and normalize your designs through a structured critique and improvement process.",
    skillIds: ["critique", "normalize", "distill", "audit-accessibility"],
    icon: "eye",
  },
  {
    id: "paid-media-suite",
    name: "Paid Media Suite",
    slug: "paid-media-suite",
    description:
      "Full-stack advertising audit and optimization across Google, Meta, LinkedIn, TikTok, and Microsoft.",
    skillIds: [
      "ads-audit",
      "ads-google",
      "ads-meta",
      "ads-creative",
      "ads-budget",
    ],
    icon: "megaphone",
  },
  {
    id: "project-lifecycle",
    name: "Project Lifecycle",
    slug: "project-lifecycle",
    description:
      "From brainstorming through planning, execution, and review — a complete workflow for shipping features.",
    skillIds: ["brainstorming", "plan-writing", "parallel-agents", "code-review"],
    icon: "rocket",
  },
  {
    id: "design-polish",
    name: "Design Polish",
    slug: "design-polish",
    description:
      "Take designs from good to great with strategic color, bold typography, delightful interactions, and final polish.",
    skillIds: ["colorize", "bolder", "delight", "polish"],
    icon: "sparkle",
  },
];
