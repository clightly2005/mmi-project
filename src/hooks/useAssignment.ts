import { useEffect, useState } from "react";
//custom hook to fetch logged in user project assignments from API route and gives states to component to use

//types set for the expected API return so runtime mistakes are reduced
export type Assignment = {
  id: number;
  startDate: string;
  endDate: string;
  project: {
    title: string;
    durationWeeks: number;
  };
};

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
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error ?? `HTTP ${res.status}`);

        setAssignments(data as Assignment[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  return { assignments, loading, error };
}
