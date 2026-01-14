import { prisma } from "@/lib/prismaClient";
import ProjectsClient from "./(list)/projectClient";

//this server component fetches for one page of 10 projects, and passes to proj client to display.
//I need to change it so that search is not a client comp as currently since onyl 10 projects are passed te sreach can filter on jsut those at any one time

//helper function to always get a safe page number
function parsePage(page?: string | string[]) {
  const raw = Array.isArray(page) ? page[0] : page;
  const num = Number(raw);
  return Number.isFinite(num) && num > 0 ? num : 1;
}

type ProjectsPageProps = { searchParams?: Promise<{ page?: string; q?: string }>; };

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const limit = 10;
  const sp = await searchParams;
  const page = parsePage(sp?.page);
  const query = sp?.q ?? "";

  const totalResults = await prisma.project.count();
  const totalPages = Math.max(1, Math.ceil(totalResults / limit));

  const safePage = Math.min(page, totalPages);
  const skip = (safePage - 1) * limit;
  //fetch records for this page and newest projects come first 
  const projects = await prisma.project.findMany({ skip, take: limit,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, description: true, durationWeeks: true, projectType: true,
        projectSkill: { select: { minLevel: true,
            skill: { select: { name: true } },},},
        projectAssignment: { orderBy: { startDate: "desc" },
           select: { user: { select: { name: true } },},},
      },
    });

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold hero mb-2">All Projects</h1>
      <p className="hero">Search for a project by entering a Skill or Title</p>

      <ProjectsClient initialProjects={projects} totalResults={totalResults} currentPage={safePage} totalPages={totalPages} query={query}  />
    </div>
  );
}
