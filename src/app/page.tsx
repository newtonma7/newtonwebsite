'use client'

import React, {useState} from 'react';
import Hero from "@/components/Hero";
import NavBar from "@/components/Navbar";
import { motion } from "motion/react"

import About from '@/components/About';
import Experiences from '@/components/Experiences';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

type Section = 'about' | 'experiences' | 'projects' | 'contact';

export default function Home() {
    const [activeSection, setActiveSection] = useState<Section>('experiences');

    const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'experiences':
        return <Experiences />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <About />;
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

        <NavBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <div className="mt-8 w-full min-h-150flex justify-center items-center">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
