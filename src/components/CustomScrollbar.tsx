'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

type Section = 'about' | 'projects' | 'contact'

interface CustomScrollbarProps {
  activeSection: Section | null
}

export default function CustomScrollbar({ activeSection }: CustomScrollbarProps) {
  const [isScrollable, setIsScrollable] = useState(false)
  const [thumbStyle, setThumbStyle] = useState({ height: '0%', top: '0%' })

  const shouldShow = activeSection === 'projects' && isScrollable

  useEffect(() => {
    const checkScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = document.documentElement
      const canScroll = scrollHeight > clientHeight
      setIsScrollable(canScroll)

      if (canScroll) {
        const thumbHeight = (clientHeight / scrollHeight) * 100
        const thumbTop = (scrollHeight - clientHeight) > 0
          ? (scrollTop / (scrollHeight - clientHeight)) * (100 - thumbHeight)
          : 0
        setThumbStyle({
          height: `${Math.max(5, thumbHeight)}%`,
          top: `${thumbTop}%`,
        })
      }
    }

    checkScroll()
    window.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)

    // Re-check after sections animate in
    const timer = setTimeout(checkScroll, 400)

    return () => {
      window.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
      clearTimeout(timer)
    }
  }, [])

  // Re-check scroll when section changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const { scrollHeight, clientHeight, scrollTop } = document.documentElement
      const canScroll = scrollHeight > clientHeight
      setIsScrollable(canScroll)
      if (canScroll) {
        const thumbHeight = (clientHeight / scrollHeight) * 100
        const thumbTop = (scrollHeight - clientHeight) > 0
          ? (scrollTop / (scrollHeight - clientHeight)) * (100 - thumbHeight)
          : 0
        setThumbStyle({
          height: `${Math.max(5, thumbHeight)}%`,
          top: `${thumbTop}%`,
        })
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [activeSection])

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = e.currentTarget
    const rect = track.getBoundingClientRect()
    const ratio = (e.clientY - rect.top) / rect.height
    const { scrollHeight, clientHeight } = document.documentElement
    const maxScroll = scrollHeight - clientHeight
    window.scrollTo({ top: maxScroll * ratio, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed right-0 top-0 bottom-0 w-[14px] z-50 flex justify-center py-2 pointer-events-none"
        >
          <div
            className="relative w-full h-full min-h-[100px] rounded-full bg-[#f1eeed] cursor-pointer pointer-events-auto"
            onClick={handleTrackClick}
            role="scrollbar"
            aria-label="Scrollbar"
          >
            <div
              className="absolute left-[3px] right-[3px] rounded-full bg-[#d4d0ce] hover:bg-[#b8b4b2] transition-colors duration-150 cursor-grab active:cursor-grabbing min-h-[20px]"
              style={{
                height: thumbStyle.height,
                top: thumbStyle.top,
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                const startY = e.clientY
                const startScroll = document.documentElement.scrollTop
                const { scrollHeight, clientHeight } = document.documentElement
                const maxScroll = scrollHeight - clientHeight
                const trackHeight = (e.currentTarget.parentElement?.clientHeight ?? 1) - 16
                const ratio = maxScroll / trackHeight

                const move = (e: MouseEvent) => {
                  const dy = e.clientY - startY
                  window.scrollTo(0, Math.max(0, Math.min(maxScroll, startScroll + dy * ratio)))
                }
                const up = () => {
                  document.removeEventListener('mousemove', move)
                  document.removeEventListener('mouseup', up)
                }
                document.addEventListener('mousemove', move)
                document.addEventListener('mouseup', up)
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
