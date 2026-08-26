"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import CornerFlorals from "./CornerFlorals";
import CoverBackdrop from "./CoverBackdrop";
import Sparkles from "./Sparkles";

const ROSE = "/flowers/rose-bouquet.png";
const GREENERY = "/flowers/greenery-bouquet.png";

type Phase = "closed" | "opening";

type EnvelopeCoverProps = {
  onOpened: () => void;
};

const OPEN_DURATION = 0.75;
const TOTAL_MS = (OPEN_DURATION + 0.2) * 1000;

export default function EnvelopeCover({ onOpened }: EnvelopeCoverProps) {
  const [phase, setPhase] = useState<Phase>("closed");

  function handleOpen() {
    if (phase !== "closed") return;
    setPhase("opening");
    window.setTimeout(onOpened, TOTAL_MS);
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Toque para abrir o convite"
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleOpen();
      }}
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center gap-6 overflow-hidden bg-cream px-6 sm:gap-8"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <CoverBackdrop />
      <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-rose-soft/50 sm:inset-6" />
      <CornerFlorals
        className={`transition-opacity duration-500 ${
          phase === "opening" ? "opacity-0" : "opacity-100"
        }`}
      />
      <Sparkles />

      <motion.div
        animate={{ opacity: phase === "closed" ? 1 : 0, y: phase === "closed" ? 0 : -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2 text-center"
      >
        <span
          className="font-script text-6xl leading-none text-rose-deep sm:text-7xl"
          style={{ textShadow: "0 6px 24px rgba(169,111,102,0.25)" }}
        >
          Maria Fernanda
        </span>
        <span className="mt-1 flex items-center gap-3 text-xs tracking-[0.35em] text-ink uppercase">
          <span className="h-px w-6 bg-rose-soft" />
          XV Anos
          <span className="h-px w-6 bg-rose-soft" />
        </span>
      </motion.div>

      <div className="relative flex items-center justify-center">
        {/* light burst at the moment of tap */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={
            phase === "opening"
              ? { opacity: [0, 0.9, 0], scale: [0.4, 2.6, 3] }
              : { opacity: 0, scale: 0.4 }
          }
          transition={{ duration: OPEN_DURATION * 0.85, ease: "easeOut" }}
          className="absolute h-64 w-64 rounded-full sm:h-72 sm:w-72"
          style={{ background: "radial-gradient(circle, rgba(255,253,249,0.95), transparent 70%)" }}
        />

        {/* ambient glow behind the envelope */}
        <motion.div
          aria-hidden="true"
          animate={
            phase === "closed"
              ? { opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }
              : { opacity: 0, scale: 1.4 }
          }
          transition={
            phase === "closed"
              ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              : { duration: OPEN_DURATION, ease: "easeOut" }
          }
          className="absolute h-72 w-96 rounded-full blur-3xl sm:h-80 sm:w-[28rem]"
          style={{ background: "radial-gradient(circle, rgba(233,195,191,0.7), transparent 70%)" }}
        />

        {/* pedestal shadow */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: phase === "closed" ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-1 h-6 w-56 rounded-full bg-ink-deep/15 blur-md sm:w-64"
        />

        {/* florals resting beside the envelope, fade with it */}
        <motion.div
          aria-hidden="true"
          animate={
            phase === "closed" ? { y: [0, -5, 0], opacity: 1 } : { y: 0, opacity: 0 }
          }
          transition={
            phase === "closed"
              ? { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
              : { duration: 0.25 }
          }
          className="pointer-events-none absolute -bottom-6 -left-10 z-20 sm:-bottom-8 sm:-left-14"
        >
          <Image
            src={ROSE}
            alt=""
            width={200}
            height={160}
            draggable={false}
            className="h-auto w-24 -rotate-[12deg] select-none drop-shadow-md sm:w-28"
          />
        </motion.div>
        <motion.div
          aria-hidden="true"
          animate={
            phase === "closed" ? { y: [0, 5, 0], opacity: 1 } : { y: 0, opacity: 0 }
          }
          transition={
            phase === "closed"
              ? { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.25 }
          }
          className="pointer-events-none absolute -top-8 -right-8 z-20 sm:-top-10 sm:-right-10"
        >
          <Image
            src={GREENERY}
            alt=""
            width={177}
            height={200}
            draggable={false}
            className="h-auto w-16 rotate-[18deg] select-none drop-shadow-md sm:w-20"
          />
        </motion.div>

        {/* the envelope: a single confident motion straight to the reveal */}
        <motion.div
          initial={false}
          animate={
            phase === "closed"
              ? { y: [0, -7, 0], scale: 1, rotate: 0, opacity: 1 }
              : { y: 0, scale: 1.22, rotate: -5, opacity: 0 }
          }
          transition={
            phase === "closed"
              ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              : { duration: OPEN_DURATION, ease: [0.32, 0, 0.67, 0] }
          }
          className="relative z-10"
        >
          <Image
            src="/flowers/envelope-closed.png"
            alt="Envelope fechado, com selo de cera e um raminho de flor seca"
            width={397}
            height={329}
            priority
            draggable={false}
            className="h-auto w-60 select-none drop-shadow-xl sm:w-72"
          />
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: phase === "closed" ? [0.5, 1, 0.5] : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-rose-deep"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 3v14" strokeLinecap="round" />
          <path d="M6 12l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        <p className="text-sm tracking-[0.3em] text-ink uppercase">Toque para abrir</p>
      </motion.div>
    </motion.div>
  );
}
