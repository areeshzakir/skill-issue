import { Metadata } from "next";
import { stacks } from "@/lib/stacks-data";
import { skills } from "@/lib/skills-data";
import { CATEGORY_META, PLATFORM_META } from "@/lib/types";
import { getInstallCommands } from "@/lib/install-commands";
import { StacksClient } from "./client";

export const metadata: Metadata = {
  title: "Skill Stacks — skill-issue",
  description:
    "Curated combinations of AI agent skills that work well together for specific workflows.",
  openGraph: {
    title: "Skill Stacks — Curated AI Skill Combinations",
    description:
      "Pre-built skill combinations for quality engineering, frontend development, design review, and more.",
    type: "website",
  },
};

const STACK_ICONS: Record<string, React.ReactNode> = {
  shield: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 2L3 5v5c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V5L10 2z" />
      <path d="M7 10l2 2 4-4" />
    </svg>
  ),
  palette: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="10" r="8" />
      <circle cx="8" cy="7" r="1.5" fill="currentColor" />
      <circle cx="13" cy="8" r="1.5" fill="currentColor" />
      <circle cx="7" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  eye: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
      <circle cx="10" cy="10" r="3" />
    </svg>
  ),
  megaphone: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 4L6 8H3v4h3l10 4V4z" />
      <path d="M16 8c1 .5 2 1.5 2 2s-1 1.5-2 2" />
    </svg>
  ),
  rocket: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 18V9m0 0c0-3.5 2-6 5-8-2 3-5 5-5 8zm0 0c0-3.5-2-6-5-8 2 3 5 5 5 8z" />
      <path d="M6 14l-2 4 4-2m4 2l4-2-2-4" />
    </svg>
  ),
  sparkle: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 2v4m0 8v4M2 10h4m8 0h4M4.5 4.5l2.8 2.8m5.4 5.4l2.8 2.8M15.5 4.5l-2.8 2.8m-5.4 5.4L4.5 15.5" />
    </svg>
  ),
};

export default function StacksPage() {
  const stacksWithSkills = stacks.map((stack) => {
    const stackSkills = stack.skillIds
      .map((id) => skills.find((s) => s.id === id))
      .filter(Boolean);

    // Collect unique install commands for all skills in stack
    const allCommands = new Map<string, string>();
    for (const skill of stackSkills) {
      if (!skill) continue;
      const cmds = getInstallCommands(skill);
      for (const cmd of cmds) {
        if (!allCommands.has(cmd.command)) {
          allCommands.set(cmd.command, cmd.platform);
        }
      }
    }

    return {
      ...stack,
      skills: stackSkills,
      installCommands: [...allCommands.entries()].map(([command, platform]) => ({
        platform,
        command,
      })),
    };
  });

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* Header */}
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
            <a
              href="/"
              className="text-sm text-ink-muted hover:text-ink transition-colors"
            >
              Back to catalog
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Hero */}
        <section className="pt-12 md:pt-20 pb-10 md:pb-14 max-w-3xl">
          <h1 className="font-display text-heading-1 text-ink mb-4">
            Skill Stacks
          </h1>
          <p className="text-ink-muted text-lg leading-relaxed max-w-xl">
            Curated combinations of skills that work well together. Each stack
            is designed for a specific workflow — install one command, get a
            complete toolkit.
          </p>
        </section>

        {/* Stacks grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
          {stacksWithSkills.map((stack) => (
            <div
              key={stack.id}
              className="bg-white border border-parchment-300 shadow-card"
            >
              <div className="p-6 md:p-8">
                {/* Stack header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 bg-parchment-100 border border-parchment-300 flex items-center justify-center text-ink-muted shrink-0">
                    {STACK_ICONS[stack.icon]}
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-ink tracking-tight">
                      {stack.name}
                    </h2>
                    <p className="text-sm text-ink-muted mt-1 leading-relaxed">
                      {stack.description}
                    </p>
                  </div>
                </div>

                {/* Skills in stack */}
                <div className="border-t border-parchment-200 pt-4 mb-5">
                  <p className="text-xs font-medium text-ink-faint uppercase tracking-wider mb-3">
                    {stack.skills.length} Skills
                  </p>
                  <div className="flex flex-col gap-2">
                    {stack.skills.map(
                      (skill) =>
                        skill && (
                          <a
                            key={skill.id}
                            href={`/skills/${skill.slug}`}
                            className="flex items-center gap-3 p-2.5 bg-parchment-100 hover:bg-parchment-200 transition-colors group"
                          >
                            <div
                              className="w-1 h-8 shrink-0"
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
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
                                {skill.name}
                              </p>
                              <p className="text-xs text-ink-faint line-clamp-1">
                                {skill.description}
                              </p>
                            </div>
                            <div className="flex gap-1 shrink-0">
                              {skill.platforms.slice(0, 2).map((p) => (
                                <span
                                  key={p}
                                  className="text-[10px] font-medium text-ink-faint bg-white border border-parchment-300 px-1.5 py-0.5"
                                  title={PLATFORM_META[p].label}
                                >
                                  {PLATFORM_META[p].short}
                                </span>
                              ))}
                            </div>
                          </a>
                        )
                    )}
                  </div>
                </div>

                {/* Install commands */}
                {stack.installCommands.length > 0 && (
                  <StacksClient commands={stack.installCommands} />
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-parchment-300">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="font-display text-sm text-ink">skill-issue</p>
            <p className="text-xs text-ink-faint mt-1">
              &ldquo;Sounds like a skill issue.&rdquo; &mdash; Now it literally
              is.
            </p>
          </div>
          <div className="flex gap-6 text-xs text-ink-faint">
            <a
              href="https://github.com/areeshzakir/skill-issue"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-muted transition-colors"
            >
              GitHub
            </a>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
