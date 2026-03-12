'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

type Project = {
  name: string
  description: string
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
  images?: string[]
}

function FadeImagePair({
  images,
  altBase,
}: {
  images: [string, string]
  altBase: string
}) {
  const [activeIdx, setActiveIdx] = useState<0 | 1>(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIdx((prev) => (prev === 0 ? 1 : 0))
    }, 3200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-md border border-zinc-200 bg-[#f1eeed]">
      <Image
        src={images[0]}
        alt={`${altBase} screenshot 1`}
        fill
        className={`object-cover transition-opacity duration-700 ${
          activeIdx === 0 ? 'opacity-100' : 'opacity-0'
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      <Image
        src={images[1]}
        alt={`${altBase} screenshot 2`}
        fill
        className={`object-cover transition-opacity duration-700 ${
          activeIdx === 1 ? 'opacity-100' : 'opacity-0'
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
    </div>
  )
}

const projects: Project[] = [
  {
    name: 'Virginia Tech Entrepreneurship Club Website',
    description: 'Developed and designed in collaboration with the web development team',
    techStack: ['Next.js', 'TypeScript', 'Framer Motion', 'Figma'],
    liveUrl: 'https://eclubwebsite.vercel.app/',
    // repoUrl: 'https://github.com/you/repo',
  },
  {
    name: 'knot',
    description: 'RAG AI-powered study tool that transforms materials into traceable practice sets and gap analysis',
    techStack: ['Next.js', 'Node.js', 'Snowflake', 'Gemini', 'Python'],
    liveUrl: 'https://devpost.com/software/knot-7rwyu5',
  },
  {
    name: 'Rotrack',
    description: 'Full-stack web app for productivity tracking and goal management',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Docker'],
    images: ['/images/projects/rotrack-1.webp', '/images/projects/rotrack-2.webp'],
  },
  {
    name: 'Trendr',
    description: 'Tinder-esque web application for finding personal style and archiving outfits',
    techStack: ['React.js', 'Django','MongoDB', 'Docker'],
    images: ['/images/projects/trendr-1.webp', '/images/projects/trendr-2.webp'],
  },
  {
    name: 'Stepfree',
    description: 'Web application for wheelchair accessibility and travel',
    techStack: ['Next.js', 'Typescript', 'Flask', 'Supabase'],
  },

  // Add more projects below. Optional: liveUrl, repoUrl (open in new tab).
  // { name: '...', description: '...', techStack: ['...'], liveUrl: '...', repoUrl: '...' },
]

const projectNameClass =
  'project-link text-xl text-zinc-600 font-medium cursor-pointer hover:text-zinc-900 inline-block'

export default function Projects() {
  const imagePairsByName = useMemo(() => {
    const map = new Map<string, [string, string]>()
    for (const p of projects) {
      if (p.images?.length === 2) map.set(p.name, [p.images[0], p.images[1]])
    }
    return map
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <ul className="projects-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 list-none p-0 m-0">
        {projects.map((project) => {
          const href = project.liveUrl || project.repoUrl || '#'
          const showCodeLink = !!(project.liveUrl && project.repoUrl)
          const imagePair = imagePairsByName.get(project.name)

          return (
            <li
              key={project.name}
              className="group border border-zinc-200 rounded-lg p-5 bg-[#f6f4f3] hover:border-zinc-300 hover:bg-[#f9f8f7] transition-colors duration-300"
            >
              <h3 className="text-lg font-medium mb-2">
                <a
                  href={href}
                  target={href === '#' ? undefined : '_blank'}
                  rel={href === '#' ? undefined : 'noopener noreferrer'}
                  className={projectNameClass}
                  data-project-link
                  onClick={href === '#' ? (e) => e.preventDefault() : undefined}
                >
                  {project.name}
                </a>
                {showCodeLink && (
                  <>
                    {' · '}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={projectNameClass}
                      data-project-link
                    >
                      code
                    </a>
                  </>
                )}
              </h3>
              <p className="text-m text-zinc-600 leading-relaxed lowercase mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-zinc-500 lowercase px-2 py-0.5 border border-zinc-200 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {imagePair && (
                <div className="mt-4 overflow-hidden opacity-0 max-h-0 translate-y-1 transition-[max-height,opacity,transform] duration-1200 ease-in-out group-hover:opacity-100 group-hover:max-h-[220px] group-hover:translate-y-0">
                  <FadeImagePair images={imagePair} altBase={project.name} />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
