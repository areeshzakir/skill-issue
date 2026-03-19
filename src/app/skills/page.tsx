import { Suspense } from "react";
import { getAllSkills, getCategories, getCreators } from "@/lib/skills";
import { SkillsCatalogClient } from "./catalog-client";

export const metadata = {
  title: "All Skills — skill-issue",
  description: "Browse and search all AI agent skills.",
};

export default function SkillsPage() {
  const skills = getAllSkills();
  const categories = getCategories();
  const creators = getCreators();

  return (
    <Suspense>
      <SkillsCatalogClient
        skills={skills}
        categories={categories}
        creators={creators}
      />
    </Suspense>
  );
}
