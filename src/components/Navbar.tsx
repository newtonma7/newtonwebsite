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
    let classes = "nav-link text-lg text-zinc-500 font-medium cursor-pointer hover:text-zinc-900";
    if (activeSection === section) {
      classes += " active text-zinc-900";
    }
    return classes;
  };

  return (
    <nav className="flex flex-row gap-8 justify-center">
      {navItems.map((item) => (
        <span
          key={item.id}
          onClick={() => setActiveSection(item.id as Section)}
          className={getLinkClass(item.id as Section)}
        >
          {item.label}
        </span>
      ))}
      <a
        href="https://drive.google.com/file/d/1B08BNXilY-REqaMupkNsIW74KZjH1zHA/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link text-lg text-zinc-500 font-medium cursor-pointer hover:text-zinc-900"
      >
        resume
      </a>
    </nav>
  );
}