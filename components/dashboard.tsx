"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills as allSkills } from "@/lib/skills-data";
import { Skill, Category, CATEGORY_META, Platform, PLATFORM_META } from "@/lib/types";
import { Header } from "@/components/header";
import { SkillCard } from "@/components/skill-card";
import { SkillDetailPanel } from "@/components/skill-detail-panel";
import { AddSkillPanel } from "@/components/add-skill-panel";
import { CommandPalette } from "@/components/command-palette";

type SortMode = "name" | "recent" | "category";
type ViewMode = "grid" | "list";

export function Dashboard() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [activePlatform, setActivePlatform] = useState<Platform | "all">("all");
  const [sort, setSort] = useState<SortMode>("recent");
  const [view, setView] = useState<ViewMode>("grid");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [addPanelOpen, setAddPanelOpen] = useState(false);

  const categories = Object.entries(CATEGORY_META) as [Category, typeof CATEGORY_META[Category]][];
  const platforms = Object.entries(PLATFORM_META) as [Platform, typeof PLATFORM_META[Platform]][];

  const filtered = useMemo(() => {
    let result = [...allSkills];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          s.creator.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "all") {
      result = result.filter((s) => s.category === activeCategory);
    }

    if (activePlatform !== "all") {
      result = result.filter((s) => s.platforms.includes(activePlatform));
    }

    switch (sort) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "category":
        result.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return result;
  }, [search, activeCategory, activePlatform, sort]);

  // Sort featured to top, but don't separate them
  const ordered = useMemo(() => {
    const feat = filtered.filter((s) => s.featured);
    const rest = filtered.filter((s) => !s.featured);
    return [...feat, ...rest];
  }, [filtered]);

  const stats = useMemo(() => {
    const uniqueCreators = new Set(allSkills.map((s) => s.creator));
    const uniqueCategories = new Set(allSkills.map((s) => s.category));
    return {
      total: allSkills.length,
      categories: uniqueCategories.size,
      creators: uniqueCreators.size,
    };
  }, []);

  return (
    <div className="min-h-screen bg-parchment-100">
      <Header onAddSkill={() => setAddPanelOpen(true)} />

      <main className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Hero */}
        <section className="pt-16 md:pt-24 pb-12 md:pb-16 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-display text-ink mb-4"
          >
            Every problem is
            <br />a skill issue.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-ink-muted text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
          >
            A curated catalog of skills for AI coding agents. Find the right
            skill — or group of skills — for any task.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="relative max-w-xl">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="8" cy="8" r="6" />
                <path d="M13 13l3 3" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search skills by name, tag, or creator…"
                className="w-full bg-white border border-parchment-300 pl-11 pr-4 py-3.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 3l8 8M11 3L3 11" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        </section>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-6 text-sm text-ink-muted mb-8"
        >
          <span>
            <strong className="text-ink font-medium">{stats.total}</strong> skills
          </span>
          <span>
            <strong className="text-ink font-medium">{stats.categories}</strong>{" "}
            categories
          </span>
          <span>
            <strong className="text-ink font-medium">{stats.creators}</strong>{" "}
            creators
          </span>
        </motion.div>

        {/* Filters Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-parchment-300"
        >
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-ink text-parchment-100"
                  : "bg-parchment-200 text-ink-muted hover:text-ink"
              }`}
            >
              All
            </button>
            {categories.map(([key, meta]) => {
              const count = allSkills.filter((s) => s.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() =>
                    setActiveCategory(activeCategory === key ? "all" : key)
                  }
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeCategory === key
                      ? "bg-ink text-parchment-100"
                      : "bg-parchment-200 text-ink-muted hover:text-ink"
                  }`}
                >
                  {meta.label}
                  <span className="ml-1.5 opacity-50">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Platform filter */}
            <select
              value={activePlatform}
              onChange={(e) =>
                setActivePlatform(e.target.value as Platform | "all")
              }
              className="bg-parchment-200 border-none px-3 py-1.5 text-xs text-ink-muted focus:outline-none cursor-pointer"
            >
              <option value="all">All Platforms</option>
              {platforms.map(([key, meta]) => (
                <option key={key} value={key}>
                  {meta.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="bg-parchment-200 border-none px-3 py-1.5 text-xs text-ink-muted focus:outline-none cursor-pointer"
            >
              <option value="recent">Recent</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
            </select>

            {/* View toggle */}
            <div className="flex border border-parchment-300">
              <button
                onClick={() => setView("grid")}
                className={`p-1.5 ${
                  view === "grid" ? "bg-ink text-parchment-100" : "text-ink-faint hover:text-ink"
                }`}
                aria-label="Grid view"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="1" width="6" height="6" rx="0.5" />
                  <rect x="9" y="1" width="6" height="6" rx="0.5" />
                  <rect x="1" y="9" width="6" height="6" rx="0.5" />
                  <rect x="9" y="9" width="6" height="6" rx="0.5" />
                </svg>
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-1.5 ${
                  view === "list" ? "bg-ink text-parchment-100" : "text-ink-faint hover:text-ink"
                }`}
                aria-label="List view"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="2" width="14" height="2.5" rx="0.5" />
                  <rect x="1" y="6.75" width="14" height="2.5" rx="0.5" />
                  <rect x="1" y="11.5" width="14" height="2.5" rx="0.5" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        {(search || activeCategory !== "all" || activePlatform !== "all") && (
          <p className="text-sm text-ink-faint mb-6">
            {filtered.length} skill{filtered.length !== 1 ? "s" : ""} found
            {search && (
              <>
                {" "}for &ldquo;<span className="text-ink-muted">{search}</span>&rdquo;
              </>
            )}
          </p>
        )}

        {/* Skills Grid */}
        {filtered.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {view === "grid" ? (
              <motion.div
                key="grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20"
              >
                {ordered.map((skill, i) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    featured={i === 0 && !!skill.featured}
                    index={i}
                    onClick={() => setSelectedSkill(skill)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div key="list" className="flex flex-col gap-2 pb-20">
                {ordered.map((skill, i) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    index={i}
                    onClick={() => setSelectedSkill(skill)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="font-display text-2xl text-ink-faint mb-2">
              No skills found
            </p>
            <p className="text-sm text-ink-faint">
              Try adjusting your search or filters.
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-parchment-300 mt-8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="font-display text-sm text-ink">skill-issue</p>
            <p className="text-xs text-ink-faint mt-1">
              &ldquo;Sounds like a skill issue.&rdquo; — Now it literally is.
            </p>
          </div>
          <div className="flex gap-6 text-xs text-ink-faint">
            <a
              href="https://github.com/areeshzakir/skill-issue"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-muted transition-colors"
            >
              GitHub
            </a>
            <span>MIT License</span>
          </div>
        </div>
      </footer>

      {/* Panels */}
      <SkillDetailPanel
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
      <AddSkillPanel
        open={addPanelOpen}
        onClose={() => setAddPanelOpen(false)}
      />
      <CommandPalette onSelectSkill={(skill) => setSelectedSkill(skill)} />
    </div>
  );
}
