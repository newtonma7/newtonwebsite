import React from 'react';

// Define the types for the props we're receiving from the parent
type Section = 'about' | 'experiences' | 'projects' | 'contact';

interface NavbarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  
  const navItems = [
    { id: 'about', label: 'about' },
    { id: 'experiences', label: 'experiences' },
    { id: 'projects', label: 'projects' },
    { id: 'contact', label: 'contact' },
  ];

  // Helper function to get the style for a link
  const getLinkClass = (section: Section) => {
    // These are the styles for ALL links
    let classes = "text-lg text-zinc-400 font-medium cursor-pointer transition-all duration-300";
    
    // These are the styles for ONLY the ACTIVE link
    if (activeSection === section) {
      classes += " text-zinc-900 underline underline-offset-4";
    } else {
      classes += " hover:text-zinc-900";
    }
    return classes;
  };

  return (
    // This is the navbar container
    <nav className="flex flex-row gap-8 mt-16 justify-center">
      {navItems.map((item) => (
        <span
          key={item.id}
          // On click, we call the function from the parent to update the state
          onClick={() => setActiveSection(item.id as Section)}
          // We dynamically set the classes based on the active state
          className={getLinkClass(item.id as Section)}
        >
          {item.label}
        </span>
      ))}
    </nav>
  );
}