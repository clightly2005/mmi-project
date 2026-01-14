//for favouriting a project as an engineer - used by handle favourite in project row
export async function favProject(projectId: number, engineerId: number) {
  const res = await fetch(`/api/projects/${projectId}/favourite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({engineerId }),
  });

  const proj = await res.json().catch(() => ({}));

  if (!res.ok) { throw new Error(proj?.error ?? `HTTP ${res.status}`);}

  return proj;
}
