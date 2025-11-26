// src/app/api/users/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getAdminApp } from "../../lib/firebaseAdmin";

const prisma = new PrismaClient();

// POST: create user in DB from Firebase token
export async function POST(request: NextRequest) {
  console.log("/api/users called");

  try {
    const adminApp = getAdminApp();

    if (!adminApp) {
      console.error("Firebase Admin not configured (no service account)");
      return NextResponse.json(
        { error: "Server auth not configured" },
        { status: 500 }
      );
    }

    const auth = getAuth(adminApp);

    // extract and verify token
    const authHeader = request.headers.get("Authorization");
    console.log("Auth header:", authHeader);

    if (!authHeader?.startsWith("Bearer ")) {
      console.log("Missing token");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.split(" ")[1];
    const decoded = await auth.verifyIdToken(idToken);
    console.log("Firebase token decoded");

    const { uid, email } = decoded;

    if (!uid || !email) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // insert user into db
    const user = await prisma.user.create({
      data: {
        firebaseUid: uid,
        email,
        name: email.split("@")[0],
        role: "ENGINEER",
      },
    });

    return NextResponse.json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("POST /api/users error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    console.error("POST /api/users unknown error:", err);
    return NextResponse.json(
      { error: "An unknown error occurred." },
      { status: 500 }
    );
  }
}

// GET: find DB user by firebase id
export async function GET(req: NextRequest) {
  const adminApp = getAdminApp();

  if (!adminApp) {
    console.error("Firebase Admin not configured (no service account)");
    return NextResponse.json(
      { error: "Server auth not configured" },
      { status: 500 }
    );
  }

  const auth = getAuth(adminApp);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const idToken = authHeader.split(" ")[1];
  const decoded = await auth.verifyIdToken(idToken!);

  const user = await prisma.user.findUnique({
    where: { firebaseUid: decoded.uid },
    include: {
      engineerRole: true,
      engineerSkill: {
        include: {
          skill: true,
        },
      },
    },
  });

  return NextResponse.json(user);
}
