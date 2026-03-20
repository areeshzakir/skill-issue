"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/skills-data";
import { Skill, CATEGORY_META } from "@/lib/types";

export function CommandPalette({
  onSelectSkill,
}: {
  onSelectSkill: (skill: Skill) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) {
      // Show featured skills when no query
      return skills.filter((s) => s.featured).slice(0, 8);
    }
    const q = query.toLowerCase();
    return skills
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          s.creator.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [query]);

  const handleSelect = useCallback(
    (skill: Skill) => {
      onSelectSkill(skill);
      setOpen(false);
      setQuery("");
      setActiveIndex(0);
    },
    [onSelectSkill]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-cmd-item]");
    items[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-[60]"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[60]"
          >
            <div className="bg-white border border-parchment-300 shadow-xl overflow-hidden">
              {/* Input */}
              <div className="flex items-center border-b border-parchment-200 px-4">
                <svg
                  className="text-ink-faint shrink-0"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="8" cy="8" r="6" />
                  <path d="M13 13l3 3" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search skills…"
                  className="flex-1 px-3 py-4 text-sm text-ink bg-transparent focus:outline-none placeholder:text-ink-faint"
                />
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-ink-faint bg-parchment-200 border border-parchment-300">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-[320px] overflow-y-auto scrollbar-thin"
              >
                {results.length > 0 ? (
                  <div className="py-2">
                    <p className="px-4 py-1.5 text-[10px] font-medium text-ink-faint uppercase tracking-wider">
                      {query ? "Results" : "Featured"}
                    </p>
                    {results.map((skill, i) => (
                      <button
                        key={skill.id}
                        data-cmd-item
                        onClick={() => handleSelect(skill)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                          i === activeIndex
                            ? "bg-parchment-100"
                            : "hover:bg-parchment-50"
                        }`}
                      >
                        <span
                          className={`category-badge category-badge-${skill.category} shrink-0 !py-0 !px-1.5 !text-[10px]`}
                        >
                          {CATEGORY_META[skill.category].label}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-ink font-medium truncate">
                            {skill.name}
                          </p>
                          <p className="text-xs text-ink-faint truncate">
                            {skill.description}
                          </p>
                        </div>
                        {i === activeIndex && (
                          <kbd className="hidden sm:inline-flex shrink-0 items-center px-1.5 py-0.5 text-[10px] font-medium text-ink-faint bg-parchment-200 border border-parchment-300">
                            ENTER
                          </kbd>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-sm text-ink-faint">
                      No skills match &ldquo;{query}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-parchment-200 px-4 py-2 flex items-center justify-between text-[10px] text-ink-faint">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-parchment-200 border border-parchment-300 font-medium">
                      ↑↓
                    </kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-parchment-200 border border-parchment-300 font-medium">
                      ↵
                    </kbd>
                    select
                  </span>
                </div>
                <span>{skills.length} skills</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
