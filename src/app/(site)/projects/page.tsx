import ProjectRow, { type ProjectRowProps } from "../../components/ProjectRow";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ProjectsPage() {

  //get projects from db
  const projects =  await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
    },
  })

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold hero mb-2">All Projects</h1>
      <p className="hero">Search projects by Skill</p>

      <form action="/search" method="get" className="mt-3 mb-6 flex items-center gap-2">
        <input
          type="search" name="q" placeholder="Search..."
          className="border button-primary rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-600"
        />
        <button type="submit" className="button-secondary rounded px-4 py-2 text-white hover:bg-sky-900">
          Go
        </button>
      </form>

      {/* LIST */}
      <div className="space-y-4">
        {projects.map((project: any) => (
          <ProjectRow
          key={project.id}
          id={project.id}
          title={project.title}
          description={project.description}
          requiredSkills={[]} 
        />
        ))}
      </div>
    </div>
  );
}
