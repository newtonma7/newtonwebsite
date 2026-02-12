'use client'

import { motion } from 'motion/react'

export default function Hero() {
  return (
    <div className="flex flex-col gap-5">
      <motion.h1
        className="text-6xl text-zinc-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        Hello!
      </motion.h1>
      <motion.div
        className="-mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      >
        <h2 className="text-5xl text-zinc-900 flex items-baseline gap-5 overflow-visible">
          <span className="relative z-10">I&apos;m Newton</span>
          <motion.span
            className="text-red-500 relative z-5"
            initial={{ opacity: 0, x: -110 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          >
            馬
          </motion.span>
          <motion.span
            className="text-red-500 relative z-1"
            initial={{ opacity: 0, x: -190 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          >
            (Mã)
          </motion.span>
        </h2>
        <motion.p
          className="text-xl text-zinc-400 font-normal mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 1.35 }}
        >
          cs & cmda at vt
        </motion.p>
      </motion.div>
    </div>
  );
}
