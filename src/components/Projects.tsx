'use client'

type Project = {
  name: string
  description: string
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
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
    repoUrl: 'https://github.com/barry-xie/knot'
  },
  {
    name: 'Markey',
    description: 'ML-powered 3D-printed firearm identification layer',
    techStack: ['Next.js', 'FastAPI', 'Hugging Face', 'Node.js','g-code', 'cura', 'ngrok', 'vast.ai'],
    liveUrl: 'https://devpost.com/software/markey-us2qxz',
    repoUrl: 'https://github.com/aykk/markey'
  },
  {
    name: 'Lifeline',
    description: 'Context-aware voice-trigger system to alert to your friends, loved ones, and authorities',
    techStack: ['Next.js', 'Node.js', 'bland-api', 'Supabase', 'Vercel'],
    liveUrl: 'https://devpost.com/software/clarify-nqv5zy',
    repoUrl: 'https://github.com/aykk/lifeline'
  },

  // Add more projects below. Optional: liveUrl, repoUrl (open in new tab).
  // { name: '...', description: '...', techStack: ['...'], liveUrl: '...', repoUrl: '...' },
]

const projectNameClass =
  'project-link text-2xl text-zinc-600 font-medium cursor-pointer hover:text-zinc-900 inline-block'
const projectMetaLinkClass =
  'text-[15px] text-zinc-500 hover:text-zinc-700 underline decoration-zinc-300 underline-offset-4 decoration-1 transition-colors'

export default function Projects() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <ul className="projects-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 list-none p-0 m-0">
        {projects.map((project) => {
          const titleHref = project.liveUrl || project.repoUrl || '#'
          const hasLiveUrl = !!project.liveUrl
          const hasRepoUrl = !!project.repoUrl

          return (
            <li
              key={project.name}
              className="project-card border border-zinc-200 rounded-lg p-5 bg-[#f6f4f3] hover:border-zinc-300 hover:bg-[#f9f8f7] transition-colors duration-300"
            >
              <h3 className="text-lg font-medium mb-1">
                <a
                  href={titleHref}
                  target={titleHref === '#' ? undefined : '_blank'}
                  rel={titleHref === '#' ? undefined : 'noopener noreferrer'}
                  className={projectNameClass}
                  data-project-link
                  onClick={titleHref === '#' ? (e) => e.preventDefault() : undefined}
                >
                  {project.name}
                </a>
              </h3>
              <div className="my-3 flex justify-center" aria-hidden>
                <span className="block h-px w-4/5 bg-zinc-200" />
              </div>
              {(hasLiveUrl || hasRepoUrl) && (
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 lowercase">
                  {hasLiveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={projectMetaLinkClass}
                    >
                      live
                    </a>
                  )}
                  {hasRepoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={projectMetaLinkClass}
                    >
                      github
                    </a>
                  )}
                </div>
              )}
              <p className="text-sm text-zinc-600 leading-relaxed lowercase mb-3">
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
            </li>
          )
        })}
      </ul>
    </div>
  )
}
