"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Skill, CATEGORY_META, PLATFORM_META } from "@/lib/types";

export function ComparePanel({
  skills,
  onClose,
  onRemove,
}: {
  skills: Skill[];
  onClose: () => void;
  onRemove: (id: string) => void;
}) {
  if (skills.length < 2) return null;

  // Collect all unique tags and platforms across compared skills
  const allTags = [...new Set(skills.flatMap((s) => s.tags))];
  const allPlatforms = [...new Set(skills.flatMap((s) => s.platforms))];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-ink/20 z-50"
      />
      <motion.aside
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 bottom-0 top-16 bg-white z-50 shadow-panel overflow-y-auto scrollbar-thin"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-heading-1 text-ink">
                Compare Skills
              </h2>
              <p className="text-sm text-ink-muted mt-1">
                {skills.length} skills selected
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
              aria-label="Close comparison"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 4l10 10M14 4L4 14" />
              </svg>
            </button>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              {/* Skill headers */}
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-ink-faint uppercase tracking-wider pb-4 pr-6 w-36">
                    &nbsp;
                  </th>
                  {skills.map((skill) => (
                    <th key={skill.id} className="text-left pb-4 px-4 min-w-[240px]">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className={`category-badge category-badge-${skill.category} mb-2`}>
                            {CATEGORY_META[skill.category].label}
                          </span>
                          <p className="font-display text-lg text-ink mt-2">{skill.name}</p>
                          <p className="text-xs text-ink-muted mt-0.5">by {skill.creator}</p>
                        </div>
                        <button
                          onClick={() => onRemove(skill.id)}
                          className="text-ink-faint hover:text-ink transition-colors shrink-0 mt-1"
                          aria-label={`Remove ${skill.name}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 3l8 8M11 3L3 11" />
                          </svg>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Description */}
                <tr className="border-t border-parchment-200">
                  <td className="text-xs font-medium text-ink-faint uppercase tracking-wider py-4 pr-6 align-top">
                    Description
                  </td>
                  {skills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4 align-top text-ink-muted leading-relaxed">
                      {skill.description}
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr className="border-t border-parchment-200">
                  <td className="text-xs font-medium text-ink-faint uppercase tracking-wider py-4 pr-6 align-top">
                    Category
                  </td>
                  {skills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4 align-top">
                      <span className={`category-badge category-badge-${skill.category}`}>
                        {CATEGORY_META[skill.category].label}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Platforms */}
                <tr className="border-t border-parchment-200">
                  <td className="text-xs font-medium text-ink-faint uppercase tracking-wider py-4 pr-6 align-top">
                    Platforms
                  </td>
                  {skills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4 align-top">
                      <div className="flex flex-wrap gap-1.5">
                        {allPlatforms.map((p) => {
                          const has = skill.platforms.includes(p);
                          return (
                            <span
                              key={p}
                              className={`text-xs px-2 py-0.5 ${
                                has
                                  ? "bg-parchment-200 text-ink-muted"
                                  : "bg-parchment-100 text-ink-faint/40 line-through"
                              }`}
                            >
                              {PLATFORM_META[p].label}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Tags */}
                <tr className="border-t border-parchment-200">
                  <td className="text-xs font-medium text-ink-faint uppercase tracking-wider py-4 pr-6 align-top">
                    Tags
                  </td>
                  {skills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4 align-top">
                      <div className="flex flex-wrap gap-1.5">
                        {allTags.map((tag) => {
                          const has = skill.tags.includes(tag);
                          return (
                            <span
                              key={tag}
                              className={`text-xs px-2 py-0.5 ${
                                has
                                  ? "bg-parchment-200 text-ink-muted"
                                  : "bg-parchment-100 text-ink-faint/40 line-through"
                              }`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Creator */}
                <tr className="border-t border-parchment-200">
                  <td className="text-xs font-medium text-ink-faint uppercase tracking-wider py-4 pr-6 align-top">
                    Creator
                  </td>
                  {skills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4 align-top text-ink-muted">
                      {skill.creator}
                      {skill.organization && (
                        <span className="text-ink-faint"> ({skill.organization})</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Source */}
                <tr className="border-t border-parchment-200">
                  <td className="text-xs font-medium text-ink-faint uppercase tracking-wider py-4 pr-6 align-top">
                    Source
                  </td>
                  {skills.map((skill) => (
                    <td key={skill.id} className="py-4 px-4 align-top">
                      {skill.sourceUrl ? (
                        <a
                          href={skill.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent-hover transition-colors text-xs"
                        >
                          View Source
                        </a>
                      ) : (
                        <span className="text-ink-faint text-xs">N/A</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
