"use client";
import { useEffect, useState, useCallback } from "react";

export type EngineerSkillWithSkill = {
    id: number;
    proficiency: string;
    skill:{ id: number; name: string; };
};

export function useEngSkills(userId?: number) {
    const [skills, setSkills] = useState <EngineerSkillWithSkill[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const refresh = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        setError(null);
        try{
            const res = await fetch(`/api/engineerSkills?userId=${userId}`, { method: "GET",});
            if(!res.ok){ throw new Error("Failed to fetch engineer skills");};
            const data = await res.json();
            setSkills(data);
        }catch(error){
            setError("Error fetching engineer skills"), error;
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