'use client'

import { motion } from 'motion/react'

export default function Hero() {
  return (
    <div className="flex flex-col gap-5">
      <motion.h1
        className="text-6xl text-zinc-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        Hello!
      </motion.h1>
      <motion.div
        className="-mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.55 }}
      >
      <h2 className="text-5xl text-zinc-900 flex items-baseline gap-5 overflow-visible">
        <span className="relative z-10">I&apos;m Newton</span>
        <motion.span
          className="text-red-500 relative z-[5]"
          initial={{ opacity: 0, x: -110 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
        >
          馬
        </motion.span>
        <motion.span
          className="text-red-500 relative z-[1]"
          initial={{ opacity: 0, x: -190 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 1.15 }}
        >
          Mã
        </motion.span>
      </h2>
      <p className="text-xl text-zinc-400 font-normal mt-1">cs & cmda at vt</p>
      </motion.div>
    </div>
  );
}
