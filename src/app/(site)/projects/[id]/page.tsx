import { prisma } from "@/lib/prismaClient";
import { AssignButton } from "@/components/AssignButton";

const SCORE = {
  BEGINNER: 1,
  NOVICE: 2,
  INTERMEDIATE: 3,
  ADVANCED: 4,
  EXPERT: 5,
} as const;

type ProficiencyLevel = keyof typeof SCORE;

export default async function ProjectPage( { params }: { params: { id: string } }) {
  const { id } = params;

  const projectId = Number(id);
  if (!Number.isInteger(projectId)) { return <div className="max-w-5xl mx-auto px-4 py-6">Invalid project ID</div>;}

  //get skill details
  const project = await prisma.project.findUnique({
    where: { id: projectId },
      select: { id: true, title: true, description: true, durationWeeks: true,
      projectSkill: { orderBy: { id: "asc" }, 
        select: { skillId: true, minLevel: true,
          skill: { select: { name: true } },},},
    },
  });

  if (!project) { return <div className="max-w-5xl mx-auto px-4 py-6">Project not found</div>;}

  const mainSkill = project.projectSkill[0];

  //gets any engineers in db with a skill matching main skill to the project id currently being viewed
  const recommendedRows = mainSkill ? await prisma.engineerSkill.findMany({
        where: { skillId: mainSkill.skillId, user: { role: "ENGINEER" },},
        select: { proficiency: true, user: { select: { id: true, name: true, email: true } }, },
      })
    : [];

  //Rank by the proficiency level
  const recommended = recommendedRows.map((row) => {
      const proficiency = row.proficiency as ProficiencyLevel;
      return {
        userId: row.user.id,
        name: row.user.name,
        email: row.user.email,
        proficiency,
        score: SCORE[proficiency],
      };
    }).sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold hero"> Project title: <span className="text-sky-600">{project.title}</span></h1>
      <p className="mt-4 text-md hero"><span className="font-bold">Project summary:</span> {project.description}</p>
      <p className="mt-2 text-md hero"><span className="font-bold">Estimated effort:</span> {project.durationWeeks} Weeks</p>

      {mainSkill ? (
        <p className="mt-2 text-md hero">
          <span className="font-bold">Main required skill:</span>{" "}
          <span className="text-sky-600">{mainSkill.skill.name}</span>{" "}
          <span className="text-slate-600">({mainSkill.minLevel})</span>
        </p>
      ) : (
        <p className="mt-2 text-md hero text-slate-600"><span className="font-bold">Main required skill: </span>None specified</p>
      )}

      <h2 className="mt-10 text-xl font-bold hero">Recommended engineers</h2>
      {!mainSkill ? (
        <p className="mt-2 text-slate-600"> Add a required skill to see recommendations. </p>
      ) : recommended.length === 0 ? (
        <p className="mt-2 text-slate-600">No engineers found with{" "}<span className="font-semibold">{mainSkill.skill.name}</span>.</p>
      ) : (
        <div className="mt-4 p-2 overflow-x-auto">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full border text-sm relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
              <thead className="bg-slate-900">
                <tr>
                  <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3 dark:text-white">Rank</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Engineer</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Proficiency</th>
                  <th className="py-3.5 pr-4 pl-3 text-right text-sm font-semibold text-gray-900 sm:pr-3 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900">
                {recommended.map((e, idx) => (
                  <tr key={e.userId}>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-3 dark:text-white">{idx + 1}</td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">{e.name}</td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">{e.email}</td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">{e.proficiency}</td>
                    <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-3">
                      <AssignButton projectId={projectId} userId={e.userId} userName={e.name}></AssignButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        </div>
      )}
    </div>
  );
}
