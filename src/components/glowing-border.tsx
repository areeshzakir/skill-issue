"use client";

import { motion } from "framer-motion";

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowingBorder({ children, className = "" }: GlowingBorderProps) {
  return (
    <div className={`relative group ${className}`}>
      <motion.div
        className="absolute -inset-0.5 rounded-xl opacity-50 blur-sm group-hover:opacity-75 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-muted) 50%, var(--color-accent) 100%)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
