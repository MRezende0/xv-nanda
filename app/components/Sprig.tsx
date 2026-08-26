type SprigProps = {
  className?: string;
  flip?: boolean;
};

export default function Sprig({ className = "", flip = false }: SprigProps) {
  return (
    <svg
      viewBox="0 0 140 44"
      fill="none"
      aria-hidden="true"
      className={`${flip ? "-scale-x-100" : ""} ${className}`}
    >
      <path
        d="M4 22c28-14 60-16 92-6"
        stroke="var(--color-sage)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M28 17c-3-5-2-9 2-12"
        stroke="var(--color-sage)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M46 13c-1-6 1-9 5-11"
        stroke="var(--color-sage)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M64 12c1-6 4-8 8-9"
        stroke="var(--color-sage)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <ellipse
        cx="30"
        cy="14"
        rx="3.2"
        ry="1.8"
        fill="var(--color-sage)"
        opacity="0.85"
        transform="rotate(-35 30 14)"
      />
      <ellipse
        cx="48"
        cy="10"
        rx="3.4"
        ry="1.9"
        fill="var(--color-sage)"
        opacity="0.85"
        transform="rotate(-30 48 10)"
      />
      <ellipse
        cx="66"
        cy="9"
        rx="3"
        ry="1.7"
        fill="var(--color-sage)"
        opacity="0.85"
        transform="rotate(-20 66 9)"
      />
      <g transform="translate(96 15)">
        <circle cx="0" cy="0" r="3.6" fill="var(--color-rose-soft)" />
        <circle cx="5" cy="-2" r="3" fill="var(--color-rose)" />
        <circle cx="4" cy="4" r="2.6" fill="var(--color-rose-soft)" />
        <circle cx="2" cy="0" r="1.6" fill="var(--color-rose-deep)" />
      </g>
    </svg>
  );
}
