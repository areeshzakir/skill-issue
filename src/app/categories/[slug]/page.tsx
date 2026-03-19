import { notFound } from "next/navigation";
import { getCategories, getSkillsByCategory, CATEGORY_META } from "@/lib/skills";
import { CategoryViewClient } from "./category-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) return { title: "Category Not Found — skill-issue" };
  return {
    title: `${meta.name} Skills — skill-issue`,
    description: meta.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) notFound();

  const skills = getSkillsByCategory(slug);

  return (
    <CategoryViewClient
      slug={slug}
      name={meta.name}
      description={meta.description}
      icon={meta.icon}
      skills={skills}
    />
  );
}
