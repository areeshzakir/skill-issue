import { NextResponse } from "next/server";
import matter from "gray-matter";

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

interface GitHubTreeItem {
  path: string;
  type: string;
  url: string;
}

function parseGitHubUrl(url: string): { owner: string; repo: string; branch?: string } | null {
  const match = url.match(
    /(?:^|\/\/)(?:www\.)?github\.com\/([^/]+)\/([^/]+?)(?:\/(?:tree|blob)\/([^/]+))?(?:\/|$)/
  );
  if (!match) return null;
  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/, ""),
    branch: match[3],
  };
}

function isSkillCandidate(path: string): boolean {
  const lower = path.toLowerCase();
  const filename = lower.split("/").pop() || "";

  // Skip common non-skill files
  const skipFiles = [
    "readme.md", "readme", "license.md", "license",
    "changelog.md", "changelog", "contributing.md", "contributing",
    "code_of_conduct.md", "security.md", "claude.md", "gemini.md",
    "agents.md", "package.json", "tsconfig.json",
  ];
  if (skipFiles.includes(filename)) return false;

  // Must be markdown
  if (!lower.endsWith(".md")) return false;

  return true;
}

function scoreSkillPath(path: string): number {
  // Higher score = more likely to be a skill
  if (/skills?\/[^/]+\/skill\.md$/i.test(path)) return 100;
  if (/skills?\/[^/]+\.md$/i.test(path)) return 80;
  if (/skill\.md$/i.test(path)) return 60;
  if (/skills?\//i.test(path)) return 40;
  return 10;
}

async function fetchWithRetry(url: string, headers: Record<string, string>): Promise<Response> {
  const res = await fetch(url, { headers });
  return res;
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid GitHub repository URL is required" },
        { status: 400 }
      );
    }

    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      return NextResponse.json(
        { error: "Could not parse GitHub URL. Expected format: https://github.com/owner/repo" },
        { status: 400 }
      );
    }

    const { owner, repo, branch } = parsed;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "skill-issue-catalog",
    };

    // Get default branch if not specified
    let targetBranch = branch;
    if (!targetBranch) {
      const repoRes = await fetchWithRetry(
        `https://api.github.com/repos/${owner}/${repo}`,
        headers
      );
      if (!repoRes.ok) {
        return NextResponse.json(
          { error: `Repository not found or not accessible (${repoRes.status})` },
          { status: 400 }
        );
      }
      const repoData = await repoRes.json();
      targetBranch = repoData.default_branch || "main";
    }

    // Get the repo tree recursively
    const treeRes = await fetchWithRetry(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${targetBranch}?recursive=1`,
      headers
    );

    if (!treeRes.ok) {
      return NextResponse.json(
        { error: `Could not fetch repository tree (${treeRes.status})` },
        { status: 400 }
      );
    }

    const treeData = await treeRes.json();
    const tree: GitHubTreeItem[] = treeData.tree || [];

    // Find skill candidates
    const candidates = tree
      .filter((item: GitHubTreeItem) => item.type === "blob" && isSkillCandidate(item.path))
      .sort((a: GitHubTreeItem, b: GitHubTreeItem) => scoreSkillPath(b.path) - scoreSkillPath(a.path))
      .slice(0, 50); // Cap to avoid excessive fetches

    if (candidates.length === 0) {
      return NextResponse.json(
        { error: "No skill files found in this repository" },
        { status: 404 }
      );
    }

    // Fetch and parse each candidate (concurrently, max 10 at a time)
    const skills: RepoSkill[] = [];
    const batchSize = 10;

    for (let i = 0; i < candidates.length; i += batchSize) {
      const batch = candidates.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map(async (item: GitHubTreeItem) => {
          const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${targetBranch}/${item.path}`;
          const res = await fetchWithRetry(rawUrl, { Accept: "text/plain" });
          if (!res.ok) return null;

          const content = await res.text();
          const { data } = matter(content);

          // Must have at least a name/title and description to count as a skill
          if ((!data.name && !data.title) || !data.description) return null;

          const blobUrl = `https://github.com/${owner}/${repo}/blob/${targetBranch}/${item.path}`;

          return {
            path: item.path,
            name: data.name || data.title || "Untitled",
            description: data.description || "",
            category: data.category || "meta",
            tags: Array.isArray(data.tags)
              ? data.tags
              : typeof data.tags === "string"
                ? data.tags.split(",").map((t: string) => t.trim())
                : [],
            creator: data.creator || data.author || "Unknown",
            organization: data.organization || undefined,
            platforms: Array.isArray(data.platform || data.platforms)
              ? (data.platform || data.platforms)
              : [],
            sourceUrl: blobUrl,
          } satisfies RepoSkill;
        })
      );

      for (const result of results) {
        if (result.status === "fulfilled" && result.value) {
          skills.push(result.value);
        }
      }
    }

    if (skills.length === 0) {
      return NextResponse.json(
        { error: "Found markdown files but none contained valid skill frontmatter (need name + description)" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      repo: { owner, name: repo, branch: targetBranch },
      skills,
      total: skills.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to scan repository" },
      { status: 500 }
    );
  }
}
