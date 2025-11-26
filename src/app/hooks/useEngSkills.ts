"use client";
import { useEffect, useState } from "react";
import { EngSkill } from "../types/engSkills";

export function useEngSkills(userId?: string) {
    const [engSkill, setEngSkill] = useState <EngSkill[]>([]);
       
    useEffect(() => {
        if (!userId) return;
        async function fetchEngSkills(){
            const res = await fetch(`/api/engineerSkills?userId=${userId}`, { method: "GET",});
            const data = await res.json();
            setEngSkill(data);
            console.log(data);
        }
        fetchEngSkills();
    }, [userId]);
    return engSkill;
}