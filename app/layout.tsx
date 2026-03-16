import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "skill-issue — Curated AI Agent Skills",
  description:
    "A curated collection of AI agent skills for Claude Code, Codex, Gemini CLI, and more. Find the right skill for any task.",
  openGraph: {
    title: "skill-issue",
    description: "Every problem is a skill issue. Find the right skill.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
