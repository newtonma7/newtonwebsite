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
    name: 'Rotrack',
    description: 'Full-stack web app for productivity tracking and goal management',
    techStack: ['React.js', 'Express.js', 'MongoDB', 'Docker'],
  },
  {
    name: 'Trendr',
    description: 'Tinder-esque web application for finding personal style and archiving outfits',
    techStack: ['React.js', 'Django','MongoDB', 'Docker'],
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
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <ul className="projects-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 list-none p-0 m-0">
        {projects.map((project) => {
          const href = project.liveUrl || project.repoUrl || '#'
          const showCodeLink = !!(project.liveUrl && project.repoUrl)

          return (
            <li
              key={project.name}
              className="border border-zinc-200 rounded-lg p-5 bg-[#f6f4f3] hover:border-zinc-300 hover:bg-[#f9f8f7] transition-colors duration-300"
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
            </li>
          )
        })}
      </ul>
    </div>
  )
}
