"use client";
//hook for skill modal to get skill data
import { useState, useEffect } from "react";
import { Skill } from "@/types/skills";

export function useSkills() {
    const [skill, setSkill] = useState<Skill[]> ([]);

    useEffect(() => {
        async function fetchSkill(){
            const res = await fetch("/api/skills", { method: "GET",});

            const skillu = await res.json();
            setSkill(skillu);
            console.log(skillu);
        }
        fetchSkill();
    }, []);
    return skill;
}