import { notFound } from "next/navigation";
import { getCreators, getSkillsByCreator, CATEGORY_META } from "@/lib/skills";
import { CreatorViewClient } from "./creator-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const creators = getCreators();
  return creators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const creators = getCreators();
  const creator = creators.find((c) => c.slug === slug);
  if (!creator) return { title: "Creator Not Found — skill-issue" };
  return {
    title: `${creator.name} — skill-issue`,
    description: `Skills by ${creator.name}${creator.organization ? ` (${creator.organization})` : ""}`,
  };
}

export default async function CreatorPage({ params }: Props) {
  const { slug } = await params;
  const creators = getCreators();
  const creator = creators.find((c) => c.slug === slug);
  if (!creator) notFound();

  const skills = getSkillsByCreator(slug);

  const categoryBreakdown = creator.categories.map((cat) => ({
    slug: cat,
    name: CATEGORY_META[cat]?.name || cat,
    icon: CATEGORY_META[cat]?.icon || "📁",
    count: skills.filter((s) => s.category === cat).length,
  }));

  return (
    <CreatorViewClient
      creator={creator}
      skills={skills}
      categoryBreakdown={categoryBreakdown}
    />
  );
}
