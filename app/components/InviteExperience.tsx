"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import DressCodeModal from "./DressCodeModal";
import EnvelopeCover from "./EnvelopeCover";
import RSVPModal from "./RSVPModal";
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  DressCodeIcon,
  LocationIcon,
} from "./icons";

const ADDRESS = "Av. Archimedes Manhães, 1007, Chos Malal";

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS,
)}`;

const cardClass =
  "flex flex-col items-center gap-2 rounded-2xl bg-white/60 p-5 text-center ring-1 ring-rose-soft/40";

const cardIconClass =
  "flex h-12 w-12 items-center justify-center rounded-full bg-rose-soft/40 text-rose-deep";

const cardTitleClass = "text-[0.65rem] tracking-[0.3em] text-ink uppercase";

const cardButtonClass =
  "mt-1 rounded-full border border-rose/60 px-5 py-2 font-serif text-sm tracking-wide text-rose-deep transition-colors hover:bg-rose/10";

const primaryButtonClass =
  "flex w-full items-center justify-center gap-3 rounded-full bg-rose-deep px-8 py-4 font-serif text-lg tracking-wide text-white shadow-lg shadow-rose-deep/25 transition-colors hover:bg-rose active:scale-[0.98]";

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
        initial={{ opacity: 0 }}
        animate={opened ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="mx-auto flex w-full max-w-md flex-col items-center gap-12 pb-24"
      >
        <Image
          src="/interno-v2.jpg"
          alt="Convite de aniversário de 15 anos de Maria Fernanda, com moldura de flores em aquarela, brasão MF, a data 06.11.2026 às 21h e um envelope aberto com um cartão florido"
          width={1588}
          height={2236}
          priority
          className="h-auto w-full"
        />

        <div className="flex w-full flex-col items-center gap-12 px-6">
        <button type="button" onClick={() => setRsvpOpen(true)} className={primaryButtonClass}>
          <CheckIcon />
          Confirmar presença
        </button>

        <section className="flex w-full flex-col items-center gap-4">
          <h2 className="text-xs tracking-[0.35em] text-ink uppercase">O evento</h2>

          <div className="grid w-full grid-cols-2 gap-3">
            <div className={cardClass}>
              <span className={cardIconClass}>
                <CalendarIcon />
              </span>
              <h3 className={cardTitleClass}>Data</h3>
              <p className="text-lg font-semibold text-ink-deep">06 de novembro</p>
              <p className="text-sm text-ink">sexta-feira · 2026</p>
            </div>

            <div className={cardClass}>
              <span className={cardIconClass}>
                <ClockIcon />
              </span>
              <h3 className={cardTitleClass}>Horário</h3>
              <p className="text-lg font-semibold text-ink-deep">21h</p>
              <p className="text-sm text-ink">a festa vai até tarde</p>
            </div>

            <div className={cardClass}>
              <span className={cardIconClass}>
                <LocationIcon />
              </span>
              <h3 className={cardTitleClass}>Local</h3>
              <p className="text-lg font-semibold text-ink-deep">Chos Malal</p>
              <p className="text-sm text-ink">Av. Archimedes Manhães, 1007</p>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cardButtonClass}
              >
                Como chegar
              </a>
            </div>

            <div className={cardClass}>
              <span className={cardIconClass}>
                <DressCodeIcon />
              </span>
              <h3 className={cardTitleClass}>Traje</h3>
              <p className="text-lg font-semibold text-ink-deep">Traje social</p>
              <button
                type="button"
                onClick={() => setDressCodeOpen(true)}
                className={cardButtonClass}
              >
                Ver detalhes
              </button>
            </div>
          </div>
        </section>

        <section className="flex w-full flex-col items-center gap-5 text-center">
          <h2 className="text-xs tracking-[0.35em] text-ink uppercase">
            Contagem regressiva
          </h2>
          <Countdown />
        </section>

        <footer className="flex flex-col items-center gap-4 text-center">
          <Image
            src="/brasao.png"
            alt="Brasão com as iniciais M e F"
            width={254}
            height={254}
            className="h-auto w-24"
          />
          <span className="font-script text-3xl text-rose-deep">
            Com carinho, Maria Fernanda
          </span>
        </footer>
        </div>
      </motion.main>

      <RSVPModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
      <DressCodeModal open={dressCodeOpen} onClose={() => setDressCodeOpen(false)} />
    </>
  );
}
