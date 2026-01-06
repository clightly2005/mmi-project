import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function POST( req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 

  const projectId = Number(id);
  if (!Number.isInteger(projectId)) {
    return NextResponse.json( { error: `Invalid project id (got: ${String(id)})` },{ status: 400 });
  }

  const body = await req.json().catch(() => null);
  const engineerId = Number(body?.engineerId);

  if (!Number.isInteger(engineerId)) { return NextResponse.json({ error: "Invalid engineerId" }, { status: 400 });}

  const now = new Date();

  const assignment = await prisma.projectAssignment.create({
    data: {
      projectId,
      userId: engineerId,
      startDate: now,
      endDate: now,
    },
  });

  return NextResponse.json({ message: "Assigned", assignment }, { status: 201 });
}
