import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#FDFCFA",
          100: "#FAF7F2",
          200: "#F0EBE3",
          300: "#E8E2D9",
          400: "#D4CCC0",
        },
        ink: {
          DEFAULT: "#1C1917",
          light: "#44403C",
          muted: "#78716C",
          faint: "#A8A29E",
        },
        accent: {
          DEFAULT: "#B45309",
          hover: "#92400E",
          light: "#FEF3C7",
          muted: "#F59E0B",
        },
        category: {
          engineering: "#1E40AF",
          design: "#9D174D",
          devops: "#065F46",
          marketing: "#B45309",
          productivity: "#5B21B6",
          research: "#0E7490",
          meta: "#57534E",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 4vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "400" },
        ],
        "heading-1": [
          "clamp(1.875rem, 3vw, 2.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "heading-2": [
          "1.5rem",
          { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
      },
      boxShadow: {
        card: "0 1px 3px rgba(28, 25, 23, 0.04), 0 1px 2px rgba(28, 25, 23, 0.02)",
        "card-hover":
          "0 8px 25px rgba(28, 25, 23, 0.08), 0 2px 6px rgba(28, 25, 23, 0.04)",
        panel: "−16px 0 48px rgba(28, 25, 23, 0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
