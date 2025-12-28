import { prisma } from '@/lib/prismaClient'
import ProjectsClient from "./projectClient";

//helper functions to make sure always get a safe page number 
function parsePage(page?: string | string[]) {
  const raw = Array.isArray(page) ? page[0] : page
  const num = Number(raw)
  return Number.isFinite(num) && num > 0 ? num : 1
}



type ProjectsPageProps = {
  searchParams?: { page?: string; q?: string;};
};

export default async function ProjectsPage({searchParams}: ProjectsPageProps) {
  const page = Number(searchParams?.page ?? 1);
  const query = searchParams?.q ?? "";

  const limit = 10;
  const skip = (page - 1) * limit;
  
  const [projects, totalResults] = await Promise.all([
    prisma.project.findMany({
      skip, take: limit, orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, description: true, durationWeeks: true, projectType: true,
        projectSkill: {
          select: { minLevel: true,
             skill: { select: { name: true },}
          },
        },
      },
    }),
    prisma.project.count(),
  ]);

  const totalPages = Math.ceil(totalResults / limit);

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold hero mb-2">All Projects</h1>
      <p className="hero">Search for a project by entering a Skill or Title</p>
      <ProjectsClient initialProjects={projects}  totalResults={totalResults}  currentPage={page}  totalPages={totalPages} query={query}/>
    </div>
  );
}
