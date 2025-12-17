
import { PrismaClient} from '@prisma/client';
import ProjectsClient from "./projectClient";
const prisma = new PrismaClient();

type SearchParams = {
  page?: string | string[];
};


export default async function ProjectsPage({searchParams,}: {searchParams: SearchParams}) {

  const page = Number(searchParams.page ?? 1);
  const limit = 10;
  const skip = (page - 1) * limit;
  
  const [projects, totalResults] = await Promise.all([
    prisma.project.findMany({
      skip, take: limit, orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, description: true, durationWeeks: true,
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
      <ProjectsClient initialProjects={projects}  totalResults={totalResults}  page={page}  totalPages={totalPages}/>
    </div>
  );
}
