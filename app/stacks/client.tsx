"use client";

export function StacksClient({
  commands,
}: {
  commands: { platform: string; command: string }[];
}) {
  function handleCopy(text: string, btn: HTMLButtonElement) {
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
  }

  return (
    <div className="border-t border-parchment-200 pt-4">
      <p className="text-xs font-medium text-ink-faint uppercase tracking-wider mb-2">
        Install
      </p>
      {commands.map((cmd) => (
        <div
          key={cmd.command}
          className="flex items-center gap-2 bg-parchment-100 border border-parchment-300 p-2.5 font-mono text-sm text-ink mb-2 last:mb-0"
        >
          <code className="flex-1 overflow-x-auto text-xs">{cmd.command}</code>
          <button
            onClick={(e) => handleCopy(cmd.command, e.currentTarget)}
            className="shrink-0 text-ink-faint hover:text-ink transition-colors"
            title="Copy to clipboard"
          >
            <svg
              width="14"
              height="14"
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
      ))}
    </div>
  );
}
