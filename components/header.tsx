"use client";

import { motion } from "framer-motion";

export function Header({ onAddSkill }: { onAddSkill: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-parchment-100/80 backdrop-blur-md border-b border-parchment-300">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-baseline gap-2">
            <span className="font-display text-xl text-ink tracking-tight">
              skill-issue
            </span>
            <span className="hidden sm:inline text-ink-faint text-sm font-body">
              curated skills catalog
            </span>
          </a>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/areeshzakir/skill-issue"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-ink transition-colors text-sm"
            >
              GitHub
            </a>
            <motion.button
              onClick={onAddSkill}
              className="bg-ink text-parchment-100 px-4 py-2 text-sm font-medium hover:bg-ink-light transition-colors"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Skill
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
