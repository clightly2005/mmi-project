import ProjectRow, { type ProjectRowProps } from "../../components/ProjectRow";

const demo: ProjectRowProps[] = [
  {
    id: 1,
    title: "Automation Script",
    description: "Fix vCenter automation for license certificates.",
    requiredSkills: [
      { name: "Python", minProf: "Intermediate" },
      { name: "SQL", minProf: "Intermediate" },
    ],
    durationLabel: "1 week",
  },
  {
    id: 2,
    title: "Infra-as-Code Pipeline",
    description: "Build a CDK pipeline and database for the analytics team.",
    requiredSkills: [
      { name: "TypeScript", minProf: "Beginner" },
      { name: "AWS CDK", minProf: "Beginner" },
    ],
    durationLabel: "1 month",
  },
];

export default function ProjectsPage() {
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
        {demo.map(p => <ProjectRow key={p.id} {...p} />)}
      </div>
    </div>
  );
}
