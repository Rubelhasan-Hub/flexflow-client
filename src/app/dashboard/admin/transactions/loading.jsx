import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0a0f1d]">
      <div className="flex flex-col items-center gap-6">

        {/* লোগো এবং হার্টবিট অ্যানিমেশন */}
        <div className="relative flex items-center justify-center">
          {/* পালসিং ইফেক্ট (হার্টবিটের মতো) */}
          <div className="absolute h-24 w-24 rounded-full bg-green-500/20 animate-ping"></div>

          {/* লোগো কন্টেইনার */}
          <div className="relative h-20 w-20 animate-pulse">
            <Image
              width={500}
              height={500}
              src="/flexflow--logo.png"
              alt="Logo"
              className="h-full w-full object-contain filter brightness-0 invert"
            />
          </div>
        </div>

        {/* টেক্সট */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-white tracking-[0.2em] uppercase">
            FlexFlow
          </h2>
          <p className="text-neutral-500 text-xs font-medium uppercase tracking-widest animate-pulse">
            Loading your journey...
          </p>
        </div>
      </div>
    </div>
  );
}