export default function NotFound() {
  return (
    <div className="min-h-screen bg-parchment-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl text-ink mb-3">404</h1>
        <p className="text-ink-muted text-sm mb-6">
          Sounds like a skill issue — this page doesn&apos;t exist.
        </p>
        <a
          href="/"
          className="inline-block bg-ink text-parchment-100 px-5 py-2.5 text-sm font-medium hover:bg-ink-light transition-colors"
        >
          Back to catalog
        </a>
      </div>
    </div>
  );
}
