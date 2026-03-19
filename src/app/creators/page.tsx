import { getCreators, CATEGORY_META } from "@/lib/skills";
import { CreatorsIndexClient } from "./creators-index-client";

export const metadata = {
  title: "Creators — skill-issue",
  description: "Browse all skill creators and their contributions.",
};

export default function CreatorsPage() {
  const creators = getCreators();
  return <CreatorsIndexClient creators={creators} categoryMeta={CATEGORY_META} />;
}
