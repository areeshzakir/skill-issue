"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import { Navbar } from "@/components/navbar";
import { CardSpotlight } from "@/components/card-spotlight";
import type { Skill, Category, Creator } from "@/lib/skills";

const CATEGORY_COLORS: Record<string, string> = {
  engineering: "#3b82f6",
  design: "#a855f7",
  devops: "#f97316",
  marketing: "#ec4899",
  productivity: "#eab308",
  research: "#06b6d4",
  meta: "#6b7280",
};

type ViewMode = "grid" | "list";
type SortBy = "name" | "category" | "creator";

interface SkillsCatalogClientProps {
  skills: Skill[];
  categories: Category[];
  creators: Creator[];
}

export function SkillsCatalogClient({
  skills,
  categories,
  creators,
}: SkillsCatalogClientProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const fuse = useMemo(
    () =>
      new Fuse(skills, {
        keys: ["title", "description", "tags", "category", "creator"],
        threshold: 0.3,
        includeScore: true,
      }),
    [skills]
  );

  const filteredSkills = useMemo(() => {
    let results = query
      ? fuse.search(query).map((r) => r.item)
      : [...skills];

    if (selectedCategory) {
      results = results.filter((s) => s.category === selectedCategory);
    }
    if (selectedCreator) {
      results = results.filter((s) => s.creator === selectedCreator);
    }

    results.sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "category")
        return a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
      if (sortBy === "creator")
        return a.creator.localeCompare(b.creator) || a.title.localeCompare(b.title);
      return 0;
    });

    return results;
  }, [skills, query, selectedCategory, selectedCreator, sortBy, fuse]);

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory(null);
    setSelectedCreator(null);
  };

  const hasFilters = query || selectedCategory || selectedCreator;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl md:text-5xl mb-3">
              All Skills
            </h1>
            <p className="text-[var(--muted)]">
              {filteredSkills.length} of {skills.length} skills
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-2 text-[var(--color-accent)] hover:underline text-sm"
                >
                  Clear filters
                </button>
              )}
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filters */}
            <motion.aside
              className="lg:w-64 shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Search */}
              <div className="mb-6">
                <label className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2 block">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Filter skills..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[var(--card)] border border-white/[0.08] rounded-lg outline-none focus:border-[var(--color-accent)]/50 transition-colors"
                />
              </div>

              {/* Category filter */}
              <div className="mb-6">
                <label className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2 block">
                  Category
                </label>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === cat.slug ? null : cat.slug
                        )
                      }
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                        selectedCategory === cat.slug
                          ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                          : "hover:bg-white/[0.04] text-[var(--muted)]"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs">{cat.skillCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Creator filter */}
              <div className="mb-6">
                <label className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2 block">
                  Creator
                </label>
                <div className="space-y-1">
                  {creators.map((creator) => (
                    <button
                      key={creator.slug}
                      onClick={() =>
                        setSelectedCreator(
                          selectedCreator === creator.slug ? null : creator.slug
                        )
                      }
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                        selectedCreator === creator.slug
                          ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                          : "hover:bg-white/[0.04] text-[var(--muted)]"
                      }`}
                    >
                      <span>{creator.name}</span>
                      <span className="text-xs">{creator.skillCount}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Controls bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className="text-sm bg-[var(--card)] border border-white/[0.08] rounded-lg px-3 py-2 outline-none"
                  >
                    <option value="name">Sort by name</option>
                    <option value="category">Sort by category</option>
                    <option value="creator">Sort by creator</option>
                  </select>
                </div>

                <div className="flex items-center gap-1 bg-[var(--card)] border border-white/[0.08] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded ${
                      viewMode === "grid"
                        ? "bg-white/[0.08]"
                        : "hover:bg-white/[0.04]"
                    }`}
                    aria-label="Grid view"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded ${
                      viewMode === "list"
                        ? "bg-white/[0.08]"
                        : "hover:bg-white/[0.04]"
                    }`}
                    aria-label="List view"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Skills grid/list */}
              <AnimatePresence mode="wait">
                {filteredSkills.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-20"
                  >
                    <p className="text-[var(--muted)] text-lg">
                      No skills match your filters.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 text-sm text-[var(--color-accent)] hover:underline"
                    >
                      Clear all filters
                    </button>
                  </motion.div>
                ) : viewMode === "grid" ? (
                  <motion.div
                    key="grid"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {filteredSkills.map((skill, i) => (
                      <motion.div
                        key={skill.slug + skill.category}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                      >
                        <Link href={`/skills/${skill.category}/${skill.slug}`}>
                          <CardSpotlight className="p-5 h-full">
                            <h3 className="font-mono text-sm font-medium mb-1.5">
                              {skill.title}
                            </h3>
                            <p className="text-sm text-[var(--muted)] line-clamp-2 mb-3">
                              {skill.description}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className="inline-flex text-xs px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: `${CATEGORY_COLORS[skill.category]}15`,
                                  color: CATEGORY_COLORS[skill.category],
                                }}
                              >
                                {skill.category}
                              </span>
                              <span className="text-xs text-[var(--muted)]">
                                {skill.creator}
                              </span>
                            </div>
                          </CardSpotlight>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {filteredSkills.map((skill, i) => (
                      <motion.div
                        key={skill.slug + skill.category}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.3) }}
                      >
                        <Link
                          href={`/skills/${skill.category}/${skill.slug}`}
                          className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                              <h3 className="font-mono text-sm font-medium truncate">
                                {skill.title}
                              </h3>
                              <span
                                className="inline-flex text-xs px-2 py-0.5 rounded-full shrink-0"
                                style={{
                                  backgroundColor: `${CATEGORY_COLORS[skill.category]}15`,
                                  color: CATEGORY_COLORS[skill.category],
                                }}
                              >
                                {skill.category}
                              </span>
                            </div>
                            <p className="text-sm text-[var(--muted)] truncate mt-1">
                              {skill.description}
                            </p>
                          </div>
                          <span className="text-xs text-[var(--muted)] shrink-0">
                            {skill.creator}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
