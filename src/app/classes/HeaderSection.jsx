"use client";

import { motion } from "framer-motion";

const HeaderSection = () => {
  return (
    <div className="mb-16 flex flex-col items-center text-center">
      {/* Premium Badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-400"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>
        10+ Premium Sessions Available
      </motion.div>

      {/* Hero Title */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl text-5xl font-black leading-[1.1] tracking-tighter text-white md:text-7xl"
      >
        Find Your <span className="bg-linear-to-r from-green-300 to-emerald-600 bg-clip-text text-transparent">Perfect Class</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 max-w-xl text-lg text-neutral-400"
      >
        Select from our professionally curated programs designed to push your limits and transform your lifestyle.
      </motion.p>
    </div>
  );
};

export default HeaderSection;