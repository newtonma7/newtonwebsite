'use client'

import { motion } from 'motion/react'

export default function Hero() {
  return (
    <div className="flex max-w-full flex-col gap-5">
      <motion.h1
        className="text-5xl text-zinc-900 sm:text-6xl"
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
        <h2 className="flex max-w-full flex-wrap items-baseline gap-x-3 gap-y-1 text-4xl text-zinc-900 overflow-visible sm:gap-5 sm:text-5xl">
          <span className="relative z-10 whitespace-nowrap">I&apos;m Newton</span>
          <span className="flex items-baseline gap-3 whitespace-nowrap sm:gap-5">
            <motion.span
              className="relative z-5 text-[#E31637]"
              initial={{ opacity: 0, x: -110 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            >
              馬
            </motion.span>
            <motion.span
              className="relative z-1 text-[#E31637]"
              initial={{ opacity: 0, x: -190 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            >
              (
              <a
                href="https://vi.wikipedia.org/wiki/M%C3%A3_(h%E1%BB%8D)"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                Mã
              </a>
              )
            </motion.span>
          </span>
        </h2>
        <motion.p
          className="mt-1 text-lg font-normal text-zinc-400 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 1.35 }}
        >
          cs & math at vt
        </motion.p>
      </motion.div>
    </div>
  );
}
