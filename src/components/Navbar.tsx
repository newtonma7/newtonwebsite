import React from 'react';

// Define the types for the props we're receiving from the parent
type Section = 'about' | 'projects' | 'contact';

interface NavbarProps {
  activeSection: Section | null;
  setActiveSection: (section: Section) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  
  const navItems = [
    { id: 'about', label: 'about' },
    { id: 'projects', label: 'projects' },
    { id: 'contact', label: 'contact' },
  ];

  // helper function to get the style for a link
  const getLinkClass = (section: Section) => {
    let classes = "nav-link min-h-11 px-1 py-2 text-lg text-zinc-500 font-medium cursor-pointer hover:text-zinc-900";
    if (activeSection === section) {
      classes += " active text-zinc-900";
    }
    return classes;
  };

  return (
    <nav aria-label="Primary navigation" className="flex flex-wrap justify-center gap-x-5 gap-y-1 sm:gap-8">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setActiveSection(item.id as Section)}
          className={getLinkClass(item.id as Section)}
        >
          {item.label}
        </button>
      ))}
      <a
        href="https://drive.google.com/file/d/1B08BNXilY-REqaMupkNsIW74KZjH1zHA/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link min-h-11 px-1 py-2 text-lg text-zinc-500 font-medium cursor-pointer hover:text-zinc-900"
      >
        resume
      </a>
    </nav>
  );
}