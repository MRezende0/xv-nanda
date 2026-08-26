"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CircleAction from "./CircleAction";
import Countdown from "./Countdown";
import DressCodeModal from "./DressCodeModal";
import EnvelopeCover from "./EnvelopeCover";
import RSVPModal from "./RSVPModal";
import Sprig from "./Sprig";
import { CheckIcon, DressCodeIcon, LocationIcon } from "./icons";

const ADDRESS = "Av. Archimedes Manhães, 1007, Chos Malal";

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS,
)}`;

export default function InviteExperience() {
  const [opened, setOpened] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [dressCodeOpen, setDressCodeOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = opened ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      <AnimatePresence>
        {!opened && <EnvelopeCover key="cover" onOpened={() => setOpened(true)} />}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-md flex-col items-center gap-14 px-6 pb-24 pt-14 sm:pt-20"
      >
        <figure className="w-full overflow-hidden rounded-2xl shadow-xl shadow-ink-deep/10 ring-1 ring-rose-soft/50">
          <Image
            src="/convite-arte.jpg"
            alt="Convite de aniversário de 15 anos de Maria Fernanda, com moldura floral, endereço em Chos Malal e data 06.11.2026"
            width={1136}
            height={1600}
            priority
            className="h-auto w-full"
          />
        </figure>

        <section className="flex w-full flex-col items-center gap-5 text-center">
          <h2 className="text-xs tracking-[0.35em] text-ink uppercase">
            Contagem regressiva
          </h2>
          <Countdown />

          <div className="mt-2 flex flex-wrap justify-center gap-6 sm:gap-8">
            <CircleAction icon={<LocationIcon />} label="Como chegar" href={mapsHref} />
            <CircleAction
              icon={<CheckIcon />}
              label="Confirmar presença"
              onClick={() => setRsvpOpen(true)}
            />
            <CircleAction
              icon={<DressCodeIcon />}
              label="Trajes"
              onClick={() => setDressCodeOpen(true)}
            />
          </div>
        </section>

        <Sprig className="h-8 w-32 text-sage" />

        <footer className="flex flex-col items-center gap-2 text-center">
          <span className="font-script text-3xl text-rose-deep">
            Com carinho, Maria Fernanda
          </span>
        </footer>
      </motion.main>

      <RSVPModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
      <DressCodeModal open={dressCodeOpen} onClose={() => setDressCodeOpen(false)} />
    </>
  );
}
