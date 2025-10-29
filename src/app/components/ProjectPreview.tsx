
interface Project {
  id: number;
  name: string;
  description: string;
  skillsRequired: string[];
} 

type ProjectsResponse = {
  items: Project[];
  total: number;
}

export default async function ProjectPreview() {
    //fixed below temp, need to redo when backend set up
    const base =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  //cached but reval every minute
  const res = await fetch(`${base}/api/projects?limit=3`, {
    next: { revalidate: 60},
  });

  if(!res.ok){
    return (
      <div className="rounded-lg border border-blue-50 p-4 text-blue-950">Failed to load projects</div>
    );
  }

  const data = (await res.json()) as ProjectsResponse;
  const projects = data.items ?? [];
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-blue-950 rounded-lg">
        <thead className="bg-menu text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Requirements</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <tr key={project.id} className="border-t hover:bg-green-50">
                <td className="p-3 font-semibold">{project.name}</td>
                <td className="p-3">{project.description}</td>
                <td className="p-3 text-gray-600">
                  {project.skillsRequired.join(", ")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-3 text-center text-blue-950">
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
