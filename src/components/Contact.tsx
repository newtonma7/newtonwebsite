'use client'

const links = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  email: 'mailto:your@email.com',
}

export default function Contact() {
  return (
    <div className="w-full max-w-[640px] mx-auto">
      <ul className="flex flex-col gap-4 list-none p-0 m-0 lowercase">
        <li>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-link text-zinc-900 hover:text-zinc-900"
          >
            github
          </a>
        </li>
        <li>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-link text-zinc-900 hover:text-zinc-900"
          >
            linkedin
          </a>
        </li>
        <li>
          <a
            href={links.email}
            className="resume-link text-zinc-900 hover:text-zinc-900"
          >
            email
          </a>
        </li>
      </ul>
    </div>
  )
}
