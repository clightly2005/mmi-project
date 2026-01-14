
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getAdminApp } from "@/lib/firebaseAdmin";

const prisma = new PrismaClient();

//post for when first sign up or sign in to make user in db with token
export async function POST(request: NextRequest) {
  console.log("/api/users called");

  try {
    const adminApp = getAdminApp();
    if (!adminApp) {
      console.error("Firebase Admin not configured (no service account)");
      return NextResponse.json(
        { error: "Server auth not configured" }
      );
    }
    //auth instance for app
    const auth = getAuth(adminApp);

    //extract and verify token
    const authHeader = request.headers.get("Authorization");
    console.log("Auth header:", authHeader);

    if (!authHeader?.startsWith("Bearer ")) {
      console.log("Missing token");
      return NextResponse.json({ error: "Unauthorized" });
    }

    const idToken = authHeader.split(" ")[1];
    //verify and decode token
    const decoded = await auth.verifyIdToken(idToken);
    console.log("Firebase token decoded");

    const { uid, email } = decoded;

    if (!uid || !email) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    //create user in db
    const user = await prisma.user.create({
      data: {
        firebaseUid: uid,
        email,
        name: email.split("@")[0],
        role: "ENGINEER",
      },
    });
    //return user as json
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

//get for find Db user by their specific firebase id
export async function GET(req: NextRequest) {
  const adminApp = getAdminApp();

  if (!adminApp) {
    console.error("Firebase Admin not configured (no service account)");
    return NextResponse.json(
      { error: "Server auth not configured" },
    );
  }

  const auth = getAuth(adminApp);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];
  //verify and get uid
  const decoded = await auth.verifyIdToken(idToken!);

  //look up user and include data related to them like role for modals
  const user = await prisma.user.findUnique({
    where: { firebaseUid: decoded.uid },
    include: {
      engineerRole: true,
      engineerSkill: { include: { skill: true, },},
    },
  });
  //return user as json
  return NextResponse.json(user);
}
