import type { ReactNode } from "react";

type CircleActionProps = {
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
};

const circleClass =
  "flex h-16 w-16 items-center justify-center rounded-full bg-rose-deep text-white shadow-md shadow-ink-deep/10 transition-transform group-hover:scale-105 group-active:scale-95 sm:h-[4.5rem] sm:w-[4.5rem]";

const labelClass = "text-[0.65rem] tracking-[0.15em] text-ink uppercase";

export default function CircleAction({ icon, label, href, onClick }: CircleActionProps) {
  const content = (
    <>
      <span className={circleClass}>{icon}</span>
      <span className={labelClass}>{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center gap-2"
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="group flex flex-col items-center gap-2">
      {content}
    </button>
  );
}
