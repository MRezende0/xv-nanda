"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { DressCodeIcon } from "./icons";

type DressCodeModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function DressCodeModal({ open, onClose }: DressCodeModalProps) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-deep/40 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Traje"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-cream p-8 text-center shadow-2xl ring-1 ring-rose-soft/40"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-4 right-4 text-ink/50 transition-colors hover:text-ink"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
            </button>

            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-deep text-white">
              <DressCodeIcon />
            </span>

            <span className="font-script text-4xl text-rose-deep">Traje</span>
            <p className="text-lg text-ink-deep">Esporte fino.</p>
            <p className="text-sm text-ink">
              Capriche, mas fique à vontade para dançar a noite toda!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
