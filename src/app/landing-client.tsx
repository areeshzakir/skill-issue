"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { FlipWords } from "@/components/flip-words";
import { GlowingBorder } from "@/components/glowing-border";
import { CardSpotlight } from "@/components/card-spotlight";
import type { Skill, Category, Creator } from "@/lib/skills";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORY_COLORS: Record<string, string> = {
  engineering: "#3b82f6",
  design: "#a855f7",
  devops: "#f97316",
  marketing: "#ec4899",
  productivity: "#eab308",
  research: "#06b6d4",
  meta: "#6b7280",
};

const CATEGORY_ICONS: Record<string, string> = {
  engineering: "🔧",
  design: "🎨",
  devops: "⚙️",
  marketing: "📣",
  productivity: "⚡",
  research: "🔬",
  meta: "🧠",
};

interface LandingClientProps {
  skills: Skill[];
  categories: Category[];
  creators: Creator[];
  featured: Skill[];
  totalSkills: number;
  categoryMeta: Record<string, { name: string; description: string; color: string; icon: string }>;
}

export function LandingClient({
  skills,
  categories,
  creators,
  featured,
  totalSkills,
  categoryMeta,
}: LandingClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/skills?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Hero */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/[0.03] via-transparent to-transparent" />

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              className="font-display text-5xl md:text-7xl tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Find the right skill
              <br />
              <span className="text-[var(--muted)]">
                for{" "}
                <FlipWords
                  words={["developers", "teams", "agents", "any task"]}
                  className="text-[var(--color-accent)]"
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-[var(--muted)] mb-10 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              A curated collection of AI agent skills. One dashboard to discover
              the right skill for any task or goal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <form onSubmit={handleSearch}>
                <GlowingBorder className="max-w-lg mx-auto">
                  <div className="flex items-center gap-3 bg-[var(--card)] rounded-xl px-5 py-4">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-[var(--muted)] shrink-0"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--muted)]"
                    />
                    <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-[var(--muted)] bg-[var(--subtle-bg)] rounded border border-[var(--border)]">
                      ⌘K
                    </kbd>
                  </div>
                </GlowingBorder>
              </form>
            </motion.div>

            <motion.p
              className="text-sm text-[var(--muted)] mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {categories.length} categories · {totalSkills} skills
            </motion.p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="font-display text-3xl md:text-4xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Browse by Category
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/categories/${cat.slug}`}>
                    <CardSpotlight className="p-6 h-full">
                      <div
                        className="text-3xl mb-3"
                        role="img"
                        aria-label={cat.name}
                      >
                        {CATEGORY_ICONS[cat.slug] || "📦"}
                      </div>
                      <h3 className="font-semibold mb-1">{cat.name}</h3>
                      <p className="text-sm text-[var(--muted)] mb-3 line-clamp-2">
                        {cat.description}
                      </p>
                      <span
                        className="inline-flex items-center text-xs font-mono px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${CATEGORY_COLORS[cat.slug]}15`,
                          color: CATEGORY_COLORS[cat.slug],
                        }}
                      >
                        {cat.skillCount} skills
                      </span>
                    </CardSpotlight>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Skills */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-[var(--color-accent)]/[0.02] to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="font-display text-3xl md:text-4xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Featured Skills
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map((skill, i) => (
                <motion.div
                  key={skill.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/skills/${skill.category}/${skill.slug}`}>
                    <CardSpotlight className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-mono text-sm font-medium mb-2">
                            {skill.title}
                          </h3>
                          <p className="text-sm text-[var(--muted)] line-clamp-2 mb-3">
                            {skill.description}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className="inline-flex items-center text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${CATEGORY_COLORS[skill.category]}15`,
                                color: CATEGORY_COLORS[skill.category],
                              }}
                            >
                              {skill.category}
                            </span>
                            <span className="text-xs text-[var(--muted)]">
                              by {skill.creator}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardSpotlight>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/skills"
                className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:underline"
              >
                View all {totalSkills} skills
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* By Creator */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="font-display text-3xl md:text-4xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              By Creator
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {creators.map((creator, i) => (
                <motion.div
                  key={creator.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/creators/${creator.slug}`}>
                    <CardSpotlight className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-semibold text-[var(--color-accent)]">
                          {creator.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-medium text-sm mb-1">
                        {creator.name}
                      </h3>
                      {creator.organization && (
                        <p className="text-xs text-[var(--muted)] mb-2">
                          {creator.organization}
                        </p>
                      )}
                      <span className="text-xs text-[var(--muted)]">
                        {creator.skillCount} skills
                      </span>
                    </CardSpotlight>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-[var(--border)]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-[var(--muted)]">
                skill-issue
              </span>
              <span className="text-xs text-[var(--muted)]">
                · Because every problem is a skill issue
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/areeshzakir/skill-issue"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                GitHub
              </a>
              <span className="text-xs text-[var(--muted)]">MIT License</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
