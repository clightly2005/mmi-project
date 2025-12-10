import { useEffect, useState } from "react";

type Assignment = { 
    id: number;
    endDate: string;
    project: {
        title: string;
        durationWeeks: number;
    }
};

export function useAvailability(userId?: number){
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        if(!userId) return;

        (async () => {
            try{
                const res = await fetch(`/api/projectAssignment?userId=${userId}`);
                const data: Assignment[] = await res.json();

                //if no assignments, available now
                if(!data.length){ setTime("Available now"); return; }

                const last = Math.max(...data.map(a => new Date(a.endDate).getTime()));
                const weeks = Math.max(0, Math.ceil((last - Date.now()) / (1000 * 60 * 60 * 24 * 7)));

                setTime(weeks === 0 ? "Available now" : `Available in ${weeks} week${weeks === 1 ? "" : "s" }`);
            }
            catch (err: unknown){
                if (err instanceof Error){
                    console.log(err.message);
                }else{
                    console.log("An unknown error occurred.", err);
                 }     
            }
        })();
    }, [userId]);
    return time;
}