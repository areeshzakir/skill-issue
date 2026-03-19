"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { CardSpotlight } from "@/components/card-spotlight";
import type { Skill } from "@/lib/skills";
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

interface CategoryViewClientProps {
  slug: string;
  name: string;
  description: string;
  icon: string;
  skills: Skill[];
}

export function CategoryViewClient({
  slug,
  name,
  description,
  icon,
  skills,
}: CategoryViewClientProps) {
  const [filter, setFilter] = useState("");
  const color = CATEGORY_COLORS[slug] || "#6b7280";

  const filtered = filter
    ? skills.filter(
        (s) =>
          s.title.toLowerCase().includes(filter.toLowerCase()) ||
          s.description.toLowerCase().includes(filter.toLowerCase())
      )
    : skills;

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
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4 inline-block"
            >
              ← Back to all skills
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{icon}</span>
              <div>
                <h1 className="font-display text-4xl md:text-5xl">{name}</h1>
                <p className="text-[var(--muted)] mt-1">{description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <span
                className="text-sm font-mono px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${color}15`,
                  color,
                }}
              >
                {skills.length} skills
              </span>
              <input
                type="text"
                placeholder={`Filter ${name.toLowerCase()} skills...`}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-sm bg-[var(--card)] border border-white/[0.08] rounded-lg px-3 py-2 outline-none focus:border-[var(--color-accent)]/50 transition-colors flex-1 max-w-xs"
              />
            </div>
          </motion.div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.4) }}
              >
                <Link href={`/skills/${skill.category}/${skill.slug}`}>
                  <CardSpotlight className="p-5 h-full">
                    <h3 className="font-mono text-sm font-medium mb-1.5">
                      {skill.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] line-clamp-2 mb-3">
                      {skill.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[var(--muted)]">
                        by {skill.creator}
                      </span>
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
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--muted)]">No skills match your filter.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
