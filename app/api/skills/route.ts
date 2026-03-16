import { NextResponse } from "next/server";
import matter from "gray-matter";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid URL is required" },
        { status: 400 }
      );
    }

    // Convert GitHub blob URL to raw URL
    let rawUrl = url;
    if (url.includes("github.com") && url.includes("/blob/")) {
      rawUrl = url
        .replace("github.com", "raw.githubusercontent.com")
        .replace("/blob/", "/");
    }

    // Fetch the skill file
    const res = await fetch(rawUrl, {
      headers: { Accept: "text/plain" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL (${res.status})` },
        { status: 400 }
      );
    }

    const content = await res.text();

    // Parse frontmatter
    const { data } = matter(content);

    if (!data.name && !data.title) {
      return NextResponse.json(
        {
          error:
            "No skill metadata found. Ensure the file has YAML frontmatter with at least a 'name' field.",
        },
        { status: 400 }
      );
    }

    const skill = {
      name: data.name || data.title || "Untitled Skill",
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
        ? data.platform || data.platforms
        : [],
      sourceUrl: url,
    };

    return NextResponse.json({ skill });
  } catch {
    return NextResponse.json(
      { error: "Failed to parse skill file" },
      { status: 500 }
    );
  }
}
