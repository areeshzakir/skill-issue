import { Metadata } from "next";
import { notFound } from "next/navigation";
import { skills } from "@/lib/skills-data";
import { CATEGORY_META, PLATFORM_META, getRelatedSkills } from "@/lib/types";
import { getInstallCommands } from "@/lib/install-commands";
import { SkillPageClient } from "./client";

interface Props {
  params: Promise<{ slug: string }>;
}

function findSkill(slug: string) {
  return skills.find((s) => s.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const skill = findSkill(slug);
  if (!skill) return {};

  return {
    title: `${skill.name} — skill-issue`,
    description: skill.description,
    openGraph: {
      title: `${skill.name} — AI Agent Skill`,
      description: skill.description,
      type: "article",
      tags: skill.tags,
    },
    twitter: {
      card: "summary",
      title: `${skill.name} — AI Agent Skill`,
      description: skill.description,
    },
  };
}

export function generateStaticParams() {
  return skills.map((s) => ({ slug: s.slug }));
}

export default async function SkillPage({ params }: Props) {
  const { slug } = await params;
  const skill = findSkill(slug);
  if (!skill) notFound();

  const related = getRelatedSkills(skill, skills, 4);
  const installCommands = getInstallCommands(skill);
  const categoryMeta = CATEGORY_META[skill.category];

  const categoryColor =
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
      : "#57534E";

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

      {/* Category color strip */}
      <div className="h-1.5" style={{ backgroundColor: categoryColor }} />

      <main className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 pt-10 md:pt-16 pb-20">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-ink-faint mb-8">
              <a href="/" className="hover:text-ink-muted transition-colors">
                Catalog
              </a>
              <span>/</span>
              <a
                href={`/?category=${skill.category}`}
                className="hover:text-ink-muted transition-colors"
              >
                {categoryMeta.label}
              </a>
              <span>/</span>
              <span className="text-ink-muted">{skill.name}</span>
            </nav>

            {/* Category badge */}
            <span
              className={`category-badge category-badge-${skill.category} mb-6`}
            >
              {categoryMeta.label}
            </span>

            {/* Title */}
            <h1 className="font-display text-heading-1 text-ink mt-4 mb-3">
              {skill.name}
            </h1>

            {/* Creator info */}
            <div className="flex items-center gap-2 mb-8 text-sm text-ink-muted">
              <span>
                by{" "}
                <a
                  href={`/creators/${encodeURIComponent(skill.creator.toLowerCase())}`}
                  className="hover:text-accent transition-colors"
                >
                  {skill.creator}
                </a>
              </span>
              {skill.organization && (
                <>
                  <span className="text-parchment-400">&middot;</span>
                  <span className="text-ink-faint">{skill.organization}</span>
                </>
              )}
            </div>

            {/* Description */}
            <SkillPageClient
              description={skill.longDescription || skill.description}
            />

            {/* Install Commands */}
            {installCommands.length > 0 && (
              <div className="mt-10 border border-parchment-300 bg-white p-6">
                <h2 className="font-display text-heading-2 text-ink mb-4">
                  Installation
                </h2>
                <div className="flex flex-col gap-3">
                  {installCommands.map((cmd) => (
                    <div key={cmd.platform}>
                      <p className="text-xs font-medium text-ink-faint uppercase tracking-wider mb-2">
                        {cmd.platform}
                      </p>
                      <div className="flex items-center gap-2 bg-parchment-100 border border-parchment-300 p-3 font-mono text-sm text-ink group">
                        <code className="flex-1 overflow-x-auto">
                          {cmd.command}
                        </code>
                        <button
                          data-copy={cmd.command}
                          className="copy-btn shrink-0 text-ink-faint hover:text-ink transition-colors"
                          title="Copy to clipboard"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <rect x="5" y="5" width="9" height="9" rx="1" />
                            <path d="M11 5V3a1 1 0 00-1-1H3a1 1 0 00-1 1v7a1 1 0 001 1h2" />
                          </svg>
                        </button>
                      </div>
                      {cmd.note && (
                        <p className="text-xs text-ink-faint mt-1">
                          {cmd.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Platforms */}
              <div className="border border-parchment-300 bg-white p-5">
                <h3 className="text-xs font-medium text-ink-faint uppercase tracking-wider mb-3">
                  Platforms
                </h3>
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
              <div className="border border-parchment-300 bg-white p-5">
                <h3 className="text-xs font-medium text-ink-faint uppercase tracking-wider mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <a
                      key={tag}
                      href={`/?tag=${encodeURIComponent(tag)}`}
                      className="text-sm text-ink-muted bg-parchment-200 px-3 py-1 hover:bg-parchment-300 hover:text-ink transition-colors"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="border border-parchment-300 bg-white p-5">
                <dl className="space-y-4 text-sm">
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
                    <dd className="text-ink-muted">{categoryMeta.label}</dd>
                  </div>
                  {skill.sourceUrl && (
                    <div>
                      <dt className="text-ink-faint text-xs uppercase tracking-wider mb-1">
                        Source
                      </dt>
                      <dd>
                        <a
                          href={skill.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors"
                        >
                          View Source
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M5 2h7v7M12 2L2 12" />
                          </svg>
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Related Skills */}
              {related.length > 0 && (
                <div className="border border-parchment-300 bg-white p-5">
                  <h3 className="text-xs font-medium text-ink-faint uppercase tracking-wider mb-3">
                    Related Skills
                  </h3>
                  <div className="flex flex-col gap-2">
                    {related.map((r) => (
                      <a
                        key={r.id}
                        href={`/skills/${r.slug}`}
                        className="flex items-start gap-3 p-3 bg-parchment-100 hover:bg-parchment-200 transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
                            {r.name}
                          </p>
                          <p className="text-xs text-ink-muted line-clamp-2 mt-0.5">
                            {r.description}
                          </p>
                        </div>
                        <span
                          className={`category-badge category-badge-${r.category} shrink-0 mt-0.5`}
                        >
                          {CATEGORY_META[r.category].label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
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
