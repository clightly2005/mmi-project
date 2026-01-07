import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

//helper func for sho start date and computing estimated end date
function addWeeks(date: Date, weeks: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

export async function POST( req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 

  const projectId = Number(id);
  if (!Number.isInteger(projectId)) {
    return NextResponse.json( { error: `Invalid project id (got: ${String(id)})` },{ status: 400 });
  }

  const body = await req.json().catch(() => null);
  const engineerId = Number(body?.userId);
  if (!Number.isInteger(engineerId)) { return NextResponse.json({ error: "Invalid engineerId" }, { status: 400 });}

  //get project duration
  const project =  await prisma.project.findUnique({
    where: { id: projectId },
    select: { durationWeeks: true },
  });
  if (!project) { return NextResponse.json({ error: "Project not found" }, { status: 404 }); }

  const durationWeeks = Number(project.durationWeeks);
  if(!Number.isInteger(durationWeeks) || durationWeeks <= 0){ return NextResponse.json({ error: "Invalid project duration" }, { status: 400 }); }

  //engineers most recent assignment for stacking availability
  const last = await prisma.projectAssignment.findFirst({
    where: { userId: engineerId }, orderBy: { endDate: "desc" }, select: { endDate: true },
  });

  const now = new Date();
  const startDate = last?.endDate && last.endDate > now ? last.endDate : now;
  const endDate = addWeeks(startDate, durationWeeks);

  const assignment = await prisma.projectAssignment.create({
    data: {
      projectId,
      userId: engineerId,
      startDate: startDate,
      endDate: endDate,
    },
  });

  return NextResponse.json({ message: "Assigned", assignment }, { status: 201 });
}
