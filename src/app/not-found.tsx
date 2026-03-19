import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-6xl mb-4">404</h1>
        <p className="text-[var(--muted)] text-lg mb-8">
          That page doesn&apos;t exist. Maybe it&apos;s a skill issue.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
