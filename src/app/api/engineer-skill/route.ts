import { NextResponse } from "next/server";
import { PrismaClient, ProficiencyLevel } from "@prisma/client";

const prisma = new PrismaClient();

//get skill/proficiency for user engineer
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = Number(searchParams.get("userId"));

  if (!userId) { return NextResponse.json({error: "Missing userId parameter" },);}

  const skills = await prisma.engineerSkill.findMany({
    where: { userId },
    select: { id: true, proficiency: true,
      skill: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(skills);
}

//create/update engineer skill row
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const userId: number | undefined = body.userId;
    const skillName: string | undefined = body.skillName;
    const proficiencyRaw: string | undefined = body.proficiency;

    if (!userId || !skillName || !proficiencyRaw) { return NextResponse.json( { error: "Missing user id, skill name or proficiency" }, );}

    const proficiency = proficiencyRaw as ProficiencyLevel;

    //skill look up via name
    const skill = await prisma.skill.findUnique({ where: { name: skillName },});
    if (!skill) { return NextResponse.json({ error:  "Skill not found" }, { status: 400 });}

    //create by userId and skillId
    const newEngSkill = await prisma.engineerSkill.create({
      data: { userId, skillId: skill.id, proficiency,},
        include: { skill: true}
    });

    return NextResponse.json(newEngSkill);
  } catch (error: unknown) {
    console.error("Error in POST /api/engineer-skill:", error);
    return NextResponse.json({error: "Internal server error" },);
  }
}
