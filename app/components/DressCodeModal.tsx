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
            aria-label="Guia de estilo"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[85vh] w-full max-w-sm flex-col items-center gap-5 overflow-y-auto rounded-2xl bg-cream p-8 text-center shadow-2xl ring-1 ring-rose-soft/40"
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

            <div className="flex flex-col items-center gap-1">
              <span className="text-[0.65rem] tracking-[0.3em] text-ink uppercase">
                Guia de estilo
              </span>
              <span className="font-script text-4xl text-rose-deep">Traje social</span>
            </div>

            <div className="flex flex-col gap-4 text-left">
              <div className="flex flex-col gap-1">
                <h3 className="text-[0.65rem] tracking-[0.3em] text-rose-deep uppercase">
                  Para as convidadas
                </h3>
                <p className="text-sm text-ink-deep">
                  Sugerimos vestidos midi ou longos de tecidos fluidos e elegantes,
                  terninhos ou macacões de alfaiataria. Saltos ou sapatilhas
                  sofisticadas complementam perfeitamente o look.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-[0.65rem] tracking-[0.3em] text-rose-deep uppercase">
                  Para os convidados
                </h3>
                <p className="text-sm text-ink-deep">
                  Recomendamos calça social ou de alfaiataria, camisa social e
                  blazer ou paletó. Sapato social é ideal. O uso de gravata é
                  opcional.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
