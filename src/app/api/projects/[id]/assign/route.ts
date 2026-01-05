import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ Promise
) {
  const { id } = await params; // ✅ unwrap it
  console.log("ASSIGN params id =", id);

  const projectId = Number(id);
  if (!Number.isInteger(projectId)) {
    return NextResponse.json(
      { error: `Invalid project id (got: ${String(id)})` },
      { status: 400 }
    );
  }

  const body = await req.json().catch(() => null);
  const userId = Number(body?.userId);

  if (!Number.isInteger(userId)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  const now = new Date();

  const assignment = await prisma.projectAssignment.create({
    data: {
      projectId,
      userId,
      startDate: now,
      endDate: now,
    },
  });

  return NextResponse.json({ message: "Assigned", assignment }, { status: 201 });
}
