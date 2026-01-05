import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const projectId = Number(params.id);

  if (!Number.isInteger(projectId)) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      title: true,
      description: true,
      durationWeeks: true,
    },
  });

  if (!project) {
    return NextResponse.json( { error: "Project not found. Please return to the projects page" },{ status: 404 } );
  }

  return NextResponse.json(project);
}
