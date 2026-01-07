import { useUser } from "../hooks/useUser";
import { useAssignments } from "../hooks/useAssignment";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if(Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function AssignedModal({ onClose }: { onClose: () => void }){
    const user = useUser();
    const { assignments, loading, error } = useAssignments(user?.id);

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70  border border-white/10 shadow-2xl backdrop-blur.">
              <div className="w-full max-w-md overflow-hidden rounded-lg bg-modal shadow-lg">
                 <div className="p-6">
                    <div className="flex items-start justify-between">
                      <h2 className="mb-1 text-xl font-semibold text-white"> Assigned Projects</h2>
                     
                    </div>
                 
              <p className="mt-2 text-sm text-white/70"> Projects currently assigned to you: </p>
              <div className="mt-5">
                {loading ? (
                    <p className="text-white">Loading assignments...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : assignments.length === 0 ? (
                    <p className="text-white">You have no assigned projects.</p>
                ) : (
                    <ul className="space-y-3">
                        {assignments.map((assignment) => (
                            <li key={assignment.id} className="rounded border border-white/10 bg-neutral-900/80 p-4">
                              <p className="text-sm text-white/70">Project</p>
                              <p className="font-medium text-white">{assignment.project.title}</p>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-white/70">Start date</p>
                                    <p className="text-sm text-white">{formatDate(assignment.startDate)}</p>
                                  </div>  
                                  <div className="text-right">
                                    <p className="text-sm text-white/70">End date</p>
                                    <p className="text-sm text-white"> {formatDate(assignment.endDate)}</p>
                                  </div>  
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

            <div className="border-t border-white/10 bg-modal/95 p-4">
            <button onClick={onClose} className="w-full rounded bg-sky-600 px-3 py-2 text-sm text-white hover:bg-sky-700">
                Close
            </button>
            </div>
        </div>
     </div>
    );
}