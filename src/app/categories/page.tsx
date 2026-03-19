import { getCategories, CATEGORY_META } from "@/lib/skills";
import { CategoriesIndexClient } from "./categories-index-client";

export const metadata = {
  title: "Categories — skill-issue",
  description: "Browse skills by category.",
};

export default function CategoriesPage() {
  const categories = getCategories();
  return <CategoriesIndexClient categories={categories} />;
}
