import { useEffect, useState } from "react";
import { Assignment } from "@/types/assignment"
//custom hook to fetch logged in user project assignments from API route and gives states to component to use

export function useAssignments(userId?: number) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        //queries assignmenets for authorised user and returns json
        const res = await fetch(`/api/project-assignment?userId=${userId}`);
        const assign = await res.json().catch(() => null);
        if (!res.ok) throw new Error(assign?.error ?? `HTTP ${res.status}`);

        setAssignments(assign as Assignment[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  return { assignments, loading, error };
}
