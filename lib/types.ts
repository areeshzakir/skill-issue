export type Category =
  | "engineering"
  | "design"
  | "devops"
  | "marketing"
  | "productivity"
  | "research"
  | "meta";

export type Platform =
  | "claude-code"
  | "codex"
  | "gemini-cli"
  | "cursor"
  | "windsurf"
  | "aider"
  | "continue"
  | "opencode";

export interface Skill {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: Category;
  tags: string[];
  creator: string;
  organization?: string;
  platforms: Platform[];
  sourceUrl?: string;
  featured?: boolean;
  createdAt: string;
}

export interface SkillFilters {
  search: string;
  category: Category | "all";
  platform: Platform | "all";
  sort: "name" | "recent" | "category";
}

export const CATEGORY_META: Record<
  Category,
  { label: string; description: string; color: string }
> = {
  engineering: {
    label: "Engineering",
    description: "Code generation, debugging, testing, refactoring",
    color: "category-engineering",
  },
  design: {
    label: "Design",
    description: "UI/UX, frontend design, animation, accessibility",
    color: "category-design",
  },
  devops: {
    label: "DevOps",
    description: "CI/CD, deployment, infrastructure, monitoring",
    color: "category-devops",
  },
  marketing: {
    label: "Marketing",
    description: "Ads, SEO, content, social media",
    color: "category-marketing",
  },
  productivity: {
    label: "Productivity",
    description: "Workflow automation, project management, planning",
    color: "category-productivity",
  },
  research: {
    label: "Research",
    description: "Web research, analysis, documentation",
    color: "category-research",
  },
  meta: {
    label: "Meta",
    description: "Skills about skills — creation, evaluation, optimization",
    color: "category-meta",
  },
};

export function getRelatedSkills(
  skill: Skill,
  allSkills: Skill[],
  limit = 3
): Skill[] {
  return allSkills
    .filter((s) => s.id !== skill.id)
    .map((s) => {
      const tagOverlap = skill.tags.filter((t) => s.tags.includes(t)).length;
      const categoryMatch = s.category === skill.category ? 2 : 0;
      return { skill: s, score: tagOverlap + categoryMatch };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.skill);
}

export const PLATFORM_META: Record<Platform, { label: string; short: string }> =
  {
    "claude-code": { label: "Claude Code", short: "CC" },
    codex: { label: "Codex CLI", short: "CX" },
    "gemini-cli": { label: "Gemini CLI", short: "GC" },
    cursor: { label: "Cursor", short: "CR" },
    windsurf: { label: "Windsurf", short: "WS" },
    aider: { label: "Aider", short: "AD" },
    continue: { label: "Continue", short: "CN" },
    opencode: { label: "OpenCode", short: "OC" },
  };
