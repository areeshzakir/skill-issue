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

interface SkillDetailClientProps {
  skill: Skill;
  related: Skill[];
  categoryName: string;
  categoryColor: string;
}

export function SkillDetailClient({
  skill,
  related,
  categoryName,
}: SkillDetailClientProps) {
  const [copied, setCopied] = useState(false);

  const installCommand = `# Add to your Claude Code skills\ncp -r skills/${skill.category}/${skill.slug} ~/.claude/skills/`;

  function handleCopy() {
    navigator.clipboard.writeText(installCommand.replace("\\n", "\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <motion.nav
            className="flex items-center gap-2 text-sm text-[var(--muted)] mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/skills" className="hover:text-[var(--foreground)] transition-colors">
              Skills
            </Link>
            <span>/</span>
            <Link
              href={`/categories/${skill.category}`}
              className="hover:text-[var(--foreground)] transition-colors"
            >
              {categoryName}
            </Link>
            <span>/</span>
            <span className="text-[var(--foreground)]">{skill.title}</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main content */}
            <motion.article
              className="flex-1 min-w-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display text-4xl md:text-5xl mb-4">
                {skill.title}
              </h1>
              <p className="text-lg text-[var(--muted)] mb-8">
                {skill.description}
              </p>

              {/* Tags */}
              {skill.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-[var(--subtle-bg)] text-[var(--muted)] border border-[var(--border)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Install command */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                    Install
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-xs text-[var(--color-accent)] hover:underline"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 overflow-x-auto">
                  <code className="font-mono text-sm text-[var(--foreground)]">
                    {installCommand}
                  </code>
                </pre>
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none">
                {skill.content.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[var(--text-secondary)] leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              className="lg:w-64 shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="sticky top-24 space-y-6">
                {/* Metadata card */}
                <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                  <h3 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-4">
                    Details
                  </h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-xs text-[var(--muted)]">Category</dt>
                      <dd>
                        <Link
                          href={`/categories/${skill.category}`}
                          className="text-sm hover:underline"
                          style={{ color: CATEGORY_COLORS[skill.category] }}
                        >
                          {categoryName}
                        </Link>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[var(--muted)]">Creator</dt>
                      <dd>
                        <Link
                          href={`/creators/${skill.creator}`}
                          className="text-sm text-[var(--foreground)] hover:underline"
                        >
                          {skill.creator}
                        </Link>
                      </dd>
                    </div>
                    {skill.organization && (
                      <div>
                        <dt className="text-xs text-[var(--muted)]">Organization</dt>
                        <dd className="text-sm">{skill.organization}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-xs text-[var(--muted)]">Source</dt>
                      <dd className="text-sm capitalize">{skill.source}</dd>
                    </div>
                  </dl>
                </div>

                {/* Related skills */}
                {related.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-3">
                      Related in {categoryName}
                    </h3>
                    <div className="space-y-2">
                      {related.map((r) => (
                        <Link
                          key={r.slug}
                          href={`/skills/${r.category}/${r.slug}`}
                          className="block p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--subtle-bg)] transition-colors"
                        >
                          <h4 className="font-mono text-xs font-medium mb-1">
                            {r.title}
                          </h4>
                          <p className="text-xs text-[var(--muted)] line-clamp-1">
                            {r.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.aside>
          </div>
        </div>
      </main>
    </>
  );
}
