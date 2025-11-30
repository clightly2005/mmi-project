import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, ProficiencyLevel } from "@prisma/client";

const prisma = new PrismaClient();

///makes duration string into number of weeks
function durationToWeeks(duration: string): number {
    const match = duration.match(/(\d+)/);
    if(!match) return 1;
    return Number(match[1]);
}

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const { ownerId, title, description, duration, skillName, proficiency,
        } = body as { ownerId?: number; title?: string; description?: string; duration?: string; skillName?: string; proficiency?: string;};

        if(!ownerId || !title || !description || !duration || !skillName || !proficiency){
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const durationWeeks = durationToWeeks(duration);
        const skill = await prisma.skill.findUnique({ where: { name: skillName },});
        if(!skill){ return NextResponse.json({ error: "Skill not found" }, { status: 400 }); }

        const enumProficiency = proficiency.toUpperCase() as ProficiencyLevel;
        const project = await prisma.project.create({ data: { ownerId, title, description, durationWeeks, projectSkill: {
                create: { skillId: skill.id, minLevel: enumProficiency}, },},
                include: { projectSkill: { include: { skill: true}
            }, 
        },
        });
        return NextResponse.json(project);
         } catch (error) {
        console.error("Error in POST /api/projects:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
