import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prismaClient'

export async function GET(req: NextRequest, {params} : {params: Promise<{ id: string}>}){
    const {id} = await params;

    const projectId = Number(id);
    if(!Number.isFinite(id)){
        return NextResponse.json({error: "Invalid project id"}, {status: 400});
    }

    const project = await prisma.project.findUnique({
        where: {id: projectId},
        select: {id: true, title: true, description: true, durationWeeks: true},
    });

    if(!project){
        return NextResponse.json({ error: "Project not found. Please return to the projects page"}, {status: 400});
    }
    return NextResponse.json(project);
}