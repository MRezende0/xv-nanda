"use client";

import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-11-06T21:00:00-03:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, EVENT_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "dias" },
  { key: "hours", label: "horas" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "seg" },
];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Date.now() differs between server and client, so the first real value
    // can only be read after mount to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(getTimeLeft());
    const id = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!timeLeft) {
    return <div className="h-24" aria-hidden="true" />;
  }

  const arrived = Object.values(timeLeft).every((v) => v === 0);

  if (arrived) {
    return (
      <p className="text-center font-script text-4xl text-rose-deep">
        Chegou o grande dia!
      </p>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      {UNITS.map(({ key, label }) => (
        <div key={key} className="flex flex-col items-center">
          <span className="min-w-[2.6ch] text-center text-3xl font-semibold text-rose-deep tabular-nums sm:text-4xl">
            {String(timeLeft[key]).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[0.65rem] tracking-[0.25em] text-ink uppercase">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
