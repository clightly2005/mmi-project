"use client";
import { useEffect, useState, useCallback } from "react";
import { EngineerSkillWithSkill} from "@/types/engSkills"
//hook for getting engineer's skills for the skill modal so they can see what has been assigned already. 
//returns array of skills, loading flag while fetching, errors
export function useEngSkills(userId?: number) {
    const [skills, setSkills] = useState <EngineerSkillWithSkill[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    //reuse same func unless user id changes for re rendering comp
    const refresh = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        setError(null);
        try{
            const res = await fetch(`/api/engineer-skill?userId=${userId}`, { method: "GET",});
            if(!res.ok){ throw new Error("Failed to fetch engineer skills");};
            const skills = await res.json();
            setSkills(skills);
        }catch(error){
            console.log(error);
            setError("Error fetching engineer skills");
        }finally{
            setLoading(false);
        }
    }, [userId])
    useEffect(() => {
      
        refresh();
    },
    [refresh]);
    return { skills, loading, error, refresh };
}