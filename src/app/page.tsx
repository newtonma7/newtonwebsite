'use client'

import React, {useEffect, useRef, useState} from 'react';
import Hero from "@/components/Hero";
import NavBar from "@/components/Navbar";
import { AnimatePresence, motion } from "motion/react"

import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import CustomScrollbar from '@/components/CustomScrollbar';

type Section = 'about' | 'projects' | 'contact';

// custom smoother scroll-to-top helper for leaving projects
const smoothScrollToTop = (duration: number = 600) => {
  if (typeof window === 'undefined') return;

  const startY = window.scrollY || window.pageYOffset;
  if (startY <= 0) return;

  const startTime = performance.now();

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const nextY = startY * (1 - eased);

    window.scrollTo(0, nextY);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

export default function Home() {
    const [activeSection, setActiveSection] = useState<Section | null>(null);
    const [pendingSection, setPendingSection] = useState<Section | null>(null);
    const [isScrollingToTop, setIsScrollingToTop] = useState(false);
    const [transitionOpacity, setTransitionOpacity] = useState(1);
    const scrollStartYRef = useRef(0);

    // smooth, non-jittery transition when leaving projects
    const handleSetActiveSection = (section: Section) => {
      if (activeSection === 'projects' && typeof window !== 'undefined') {
        scrollStartYRef.current = window.scrollY || 0;
        setPendingSection(section);
        setIsScrollingToTop(true);
        setTransitionOpacity(1);
        smoothScrollToTop(600);
      } else {
        setActiveSection(section);
      }
    };

    // track scroll position: fade out projects as we scroll up, then switch section at top
    useEffect(() => {
      if (!isScrollingToTop || typeof window === 'undefined') return;

      let frameId: number;
      const startY = scrollStartYRef.current || 1;

      const checkScrollPosition = () => {
        const y = window.scrollY || window.pageYOffset;

        // fade projects out as we scroll up (opacity 1 at bottom -> 0 at top)
        const opacity = startY > 0 ? Math.max(0, Math.min(1, y / startY)) : 0;
        setTransitionOpacity(opacity);

        if (y <= 2) {
          setIsScrollingToTop(false);
          setTransitionOpacity(1);
          if (pendingSection) {
            setActiveSection(pendingSection);
            setPendingSection(null);
          }
          return;
        }

        frameId = window.requestAnimationFrame(checkScrollPosition);
      };

      frameId = window.requestAnimationFrame(checkScrollPosition);

      return () => {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
        }
      };
    }, [isScrollingToTop, pendingSection]);

    const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  
  return (
    <>
    <CustomScrollbar activeSection={activeSection} />
    <div className ="min-h-screen bg-[#f1eeed] flex items-start justify-center pt-24">
      <div className="flex flex-col mt-8 w-full max-w-5xl">
        <div className = "w-full flex justify-center"> 
          <Hero/>
        </div>

        <motion.div
          className="h-16 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.4 }}
        >
          <hr className="w-108 max-w-[80%] border-t border-zinc-300" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.25, ease: "easeOut", delay: 1.85 }}
        >
          <NavBar
            activeSection={pendingSection != null ? pendingSection : activeSection}
            setActiveSection={handleSetActiveSection}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {activeSection !== null && (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="mt-8 w-full min-h-[150px] flex justify-center items-center pb-24"
              style={{ opacity: isScrollingToTop ? transitionOpacity : 1 }}
            >
              {renderSection()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  </>
  );
}
