//api endpoint to return users project assignments to compute availability
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prismaClient'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));
    if(!userId) return NextResponse.json({ error: "Missing userId parameter" },  { status: 400 });

    const assignments = await prisma.projectAssignment.findMany({
        where: { userId},
        orderBy: { startDate: "asc" },
        select: {id: true, startDate: true,endDate: true, project: { select: { title: true, durationWeeks: true } } },
    });
    return NextResponse.json(assignments);
}