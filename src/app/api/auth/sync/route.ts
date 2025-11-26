import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "firebase-admin/auth";
import { getAdminApp } from "../../../lib/firebaseAdmin";

const prisma = new PrismaClient();

// doing the secure part of verifying token as it needs to be server side and syncing to SQL.
// this is called on every page load to ensure user is in db
export async function POST(req: Request) {
  try {
    // Get Firebase Admin app
    const adminApp = getAdminApp();
    if (!adminApp) {
      console.error("Firebase Admin not configured (no service account)");
      return NextResponse.json(
        { error: "Server auth not configured" },
        { status: 500 }
      );
    }

    const auth = getAuth(adminApp);

    // get token from firebase (from Authorization header)
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json({ error: "Token missing" }, { status: 401 });
    }

    // verify token
    const decodedToken = await auth.verifyIdToken(token);

    // find user in db by firebase uid
    let user = await prisma.user.findUnique({
      where: { firebaseUid: decodedToken.uid },
      include: {
        engineerRole: true,
        engineerSkill: {
          include: { skill: true },
        },
      },
    });

    // if not in db then create them with engineer as default.
    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: decodedToken.uid,
          email: decodedToken.email!,
          name: decodedToken.name ?? decodedToken.email!.split("@")[0],
          role: "ENGINEER",
          engineerRoleId: null,
        },
        include: {
          engineerRole: true,
          engineerSkill: {
            include: { skill: true },
          },
        },
      });
    }

    return NextResponse.json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ err: err.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { err: "An unknown error occurred." },
        { status: 500 }
      );
    }
  }
}
