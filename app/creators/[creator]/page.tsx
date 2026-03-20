import { Metadata } from "next";
import { notFound } from "next/navigation";
import { skills } from "@/lib/skills-data";
import { CATEGORY_META, PLATFORM_META, Category } from "@/lib/types";

interface Props {
  params: Promise<{ creator: string }>;
}

function getCreatorSkills(creatorSlug: string) {
  return skills.filter(
    (s) => s.creator.toLowerCase() === decodeURIComponent(creatorSlug)
  );
}

function getCreatorName(creatorSlug: string) {
  const decoded = decodeURIComponent(creatorSlug);
  const skill = skills.find((s) => s.creator.toLowerCase() === decoded);
  return skill?.creator ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { creator } = await params;
  const name = getCreatorName(creator);
  if (!name) return {};

  const creatorSkills = getCreatorSkills(creator);
  return {
    title: `${name} — skill-issue`,
    description: `${creatorSkills.length} AI agent skills by ${name}`,
    openGraph: {
      title: `${name} — AI Agent Skills Creator`,
      description: `Browse ${creatorSkills.length} skills by ${name}`,
      type: "profile",
    },
  };
}

export function generateStaticParams() {
  const creators = [...new Set(skills.map((s) => s.creator.toLowerCase()))];
  return creators.map((c) => ({ creator: c }));
}

export default async function CreatorPage({ params }: Props) {
  const { creator } = await params;
  const creatorSkills = getCreatorSkills(creator);
  const creatorName = getCreatorName(creator);

  if (!creatorName || creatorSkills.length === 0) notFound();

  const organization = creatorSkills.find((s) => s.organization)?.organization;

  // Stats
  const categories = [...new Set(creatorSkills.map((s) => s.category))];
  const platforms = [
    ...new Set(creatorSkills.flatMap((s) => s.platforms)),
  ];

  // Group by category
  const byCategory = categories.reduce(
    (acc, cat) => {
      acc[cat] = creatorSkills.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<Category, typeof creatorSkills>
  );

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
        {/* Creator hero */}
        <section className="pt-12 md:pt-20 pb-10 md:pb-14 max-w-3xl">
          <nav className="flex items-center gap-2 text-sm text-ink-faint mb-8">
            <a href="/" className="hover:text-ink-muted transition-colors">
              Catalog
            </a>
            <span>/</span>
            <span className="text-ink-muted">Creator</span>
          </nav>

          <h1 className="font-display text-heading-1 text-ink mb-2">
            {creatorName}
          </h1>
          {organization && (
            <p className="text-ink-muted text-lg mb-6">{organization}</p>
          )}

          <div className="flex gap-6 text-sm text-ink-muted">
            <span>
              <strong className="text-ink font-medium">
                {creatorSkills.length}
              </strong>{" "}
              skill{creatorSkills.length !== 1 ? "s" : ""}
            </span>
            <span>
              <strong className="text-ink font-medium">
                {categories.length}
              </strong>{" "}
              categor{categories.length !== 1 ? "ies" : "y"}
            </span>
            <span>
              <strong className="text-ink font-medium">
                {platforms.length}
              </strong>{" "}
              platform{platforms.length !== 1 ? "s" : ""}
            </span>
          </div>
        </section>

        {/* Skills by category */}
        <div className="pb-20 space-y-12">
          {categories.map((cat) => (
            <section key={cat}>
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-parchment-300">
                <span
                  className={`category-badge category-badge-${cat}`}
                >
                  {CATEGORY_META[cat].label}
                </span>
                <span className="text-sm text-ink-faint">
                  {byCategory[cat].length} skill
                  {byCategory[cat].length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {byCategory[cat].map((skill) => (
                  <a
                    key={skill.id}
                    href={`/skills/${skill.slug}`}
                    className={`group bg-white border-l-[3px] border-l-category-${cat} shadow-card hover:shadow-card-hover transition-shadow`}
                  >
                    <div className="p-5">
                      <h3 className="font-display text-lg text-ink tracking-tight mb-2 group-hover:text-accent transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-ink-muted leading-relaxed line-clamp-3 mb-4">
                        {skill.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {skill.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-ink-faint bg-parchment-200 px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-1 pt-3 border-t border-parchment-200">
                        {skill.platforms.slice(0, 4).map((p) => (
                          <span
                            key={p}
                            className="text-[10px] font-medium text-ink-faint bg-parchment-100 border border-parchment-300 px-1.5 py-0.5"
                            title={PLATFORM_META[p].label}
                          >
                            {PLATFORM_META[p].short}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
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
