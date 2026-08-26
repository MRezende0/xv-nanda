import Image from "next/image";

const ROSE = "/flowers/rose-bouquet.png";
const GREENERY = "/flowers/greenery-bouquet.png";
const ROSE_SIZE = { width: 200, height: 160 };
const GREENERY_SIZE = { width: 177, height: 200 };

export default function CoverBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 38%, transparent 45%, rgba(77,61,51,0.08) 100%)",
        }}
      />

      {/* warm spotlight glow behind the envelope */}
      <div
        className="absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(192,137,127,0.5), transparent 70%)" }}
      />

      {/* large, soft, out-of-focus florals scattered through the whole frame for depth */}
      <Image
        src={ROSE}
        alt=""
        {...ROSE_SIZE}
        className="absolute top-[6%] left-[55%] h-auto w-56 rotate-[8deg] opacity-45 blur-sm sm:w-64"
      />
      <Image
        src={GREENERY}
        alt=""
        {...GREENERY_SIZE}
        className="absolute top-[1%] -left-6 h-auto w-48 rotate-[40deg] opacity-40 blur-sm sm:w-56"
      />
      <Image
        src={ROSE}
        alt=""
        {...ROSE_SIZE}
        className="absolute top-[38%] -right-10 h-auto w-52 -rotate-[6deg] -scale-x-100 opacity-35 blur-sm sm:w-60"
      />
      <Image
        src={GREENERY}
        alt=""
        {...GREENERY_SIZE}
        className="absolute top-[34%] -left-10 h-auto w-44 rotate-[70deg] opacity-35 blur-sm sm:w-52"
      />
      <Image
        src={ROSE}
        alt=""
        {...ROSE_SIZE}
        className="absolute bottom-[4%] -right-8 h-auto w-56 -rotate-[10deg] -scale-x-100 opacity-40 blur-sm sm:w-64"
      />
      <Image
        src={GREENERY}
        alt=""
        {...GREENERY_SIZE}
        className="absolute bottom-[10%] left-[8%] h-auto w-44 rotate-[150deg] opacity-35 blur-sm sm:w-52"
      />
      <Image
        src={ROSE}
        alt=""
        {...ROSE_SIZE}
        className="absolute bottom-[26%] left-[62%] h-auto w-40 rotate-[20deg] opacity-30 blur-sm sm:w-48"
      />
    </div>
  );
}
