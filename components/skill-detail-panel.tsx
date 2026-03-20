"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Skill, CATEGORY_META, PLATFORM_META } from "@/lib/types";

export function SkillDetailPanel({
  skill,
  onClose,
  onTagClick,
}: {
  skill: Skill | null;
  onClose: () => void;
  onTagClick?: (tag: string) => void;
}) {
  useEffect(() => {
    if (!skill) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [skill, onClose]);

  return (
    <AnimatePresence>
      {skill && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/20 z-50"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white z-50 shadow-panel overflow-y-auto scrollbar-thin"
          >
            {/* Category color strip */}
            <div
              className={`h-1.5 bg-${CATEGORY_META[skill.category].color}`}
              style={{
                backgroundColor:
                  skill.category === "engineering"
                    ? "#1E40AF"
                    : skill.category === "design"
                    ? "#9D174D"
                    : skill.category === "devops"
                    ? "#065F46"
                    : skill.category === "marketing"
                    ? "#B45309"
                    : skill.category === "productivity"
                    ? "#5B21B6"
                    : skill.category === "research"
                    ? "#0E7490"
                    : "#57534E",
              }}
            />

            <div className="p-8 md:p-10">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
                aria-label="Close"
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

              {/* Category */}
              <span
                className={`category-badge category-badge-${skill.category} mb-6`}
              >
                {CATEGORY_META[skill.category].label}
              </span>

              {/* Title */}
              <h2 className="font-display text-heading-1 text-ink mt-4 mb-3">
                {skill.name}
              </h2>

              {/* Creator info */}
              <div className="flex items-center gap-2 mb-6 text-sm text-ink-muted">
                <span>by {skill.creator}</span>
                {skill.organization && (
                  <>
                    <span className="text-parchment-400">·</span>
                    <span className="text-ink-faint">{skill.organization}</span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="mb-8 prose-skill">
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {skill.longDescription || skill.description}
                </Markdown>
              </div>

              {/* Platforms */}
              <div className="mb-8">
                <h4 className="text-xs font-medium text-ink-faint uppercase tracking-wider mb-3">
                  Platforms
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skill.platforms.map((p) => (
                    <span
                      key={p}
                      className="text-sm text-ink-muted bg-parchment-100 border border-parchment-300 px-3 py-1.5"
                    >
                      {PLATFORM_META[p].label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h4 className="text-xs font-medium text-ink-faint uppercase tracking-wider mb-3">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => onTagClick?.(tag)}
                      className="text-sm text-ink-muted bg-parchment-200 px-3 py-1 hover:bg-parchment-300 hover:text-ink transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="border-t border-parchment-200 pt-6 mb-8">
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-ink-faint text-xs uppercase tracking-wider mb-1">
                      Added
                    </dt>
                    <dd className="text-ink-muted">
                      {new Date(skill.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-faint text-xs uppercase tracking-wider mb-1">
                      Category
                    </dt>
                    <dd className="text-ink-muted">
                      {CATEGORY_META[skill.category].label}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Source link */}
              {skill.sourceUrl && (
                <a
                  href={skill.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors group"
                >
                  View Source
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M5 2h7v7M12 2L2 12" />
                  </svg>
                </a>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
