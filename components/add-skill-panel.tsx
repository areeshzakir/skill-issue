"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ParsedSkill {
  name: string;
  description: string;
  category: string;
  tags: string[];
  creator: string;
}

export function AddSkillPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsed, setParsed] = useState<ParsedSkill | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleFetch() {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setParsed(null);

    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch skill");
        return;
      }

      setParsed(data.skill);
    } catch {
      setError("Network error — could not reach API");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setUrl("");
    setParsed(null);
    setError(null);
    setSubmitted(false);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-ink/20 z-50"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white z-50 shadow-panel overflow-y-auto scrollbar-thin"
          >
            <div className="p-8 md:p-10">
              <button
                onClick={handleClose}
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

              <h2 className="font-display text-heading-1 text-ink mb-2">
                Submit a Skill
              </h2>
              <p className="text-ink-muted text-sm mb-8 leading-relaxed">
                Paste a link to a skill definition file (skill.md) on GitHub. We&apos;ll
                parse the frontmatter and add it to the catalog.
              </p>

              {!submitted ? (
                <>
                  {/* URL Input */}
                  <div className="mb-6">
                    <label
                      htmlFor="skill-url"
                      className="block text-xs font-medium text-ink-faint uppercase tracking-wider mb-2"
                    >
                      Skill URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="skill-url"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://github.com/user/repo/blob/main/skill.md"
                        className="flex-1 bg-parchment-100 border border-parchment-300 px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent transition-colors"
                        onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                      />
                      <motion.button
                        onClick={handleFetch}
                        disabled={loading || !url.trim()}
                        className="bg-ink text-parchment-100 px-5 py-2.5 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ink-light transition-colors"
                        whileTap={{ scale: 0.98 }}
                      >
                        {loading ? "Fetching…" : "Fetch"}
                      </motion.button>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-3 bg-red-50 border border-red-200 text-red-800 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Preview */}
                  {parsed && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-xs font-medium text-ink-faint uppercase tracking-wider mb-4">
                        Preview
                      </h4>

                      <div className="border border-parchment-300 p-5 mb-6">
                        <div className="mb-2">
                          <span className="category-badge category-badge-engineering">
                            {parsed.category}
                          </span>
                        </div>
                        <h3 className="font-display text-xl text-ink mb-2">
                          {parsed.name}
                        </h3>
                        <p className="text-sm text-ink-muted leading-relaxed mb-3">
                          {parsed.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {parsed.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-ink-faint bg-parchment-200 px-2 py-0.5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-ink-faint">
                          by {parsed.creator}
                        </p>
                      </div>

                      <motion.button
                        onClick={() => setSubmitted(true)}
                        className="w-full bg-accent text-white py-3 text-sm font-medium hover:bg-accent-hover transition-colors"
                        whileTap={{ scale: 0.98 }}
                      >
                        Add to Catalog
                      </motion.button>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="#065F46"
                      strokeWidth="2"
                    >
                      <path d="M4 10l4 4 8-8" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl text-ink mb-2">
                    Skill Submitted
                  </h3>
                  <p className="text-sm text-ink-muted">
                    Thanks for contributing! The skill will appear in the catalog
                    shortly.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
