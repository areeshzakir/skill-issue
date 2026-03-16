"use client";

import { motion } from "framer-motion";
import { Skill, CATEGORY_META, PLATFORM_META } from "@/lib/types";
import clsx from "clsx";

export function SkillCard({
  skill,
  featured = false,
  index = 0,
  onClick,
}: {
  skill: Skill;
  featured?: boolean;
  index?: number;
  onClick: () => void;
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

      {/* Hover indicator */}
      <div className="absolute inset-0 border border-transparent group-hover:border-parchment-400 transition-colors pointer-events-none" />
    </motion.article>
  );
}
