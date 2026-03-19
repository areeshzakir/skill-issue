"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { CardSpotlight } from "@/components/card-spotlight";
import type { Skill, Creator } from "@/lib/skills";
import { useState } from "react";

const CATEGORY_COLORS: Record<string, string> = {
  engineering: "#3b82f6",
  design: "#a855f7",
  devops: "#f97316",
  marketing: "#ec4899",
  productivity: "#eab308",
  research: "#06b6d4",
  meta: "#6b7280",
};

interface CategoryBreakdown {
  slug: string;
  name: string;
  icon: string;
  count: number;
}

interface CreatorViewClientProps {
  creator: Creator;
  skills: Skill[];
  categoryBreakdown: CategoryBreakdown[];
}

export function CreatorViewClient({
  creator,
  skills,
  categoryBreakdown,
}: CreatorViewClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  const filtered = skills.filter((s) => {
    const matchesCategory = activeCategory ? s.category === activeCategory : true;
    const matchesFilter = filter
      ? s.title.toLowerCase().includes(filter.toLowerCase()) ||
        s.description.toLowerCase().includes(filter.toLowerCase())
      : true;
    return matchesCategory && matchesFilter;
  });

  // Generate initials for avatar
  const initials = creator.name
    .split(/[-_\s]/)
    .map((w) => w[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/skills"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6 inline-block"
            >
              ← Back to all skills
            </Link>

            <div className="flex items-start gap-6 mb-6">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-emerald-700 flex items-center justify-center text-white font-display text-xl shrink-0">
                {initials}
              </div>
              <div>
                <h1 className="font-display text-4xl md:text-5xl mb-1">
                  {creator.name}
                </h1>
                {creator.organization && (
                  <p className="text-[var(--muted)] text-lg">
                    {creator.organization}
                  </p>
                )}
              </div>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-sm font-mono px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                {creator.skillCount} skills
              </span>
              <span className="text-sm font-mono px-3 py-1 rounded-full bg-white/[0.06] text-[var(--muted)]">
                {creator.categories.length} {creator.categories.length === 1 ? "category" : "categories"}
              </span>
            </div>

            {/* Category breakdown chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categoryBreakdown.map((cat) => {
                const isActive = activeCategory === cat.slug;
                const color = CATEGORY_COLORS[cat.slug] || "#6b7280";
                return (
                  <button
                    key={cat.slug}
                    onClick={() =>
                      setActiveCategory(isActive ? null : cat.slug)
                    }
                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-all"
                    style={{
                      backgroundColor: isActive ? `${color}20` : "transparent",
                      borderColor: isActive ? `${color}40` : "rgba(255,255,255,0.08)",
                      color: isActive ? color : "var(--muted)",
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                    <span
                      className="text-xs opacity-60 ml-0.5"
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Filter */}
            <input
              type="text"
              placeholder={`Filter ${creator.name}'s skills...`}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm bg-[var(--card)] border border-white/[0.08] rounded-lg px-3 py-2 outline-none focus:border-[var(--color-accent)]/50 transition-colors w-full max-w-xs"
            />
          </motion.div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((skill, i) => {
              const color = CATEGORY_COLORS[skill.category] || "#6b7280";
              return (
                <motion.div
                  key={skill.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(i * 0.04, 0.4),
                  }}
                >
                  <Link href={`/skills/${skill.category}/${skill.slug}`}>
                    <CardSpotlight className="p-5 h-full">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-mono text-sm font-medium">
                          {skill.title}
                        </h3>
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${color}15`,
                            color,
                          }}
                        >
                          {skill.category}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--muted)] line-clamp-2 mb-3">
                        {skill.description}
                      </p>
                      <div className="flex items-center gap-2">
                        {skill.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-1.5 py-0.5 rounded bg-white/[0.04] text-[var(--muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardSpotlight>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--muted)]">
                No skills match your filter.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
