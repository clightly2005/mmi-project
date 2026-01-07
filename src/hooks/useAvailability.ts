import { useMemo } from "react";
import { useAssignments } from "./useAssignment";

export function useAvailability(userId?: number) {
  const { assignments } = useAssignments(userId);

  return useMemo(() => {
    if (!assignments.length) return "Available now";

    const last = Math.max(...assignments.map(a => new Date(a.endDate).getTime()));
    const weeks = Math.max(0, Math.ceil((last - Date.now()) / (1000 * 60 * 60 * 24 * 7)));

    return weeks === 0 ? "Available now" : `Available in ${weeks} week${weeks === 1 ? "" : "s"}`;
  }, [assignments]);
}
