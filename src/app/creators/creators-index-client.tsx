"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { CardSpotlight } from "@/components/card-spotlight";
import type { Creator } from "@/lib/skills";

const CATEGORY_COLORS: Record<string, string> = {
  engineering: "#3b82f6",
  design: "#a855f7",
  devops: "#f97316",
  marketing: "#ec4899",
  productivity: "#eab308",
  research: "#06b6d4",
  meta: "#6b7280",
};

interface CreatorsIndexClientProps {
  creators: Creator[];
  categoryMeta: Record<string, { name: string; icon: string; description: string; color: string }>;
}

export function CreatorsIndexClient({ creators, categoryMeta }: CreatorsIndexClientProps) {
  const sorted = [...creators].sort((a, b) => b.skillCount - a.skillCount);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl md:text-5xl mb-3">Creators</h1>
            <p className="text-[var(--muted)] text-lg">
              The people and teams behind every skill.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sorted.map((creator, i) => {
              const initials = creator.name
                .split(/[-_\s]/)
                .map((w) => w[0]?.toUpperCase())
                .join("")
                .slice(0, 2);

              return (
                <motion.div
                  key={creator.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.08, 0.4) }}
                >
                  <Link href={`/creators/${creator.slug}`}>
                    <CardSpotlight className="p-6 h-full">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-emerald-700 flex items-center justify-center text-white font-display text-sm shrink-0">
                          {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-mono text-sm font-medium mb-1">
                            {creator.name}
                          </h3>
                          {creator.organization && (
                            <p className="text-xs text-[var(--muted)] mb-2">
                              {creator.organization}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs text-[var(--muted)]">
                              {creator.skillCount} skills
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {creator.categories.map((cat) => {
                              const color = CATEGORY_COLORS[cat] || "#6b7280";
                              return (
                                <span
                                  key={cat}
                                  className="text-[10px] px-1.5 py-0.5 rounded-full"
                                  style={{
                                    backgroundColor: `${color}15`,
                                    color,
                                  }}
                                >
                                  {categoryMeta[cat]?.icon} {categoryMeta[cat]?.name || cat}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </CardSpotlight>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
