"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AssignButton({ projectId, userId, userName }: {
  projectId: number;
  userId: number;
  userName: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleAssign() {
    try {
      setLoading(true);
      
      console.log("Assign:", { projectId, userId });
      const res = await fetch(`/api/projects/${projectId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to assign engineer");
      }
      router.refresh(); //rerender
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" onClick={handleAssign} disabled={loading} className="text-sky-600 hover:text-sky-900 disabled:opacity-50 disabled:cursor-not-allowed">
      {loading ? "Assigning..." : "Assign"}
      <span className="sr-only">, {userName}</span>
    </button>
  );
}
