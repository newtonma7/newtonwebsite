'use client'

import React, {useState} from 'react';
import Hero from "@/components/Hero";
import NavBar from "@/components/Navbar";
import { AnimatePresence, motion } from "motion/react"

import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import CustomScrollbar from '@/components/CustomScrollbar';

type Section = 'about' | 'projects' | 'contact';

export default function Home() {
    const [activeSection, setActiveSection] = useState<Section | null>(null);

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
    // 1st div is the background and centers it all
    // 2nd div contains the below (nav bar) + (the greeting componnet + spline) --> stacked col style
    // 3rd div contains the greeting + spline
    <>
    <CustomScrollbar activeSection={activeSection} />
    <div className ="min-h-screen bg-[#f1eeed] flex items-start justify-center pt-24">
      <div className="flex flex-col mt-18 w-full max-w-5xl">
        <div className = "w-full flex justify-center"> 
          <Hero/>
        </div>

        <motion.div
          className="h-16 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 1.9 }}
        >
          <hr className="w-108 max-w-[80%] border-t border-zinc-300" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 1.9 }}
        >
          <NavBar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
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
              className="mt-8 w-full min-h-[150px] flex justify-center items-center"
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
