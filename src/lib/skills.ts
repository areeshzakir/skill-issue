import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Skill {
  slug: string;
  name: string;
  title: string;
  category: string;
  creator: string;
  organization: string;
  description: string;
  tags: string[];
  source: "custom" | "plugin" | "built-in";
  content: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  skillCount: number;
}

export interface Creator {
  slug: string;
  name: string;
  organization: string;
  skillCount: number;
  categories: string[];
}

const SKILLS_DIR = path.join(process.cwd(), "skills");

const CATEGORY_META: Record<
  string,
  { name: string; description: string; color: string; icon: string }
> = {
  engineering: {
    name: "Engineering",
    description: "Code generation, debugging, testing, refactoring",
    color: "var(--color-cat-engineering)",
    icon: "🔧",
  },
  design: {
    name: "Design",
    description: "UI/UX, frontend design, animation, accessibility",
    color: "var(--color-cat-design)",
    icon: "🎨",
  },
  devops: {
    name: "DevOps",
    description: "CI/CD, deployment, infrastructure, monitoring",
    color: "var(--color-cat-devops)",
    icon: "⚙️",
  },
  marketing: {
    name: "Marketing",
    description: "Ads, SEO, content, social media",
    color: "var(--color-cat-marketing)",
    icon: "📣",
  },
  productivity: {
    name: "Productivity",
    description: "Workflow automation, project management, planning",
    color: "var(--color-cat-productivity)",
    icon: "⚡",
  },
  research: {
    name: "Research",
    description: "Web research, analysis, documentation",
    color: "var(--color-cat-research)",
    icon: "🔬",
  },
  meta: {
    name: "Meta",
    description: "Skills about skills — creation, evaluation, optimization",
    color: "var(--color-cat-meta)",
    icon: "🧠",
  },
};

export function getAllSkills(): Skill[] {
  const skills: Skill[] = [];

  const categories = fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  for (const cat of categories) {
    const catPath = path.join(SKILLS_DIR, cat.name);
    const skillDirs = fs
      .readdirSync(catPath, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    for (const skillDir of skillDirs) {
      const skillMdPath = path.join(catPath, skillDir.name, "skill.md");
      if (!fs.existsSync(skillMdPath)) continue;

      const raw = fs.readFileSync(skillMdPath, "utf-8");
      const { data, content } = matter(raw);

      skills.push({
        slug: skillDir.name,
        name: data.name || skillDir.name,
        title: data.title || skillDir.name,
        category: cat.name,
        creator: data.creator || "unknown",
        organization: data.organization || "",
        description: data.description || "",
        tags: data.tags || [],
        source: data.source || "custom",
        content,
      });
    }
  }

  return skills;
}

export function getCategories(): Category[] {
  const skills = getAllSkills();

  return Object.entries(CATEGORY_META).map(([slug, meta]) => ({
    slug,
    ...meta,
    skillCount: skills.filter((s) => s.category === slug).length,
  }));
}

export function getCreators(): Creator[] {
  const skills = getAllSkills();
  const creatorMap = new Map<
    string,
    { name: string; organization: string; categories: Set<string>; count: number }
  >();

  for (const skill of skills) {
    const key = skill.creator;
    if (!creatorMap.has(key)) {
      creatorMap.set(key, {
        name: skill.creator,
        organization: skill.organization,
        categories: new Set(),
        count: 0,
      });
    }
    const c = creatorMap.get(key)!;
    c.count++;
    c.categories.add(skill.category);
  }

  return Array.from(creatorMap.entries()).map(([slug, data]) => ({
    slug,
    name: data.name,
    organization: data.organization,
    skillCount: data.count,
    categories: Array.from(data.categories),
  }));
}

export function getSkillBySlug(
  category: string,
  slug: string
): Skill | undefined {
  return getAllSkills().find(
    (s) => s.category === category && s.slug === slug
  );
}

export function getSkillsByCategory(category: string): Skill[] {
  return getAllSkills().filter((s) => s.category === category);
}

export function getSkillsByCreator(creator: string): Skill[] {
  return getAllSkills().filter((s) => s.creator === creator);
}

export { CATEGORY_META };
