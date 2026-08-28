"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

type EnvelopeCoverProps = {
  onOpened: () => void;
};

export default function EnvelopeCover({ onOpened }: EnvelopeCoverProps) {
  const [opening, setOpening] = useState(false);

  function handleOpen() {
    if (opening) return;
    setOpening(true);
    onOpened();
  }

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex justify-center bg-cream"
    >
      <motion.button
        type="button"
        onClick={handleOpen}
        aria-label="Toque para abrir o convite"
        animate={{ scale: [1, 1.012, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative block h-full w-full max-w-md"
      >
        <Image
          src="/capa-v3.jpg"
          alt="Convite de XV anos de Maria Fernanda, com moldura de flores em aquarela e um envelope fechado com selo de cera"
          fill
          priority
          sizes="(min-width: 448px) 448px, 100vw"
          className="z-0 object-cover object-center"
        />

        <Image
          src="/brasao.png"
          alt=""
          aria-hidden="true"
          width={254}
          height={254}
          priority
          className="absolute top-[24%] left-1/2 z-10 w-[17%] -translate-x-1/2 -translate-y-1/2"
        />
      </motion.button>
    </motion.div>
  );
}
