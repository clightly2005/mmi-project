

export async function favProject(projectId: number, engineerId: number) {
  const res = await fetch("/api/projects/favourite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectId, engineerId }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) { throw new Error(data?.error ?? `HTTP ${res.status}`);}

  return data;
}
