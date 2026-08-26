import Image from "next/image";

type CornerFloralsProps = {
  className?: string;
};

const ROSE = "/flowers/rose-bouquet.png";
const GREENERY = "/flowers/greenery-bouquet.png";
const ROSE_SIZE = { width: 200, height: 160 };
const GREENERY_SIZE = { width: 177, height: 200 };

export default function CornerFlorals({ className = "" }: CornerFloralsProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* top-left */}
      <Image
        src={GREENERY}
        alt=""
        {...GREENERY_SIZE}
        className="absolute -top-8 -left-8 h-auto w-36 rotate-[10deg] opacity-90 sm:w-44"
      />
      <Image
        src={ROSE}
        alt=""
        {...ROSE_SIZE}
        className="absolute -top-6 -left-9 h-auto w-40 -rotate-[16deg] drop-shadow-sm sm:w-52"
      />

      {/* top-right */}
      <Image
        src={GREENERY}
        alt=""
        {...GREENERY_SIZE}
        className="absolute -top-8 -right-8 h-auto w-36 -rotate-[10deg] -scale-x-100 opacity-90 sm:w-44"
      />
      <Image
        src={ROSE}
        alt=""
        {...ROSE_SIZE}
        className="absolute -top-6 -right-9 h-auto w-40 rotate-[16deg] -scale-x-100 drop-shadow-sm sm:w-52"
      />

      {/* bottom-left */}
      <Image
        src={GREENERY}
        alt=""
        {...GREENERY_SIZE}
        className="absolute -bottom-10 -left-8 h-auto w-32 rotate-[100deg] opacity-90 sm:w-40"
      />
      <Image
        src={ROSE}
        alt=""
        {...ROSE_SIZE}
        className="absolute -bottom-8 -left-7 h-auto w-36 rotate-[162deg] drop-shadow-sm sm:w-44"
      />

      {/* bottom-right */}
      <Image
        src={GREENERY}
        alt=""
        {...GREENERY_SIZE}
        className="absolute -right-8 -bottom-10 h-auto w-32 -rotate-[100deg] -scale-x-100 opacity-90 sm:w-40"
      />
      <Image
        src={ROSE}
        alt=""
        {...ROSE_SIZE}
        className="absolute -right-7 -bottom-8 h-auto w-36 -rotate-[162deg] -scale-x-100 drop-shadow-sm sm:w-44"
      />

      {/* small accents filling the edges, echoing the invitation card's continuous border */}
      <Image
        src={ROSE}
        alt=""
        {...ROSE_SIZE}
        className="absolute top-2 left-[40%] h-auto w-16 rotate-[6deg] opacity-70 sm:w-20"
      />
      <Image
        src={GREENERY}
        alt=""
        {...GREENERY_SIZE}
        className="absolute top-4 right-[36%] h-auto w-14 -rotate-[30deg] -scale-x-100 opacity-60 sm:w-16"
      />
      <Image
        src={GREENERY}
        alt=""
        {...GREENERY_SIZE}
        className="absolute bottom-3 left-[30%] h-auto w-14 rotate-[55deg] opacity-60 sm:w-16"
      />
      <Image
        src={ROSE}
        alt=""
        {...ROSE_SIZE}
        className="absolute right-[44%] bottom-1 h-auto w-16 -rotate-[8deg] -scale-x-100 opacity-70 sm:w-20"
      />
    </div>
  );
}
