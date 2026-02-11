'use client'

const projects = [
  {
    name: 'project name',
    description: 'A short description of what the project does and why it matters.',
    techStack: ['React', 'TypeScript', 'Node.js'],
  },
  {
    name: 'another project',
    description: 'Another brief description. Keep it to one or two lines.',
    techStack: ['Python', 'PostgreSQL'],
  },
  {
    name: 'a',
    description: 'Another brief description. Keep it to one or two lines.',
    techStack: ['Python', 'PostgreSQL'],
  },
  {
    name: 'anotect',
    description: 'Another brief description. Keep it to one or two lines.',
    techStack: ['Python', 'PostgreSQL'],
  },
  {
    name: 'anoject',
    description: 'Another brief description. Keep it to one or two lines.',
    techStack: ['Python', 'PostgreSQL'],
  },
  
  // Add more projects below:
  // { name: '...', description: '...', techStack: ['...'] },
]

export default function Projects() {
  return (
    <div className="w-full max-w-[640px] flex flex-col items-start pb-24 ml-[max(1rem,calc((100%-36rem)/2))]">
      {/* keep the column centered under Hero, but text left-aligned */}
      <ul className="flex flex-col gap-6 list-none p-0 m-0 w-108 max-w-[80%]">
        {projects.map((project) => (
          <li
            key={project.name}
            className="border-b border-zinc-300 pb-6 last:border-b-0 last:pb-0 w-full"
          >
            <h3 className="text-lg font-medium text-zinc-900 lowercase mb-1">
              {project.name}
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed lowercase mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs text-zinc-500 lowercase px-2 py-0.5 border border-zinc-300 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
