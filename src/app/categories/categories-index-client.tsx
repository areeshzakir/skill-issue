"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { CardSpotlight } from "@/components/card-spotlight";
import type { Category } from "@/lib/skills";

const CATEGORY_COLORS: Record<string, string> = {
  engineering: "#3b82f6",
  design: "#a855f7",
  devops: "#f97316",
  marketing: "#ec4899",
  productivity: "#eab308",
  research: "#06b6d4",
  meta: "#6b7280",
};

interface CategoriesIndexClientProps {
  categories: Category[];
}

export function CategoriesIndexClient({ categories }: CategoriesIndexClientProps) {
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
            <h1 className="font-display text-4xl md:text-5xl mb-3">Categories</h1>
            <p className="text-[var(--muted)] text-lg">
              Explore skills organized by domain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, i) => {
              const color = CATEGORY_COLORS[cat.slug] || "#6b7280";
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.08, 0.5) }}
                >
                  <Link href={`/categories/${cat.slug}`}>
                    <CardSpotlight className="p-6 h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{cat.icon}</span>
                        <h3 className="font-mono text-sm font-medium">{cat.name}</h3>
                      </div>
                      <p className="text-sm text-[var(--muted)] mb-4 line-clamp-2">
                        {cat.description}
                      </p>
                      <span
                        className="text-xs font-mono px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${color}15`,
                          color,
                        }}
                      >
                        {cat.skillCount} skills
                      </span>
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
