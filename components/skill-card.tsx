"use client";

import { motion } from "framer-motion";
import { Skill, CATEGORY_META, PLATFORM_META } from "@/lib/types";
import clsx from "clsx";

export function SkillCard({
  skill,
  featured = false,
  index = 0,
  onClick,
  comparing = false,
  onCompare,
}: {
  skill: Skill;
  featured?: boolean;
  index?: number;
  onClick: () => void;
  comparing?: boolean;
  onCompare?: () => void;
}) {
  const category = CATEGORY_META[skill.category];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={clsx(
        "group relative bg-white cursor-pointer transition-shadow duration-300",
        `accent-line-${skill.category}`,
        "hover:shadow-card-hover shadow-card",
        featured && "md:col-span-2"
      )}
    >
      <div className={clsx("p-5", featured && "md:p-7")}>
        {/* Category badge */}
        <div className="mb-3">
          <span className={`category-badge category-badge-${skill.category}`}>
            {category.label}
          </span>
        </div>

        {/* Title */}
        <h3
          className={clsx(
            "font-display text-ink tracking-tight mb-2",
            featured ? "text-2xl" : "text-lg"
          )}
        >
          {skill.name}
        </h3>

        {/* Description */}
        <p
          className={clsx(
            "text-ink-muted font-body leading-relaxed mb-4",
            featured ? "text-base" : "text-sm line-clamp-3"
          )}
        >
          {featured ? skill.longDescription || skill.description : skill.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skill.tags.slice(0, featured ? 6 : 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-ink-faint bg-parchment-200 px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
          {skill.tags.length > (featured ? 6 : 3) && (
            <span className="text-xs text-ink-faint">
              +{skill.tags.length - (featured ? 6 : 3)}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-parchment-200">
          <div className="flex items-center gap-2">
            <span className="text-xs text-ink-muted">{skill.creator}</span>
            {skill.organization && (
              <>
                <span className="text-parchment-400">·</span>
                <span className="text-xs text-ink-faint">
                  {skill.organization}
                </span>
              </>
            )}
          </div>

          {/* Platform badges */}
          <div className="flex gap-1">
            {skill.platforms.slice(0, 3).map((p) => (
              <span
                key={p}
                className="text-[10px] font-medium text-ink-faint bg-parchment-100 border border-parchment-300 px-1.5 py-0.5"
                title={PLATFORM_META[p].label}
              >
                {PLATFORM_META[p].short}
              </span>
            ))}
            {skill.platforms.length > 3 && (
              <span className="text-[10px] text-ink-faint">
                +{skill.platforms.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Compare toggle */}
      {onCompare && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCompare();
          }}
          className={clsx(
            "absolute top-3 right-3 w-6 h-6 flex items-center justify-center border transition-all",
            comparing
              ? "bg-ink border-ink text-parchment-100"
              : "bg-white border-parchment-300 text-transparent opacity-0 group-hover:opacity-100"
          )}
          aria-label={comparing ? `Remove ${skill.name} from comparison` : `Add ${skill.name} to comparison`}
          title="Compare"
        >
          {comparing ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1.5 5.5L4 8L8.5 2" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 6h8M6 2v8" />
            </svg>
          )}
        </button>
      )}

      {/* Hover indicator */}
      <div className={clsx(
        "absolute inset-0 border transition-colors pointer-events-none",
        comparing ? "border-ink" : "border-transparent group-hover:border-parchment-400"
      )} />
    </motion.article>
  );
}
