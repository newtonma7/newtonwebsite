'use client'

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronUp } from 'lucide-react';

// Define the types for the props we're receiving from the parent
type Section = 'about' | 'projects' | 'contact';

interface NavbarProps {
  activeSection: Section | null;
  setActiveSection: (section: Section) => void;
  showAboutHint?: boolean;
}

export default function Navbar({ activeSection, setActiveSection, showAboutHint = false }: NavbarProps) {

  const navItems = [
    { id: 'about', label: 'about' },
    { id: 'projects', label: 'projects' },
    { id: 'contact', label: 'contact' },
  ];

  // The nav is center-justified and wraps, so the "about" button has no fixed
  // position. Measure it relative to the nav to anchor the hint arrow under it.
  const navRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLButtonElement>(null);
  const [hintLeft, setHintLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!showAboutHint) return;

    const measure = () => {
      const nav = navRef.current;
      const about = aboutRef.current;
      if (!nav || !about) return;
      const navRect = nav.getBoundingClientRect();
      const aboutRect = about.getBoundingClientRect();
      setHintLeft(aboutRect.left - navRect.left + aboutRect.width / 2);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [showAboutHint]);

  // helper function to get the style for a link
  const getLinkClass = (section: Section) => {
    let classes = "nav-link min-h-11 px-1 py-2 text-lg text-zinc-500 font-medium cursor-pointer hover:text-zinc-900";
    if (activeSection === section) {
      classes += " active text-zinc-900";
    }
    return classes;
  };

  return (
    <nav ref={navRef} aria-label="Primary navigation" className="relative flex flex-wrap justify-center gap-x-5 gap-y-1 sm:gap-8">
      {navItems.map((item) => (
        <button
          key={item.id}
          ref={item.id === 'about' ? aboutRef : undefined}
          type="button"
          onClick={() => setActiveSection(item.id as Section)}
          className={getLinkClass(item.id as Section)}
        >
          {item.label}
        </button>
      ))}
      <a
        href="https://drive.google.com/file/d/1oyA9iFa70PxE-QQ4yA2FlOgY_GgbSWdL/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link min-h-11 px-1 py-2 text-lg text-zinc-500 font-medium cursor-pointer hover:text-zinc-900"
      >
        resume
      </a>

      <AnimatePresence>
        {showAboutHint && hintLeft !== null && (
          <motion.button
            type="button"
            onClick={() => setActiveSection('about')}
            aria-label="Go to the about section"
            style={{ left: hintLeft }}
            initial={{ opacity: 0, x: '-50%', y: -6 }}
            animate={{ opacity: 0.3, x: '-50%', y: 0 }}
            exit={{ opacity: 0, x: '-50%', y: -6, transition: { duration: 0.45, ease: 'easeInOut' } }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute top-full z-20 -mt-[10px] flex cursor-pointer items-center justify-center text-zinc-400"
          >
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronUp className="h-5 w-5" strokeWidth={1.5} />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </nav>
  );
}
