'use client'

const links = [
  { id: 'github', label: 'github', href: 'https://github.com/newtonma7', external: true },
  { id: 'linkedin', label: 'linkedin', href: 'https://www.linkedin.com/in/newtonma7/', external: true },
  { id: 'email', label: 'email', href: 'mailto:newtonma7@gmail.com', external: false },
]

export default function Contact() {
  return (
    <div className="w-108 max-w-[80%] mx-auto flex flex-col items-center">
      <p className="text-lg text-zinc-900 lowercase text-center leading-relaxed mb-6">
        if you&apos;d like to talk about projects, opportunities, or just say hi
      </p>

      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 lowercase">
        {links.map((link, i) => (
          <span key={link.id} className="flex items-center gap-4">
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="nav-link text-lg text-zinc-600 font-medium hover:text-zinc-900"
            >
              {link.label}
            </a>
            {i < links.length - 1 && (
              <span className="text-zinc-300 select-none" aria-hidden>·</span>
            )}
          </span>
        ))}
      </nav>

      <p className="text-lg text-zinc-900 lowercase text-center leading-relaxed mt-6">
        always open to chatting about code, design, and new ideas
      </p>
    </div>
  )
}
