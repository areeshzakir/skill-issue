"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills as catalogSkills } from "@/lib/skills-data";

interface ParsedSkill {
  name: string;
  description: string;
  category: string;
  tags: string[];
  creator: string;
  sourceUrl?: string;
}

interface RepoSkill {
  path: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  creator: string;
  organization?: string;
  platforms: string[];
  sourceUrl: string;
}

interface RepoScanResult {
  repo: { owner: string; name: string; branch: string };
  skills: RepoSkill[];
  total: number;
}

type Mode = "single" | "repo";

function isDuplicate(skill: RepoSkill): boolean {
  const slug = skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return catalogSkills.some(
    (s) =>
      s.slug === slug ||
      s.name.toLowerCase() === skill.name.toLowerCase() ||
      (s.sourceUrl && skill.sourceUrl && s.sourceUrl === skill.sourceUrl)
  );
}

export function AddSkillPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<Mode>("single");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsed, setParsed] = useState<ParsedSkill | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Repo import state
  const [repoResult, setRepoResult] = useState<RepoScanResult | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [repoSubmitted, setRepoSubmitted] = useState(false);

  async function handleFetchSingle() {
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

  async function handleScanRepo() {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setRepoResult(null);
    setSelected(new Set());

    try {
      const res = await fetch("/api/repos/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to scan repository");
        return;
      }

      setRepoResult(data);
      // Pre-select all non-duplicate skills
      const initial = new Set<string>();
      for (const skill of data.skills) {
        if (!isDuplicate(skill)) {
          initial.add(skill.path);
        }
      }
      setSelected(initial);
    } catch {
      setError("Network error — could not reach API");
    } finally {
      setLoading(false);
    }
  }

  function toggleSkill(path: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }

  function toggleAll() {
    if (!repoResult) return;
    if (selected.size === repoResult.skills.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(repoResult.skills.map((s) => s.path)));
    }
  }

  function handleSubmitRepo() {
    if (!repoResult || selected.size === 0) return;

    const selectedSkills = repoResult.skills.filter((s) => selected.has(s.path));
    const title = encodeURIComponent(
      `[Repo Import] ${repoResult.repo.owner}/${repoResult.repo.name} (${selectedSkills.length} skills)`
    );
    const skillList = selectedSkills
      .map(
        (s) =>
          `### ${s.name}\n` +
          `- **Category:** ${s.category}\n` +
          `- **Creator:** ${s.creator}\n` +
          `- **Tags:** ${s.tags.join(", ")}\n` +
          `- **Path:** \`${s.path}\`\n` +
          `- **Source:** ${s.sourceUrl}\n` +
          `- **Description:** ${s.description}`
      )
      .join("\n\n");

    const body = encodeURIComponent(
      `## Repo Import Request\n\n` +
        `**Repository:** https://github.com/${repoResult.repo.owner}/${repoResult.repo.name}\n` +
        `**Branch:** ${repoResult.repo.branch}\n` +
        `**Skills found:** ${repoResult.total}\n` +
        `**Skills selected:** ${selectedSkills.length}\n\n` +
        `---\n\n${skillList}\n\n` +
        `---\n*Submitted via skill-issue repo import*`
    );

    window.open(
      `https://github.com/areeshzakir/skill-issue/issues/new?title=${title}&body=${body}&labels=repo-import`,
      "_blank"
    );
    setRepoSubmitted(true);
  }

  function handleClose() {
    setUrl("");
    setParsed(null);
    setError(null);
    setSubmitted(false);
    setRepoResult(null);
    setSelected(new Set());
    setRepoSubmitted(false);
    onClose();
  }

  function switchMode(newMode: Mode) {
    setMode(newMode);
    setUrl("");
    setParsed(null);
    setError(null);
    setSubmitted(false);
    setRepoResult(null);
    setSelected(new Set());
    setRepoSubmitted(false);
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
                Submit Skills
              </h2>
              <p className="text-ink-muted text-sm mb-6 leading-relaxed">
                Add a single skill or import an entire repo.
              </p>

              {/* Mode Tabs */}
              <div className="flex border-b border-parchment-300 mb-8">
                <button
                  onClick={() => switchMode("single")}
                  className={`pb-2.5 px-1 mr-6 text-sm font-medium border-b-2 transition-colors ${
                    mode === "single"
                      ? "border-ink text-ink"
                      : "border-transparent text-ink-faint hover:text-ink-muted"
                  }`}
                >
                  Single Skill
                </button>
                <button
                  onClick={() => switchMode("repo")}
                  className={`pb-2.5 px-1 text-sm font-medium border-b-2 transition-colors ${
                    mode === "repo"
                      ? "border-ink text-ink"
                      : "border-transparent text-ink-faint hover:text-ink-muted"
                  }`}
                >
                  Import Repo
                </button>
              </div>

              {/* SINGLE SKILL MODE */}
              {mode === "single" && (
                <>
                  {!submitted ? (
                    <>
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
                            onKeyDown={(e) => e.key === "Enter" && handleFetchSingle()}
                          />
                          <motion.button
                            onClick={handleFetchSingle}
                            disabled={loading || !url.trim()}
                            className="bg-ink text-parchment-100 px-5 py-2.5 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ink-light transition-colors"
                            whileTap={{ scale: 0.98 }}
                          >
                            {loading ? "Fetching…" : "Fetch"}
                          </motion.button>
                        </div>
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6 p-3 bg-red-50 border border-red-200 text-red-800 text-sm"
                        >
                          {error}
                        </motion.div>
                      )}

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
                              <span className={`category-badge category-badge-${parsed.category}`}>
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
                            onClick={() => {
                              if (!parsed) return;
                              const title = encodeURIComponent(`[Skill Submission] ${parsed.name}`);
                              const body = encodeURIComponent(
                                `## Skill Submission\n\n` +
                                `**Name:** ${parsed.name}\n` +
                                `**Category:** ${parsed.category}\n` +
                                `**Creator:** ${parsed.creator}\n` +
                                `**Tags:** ${parsed.tags.join(", ")}\n` +
                                `**Source URL:** ${parsed.sourceUrl || url}\n\n` +
                                `### Description\n\n${parsed.description}\n\n` +
                                `---\n*Submitted via skill-issue dashboard*`
                              );
                              window.open(
                                `https://github.com/areeshzakir/skill-issue/issues/new?title=${title}&body=${body}&labels=skill-submission`,
                                "_blank"
                              );
                              setSubmitted(true);
                            }}
                            className="w-full bg-accent text-white py-3 text-sm font-medium hover:bg-accent-hover transition-colors"
                            whileTap={{ scale: 0.98 }}
                          >
                            Submit via GitHub
                          </motion.button>
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <SuccessMessage message="A GitHub issue has been opened with your skill details. A maintainer will review and add it to the catalog." />
                  )}
                </>
              )}

              {/* REPO IMPORT MODE */}
              {mode === "repo" && (
                <>
                  {!repoSubmitted ? (
                    <>
                      <div className="mb-6">
                        <label
                          htmlFor="repo-url"
                          className="block text-xs font-medium text-ink-faint uppercase tracking-wider mb-2"
                        >
                          Repository URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            id="repo-url"
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://github.com/user/skill-repo"
                            className="flex-1 bg-parchment-100 border border-parchment-300 px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent transition-colors"
                            onKeyDown={(e) => e.key === "Enter" && handleScanRepo()}
                          />
                          <motion.button
                            onClick={handleScanRepo}
                            disabled={loading || !url.trim()}
                            className="bg-ink text-parchment-100 px-5 py-2.5 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ink-light transition-colors"
                            whileTap={{ scale: 0.98 }}
                          >
                            {loading ? "Scanning…" : "Scan"}
                          </motion.button>
                        </div>
                        <p className="text-xs text-ink-faint mt-2">
                          Scans for skill.md files with valid frontmatter
                        </p>
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6 p-3 bg-red-50 border border-red-200 text-red-800 text-sm"
                        >
                          {error}
                        </motion.div>
                      )}

                      {repoResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Repo header */}
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-medium text-ink-faint uppercase tracking-wider">
                              {repoResult.total} skill{repoResult.total !== 1 && "s"} found
                            </h4>
                            <button
                              onClick={toggleAll}
                              className="text-xs text-accent hover:text-accent-hover transition-colors"
                            >
                              {selected.size === repoResult.skills.length
                                ? "Deselect all"
                                : "Select all"}
                            </button>
                          </div>

                          {/* Skill list */}
                          <div className="space-y-2 mb-6 max-h-[50vh] overflow-y-auto scrollbar-thin">
                            {repoResult.skills.map((skill) => {
                              const dup = isDuplicate(skill);
                              return (
                                <label
                                  key={skill.path}
                                  className={`flex items-start gap-3 p-3 border transition-colors cursor-pointer ${
                                    selected.has(skill.path)
                                      ? "border-accent/30 bg-accent/5"
                                      : "border-parchment-300 bg-white"
                                  } ${dup ? "opacity-60" : ""}`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={selected.has(skill.path)}
                                    onChange={() => toggleSkill(skill.path)}
                                    className="mt-0.5 accent-accent"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-sm font-medium text-ink truncate">
                                        {skill.name}
                                      </span>
                                      <span className={`category-badge category-badge-${skill.category} text-[10px]`}>
                                        {skill.category}
                                      </span>
                                      {dup && (
                                        <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5">
                                          duplicate
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-ink-muted line-clamp-2">
                                      {skill.description}
                                    </p>
                                    <p className="text-[10px] text-ink-faint mt-1 font-mono truncate">
                                      {skill.path}
                                    </p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>

                          {/* Submit button */}
                          <motion.button
                            onClick={handleSubmitRepo}
                            disabled={selected.size === 0}
                            className="w-full bg-accent text-white py-3 text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            whileTap={{ scale: 0.98 }}
                          >
                            Submit {selected.size} skill{selected.size !== 1 && "s"} via GitHub
                          </motion.button>
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <SuccessMessage message="A GitHub issue has been opened with your repo import request. A maintainer will review and add the selected skills to the catalog." />
                  )}
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function SuccessMessage({ message }: { message: string }) {
  return (
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
      <h3 className="font-display text-xl text-ink mb-2">Issue Created</h3>
      <p className="text-sm text-ink-muted">{message}</p>
    </motion.div>
  );
}
