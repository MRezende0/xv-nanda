"use client";

import { motion } from "motion/react";

const SPARKLES = [
  { top: "14%", left: "22%", size: 5, delay: 0 },
  { top: "20%", left: "78%", size: 4, delay: 0.6 },
  { top: "32%", left: "12%", size: 3, delay: 1.4 },
  { top: "30%", left: "88%", size: 5, delay: 0.3 },
  { top: "58%", left: "6%", size: 4, delay: 1.9 },
  { top: "62%", left: "93%", size: 3, delay: 0.9 },
  { top: "78%", left: "18%", size: 5, delay: 1.2 },
  { top: "80%", left: "82%", size: 4, delay: 0.1 },
  { top: "46%", left: "50%", size: 3, delay: 2.2 },
];

export default function Sparkles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: "radial-gradient(circle, #fffdf9 0%, var(--color-rose-soft) 60%, transparent 100%)",
            boxShadow: "0 0 6px 1px rgba(233,195,191,0.8)",
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
          transition={{
            duration: 3.4,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
