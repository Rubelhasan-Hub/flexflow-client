export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0a0f1d]">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute h-full w-full animate-spin rounded-full border-4 border-neutral-800 border-t-green-500"></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-xl font-black text-white tracking-widest uppercase">
            Loading
          </h2>
          <p className="text-neutral-500 text-sm mt-1 animate-pulse">
            Getting things ready for you...
          </p>
        </div>
      </div>
    </div>
  );
}