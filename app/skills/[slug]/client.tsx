"use client";

import { useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export function SkillPageClient({ description }: { description: string }) {
  useEffect(() => {
    // Wire up copy buttons
    const buttons = document.querySelectorAll<HTMLButtonElement>(".copy-btn");
    const handler = (e: Event) => {
      const btn = (e.currentTarget as HTMLButtonElement);
      const text = btn.dataset.copy;
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        const svg = btn.querySelector("svg");
        if (svg) {
          const original = svg.innerHTML;
          svg.innerHTML = '<path d="M2 8l4 4 8-8" />';
          setTimeout(() => {
            svg.innerHTML = original;
          }, 1500);
        }
      });
    };
    buttons.forEach((btn) => btn.addEventListener("click", handler));
    return () =>
      buttons.forEach((btn) => btn.removeEventListener("click", handler));
  }, []);

  return (
    <div className="prose-skill">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {description}
      </Markdown>
    </div>
  );
}
