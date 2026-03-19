import { notFound } from "next/navigation";
import { getAllSkills, getSkillBySlug, getSkillsByCategory, CATEGORY_META } from "@/lib/skills";
import { SkillDetailClient } from "./detail-client";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const skills = getAllSkills();
  return skills.map((s) => ({
    category: s.category,
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const skill = getSkillBySlug(category, slug);
  if (!skill) return { title: "Skill Not Found — skill-issue" };
  return {
    title: `${skill.title} — skill-issue`,
    description: skill.description,
  };
}

export default async function SkillDetailPage({ params }: Props) {
  const { category, slug } = await params;
  const skill = getSkillBySlug(category, slug);
  if (!skill) notFound();

  const related = getSkillsByCategory(category)
    .filter((s) => s.slug !== slug)
    .slice(0, 4);

  const categoryInfo = CATEGORY_META[category];

  return (
    <SkillDetailClient
      skill={skill}
      related={related}
      categoryName={categoryInfo?.name || category}
      categoryColor={categoryInfo?.color || "#6b7280"}
    />
  );
}
