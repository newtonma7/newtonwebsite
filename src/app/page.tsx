'use client'

import React, {useState} from 'react';
import Hero from "@/components/Hero";
import NavBar from "@/components/Navbar";
import { motion } from "motion/react"

import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

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
    <div className ="min-h-screen bg-[#f1eeed] flex items-center justify-center">
      <div className="flex flex-col mt-18 w-full max-w-5xl">
        <div className = "w-full flex justify-center"> 
          <Hero/>
        </div>

        <div className="h-16 flex items-center justify-center">
          <hr className="w-108 max-w-[80%] border-t border-zinc-300" />
        </div>

        <NavBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {activeSection !== null && (
          <div className="mt-8 w-full min-h-[150px] flex justify-center items-center">
            {renderSection()}
          </div>
        )}
      </div>
    </div>
  );
}
