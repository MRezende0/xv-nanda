"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "5514996303955";

type RSVPModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function RSVPModal({ open, onClose }: RSVPModalProps) {
  const [names, setNames] = useState<string[]>([""]);

  function handleClose() {
    onClose();
    setNames([""]);
  }

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function updateName(index: number, value: string) {
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)));
  }

  function addCompanion() {
    setNames((prev) => [...prev, ""]);
  }

  function removeCompanion(index: number) {
    setNames((prev) => prev.filter((_, i) => i !== index));
  }

  const confirmedNames = names.map((n) => n.trim()).filter(Boolean);
  const canSend = confirmedNames.length > 0;

  const message = canSend
    ? `Olá! Confirmando presença no XV da Maria Fernanda\n\n${
        confirmedNames.length === 1
          ? `Nome: ${confirmedNames[0]}`
          : `Nomes:\n${confirmedNames.map((n) => `- ${n}`).join("\n")}`
      }`
    : "";
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-deep/40 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Confirmar presença"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[85vh] w-full max-w-sm flex-col gap-5 overflow-y-auto rounded-2xl bg-cream p-6 shadow-2xl ring-1 ring-rose-soft/40"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Fechar"
              className="absolute top-4 right-4 text-ink/50 transition-colors hover:text-ink"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-1 text-center">
              <span className="font-script text-4xl text-rose-deep">Confirmar presença</span>
              <p className="text-sm text-ink">
                Conte quem vai com você para os XV anos da Maria Fernanda.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {names.map((name, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => updateName(index, e.target.value)}
                    placeholder={index === 0 ? "Seu nome" : "Nome do acompanhante"}
                    className="flex-1 rounded-md border border-rose-soft/60 bg-white/70 px-4 py-2.5 text-base text-ink-deep placeholder:text-ink/40 focus:border-rose focus:outline-none focus:ring-1 focus:ring-rose"
                  />
                  {names.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCompanion(index)}
                      aria-label="Remover acompanhante"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-ink/40 transition-colors hover:bg-rose-soft/20 hover:text-rose-deep"
                    >
                      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addCompanion}
                className="flex items-center justify-center gap-2 rounded-md border border-dashed border-rose/50 px-4 py-2.5 text-sm font-medium text-rose-deep transition-colors hover:border-rose hover:bg-rose/10"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                </svg>
                Adicionar acompanhante
              </button>
            </div>

            <a
              href={canSend ? whatsappHref : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!canSend}
              onClick={() => {
                if (canSend) window.setTimeout(handleClose, 150);
              }}
              className={`flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold tracking-[0.15em] text-white uppercase transition-colors ${
                canSend ? "bg-rose-deep hover:bg-rose" : "pointer-events-none bg-rose-deep/40"
              }`}
            >
              Confirmar
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
