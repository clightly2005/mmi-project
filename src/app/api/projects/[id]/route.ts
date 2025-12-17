import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, ctx: {params: { id: string}}){
    const id = Number(ctx.params.id);
    if(!Number.isFinite(id)){
        return NextResponse.json({error: "Invalid project id"}, {status: 400});
    }

    const project = await prisma.project.findUnique({
        where: {id},
        select: {id: true, title: true, description: true, durationWeeks: true},
    });

    if(!project){
        return NextResponse.json({ error: "Project not found. Please return to the projects page"}, {status: 400});
    }
    return NextResponse.json(project);
}