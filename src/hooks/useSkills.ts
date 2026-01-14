"use client";
//hook for skill modal to get skill data
import { useState, useEffect } from "react";
import { Skill } from "@/types/skills";

export function useSkills() {
    const [skill, setSkill] = useState<Skill[]> ([]);

    useEffect(() => {
        async function fetchSkill(){
            const res = await fetch("/api/skills", { method: "GET",});

            const data = await res.json();
            setSkill(data);
            console.log(data);
        }
        fetchSkill();
    }, []);
    return skill;
}