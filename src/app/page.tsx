import { getAllSkills, getCategories, getCreators, CATEGORY_META } from "@/lib/skills";
import { LandingClient } from "./landing-client";

export default function Home() {
  const skills = getAllSkills();
  const categories = getCategories();
  const creators = getCreators();

  const featured = skills.slice(0, 8);

  return (
    <LandingClient
      skills={skills}
      categories={categories}
      creators={creators}
      featured={featured}
      totalSkills={skills.length}
      categoryMeta={CATEGORY_META}
    />
  );
}
