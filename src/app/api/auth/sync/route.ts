import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "firebase-admin/auth";
import { getAdminApp } from "../../../../lib/firebaseAdmin";

//ensures user exists on every page load with their auth etc
//returns up to date user record from db if skills etc changing

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    //get admin app
    const adminApp = getAdminApp();
    if (!adminApp) {
      console.error("Firebase Admin not configured (no service account)");
      return NextResponse.json(
        { error: "Server auth not configured" },
      );
    }

    const auth = getAuth(adminApp);

    //get token from header
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json({ error: "Token missing" });
    }

    //verify
    const decodedToken = await auth.verifyIdToken(token);

    //find user by fb uid
    let user = await prisma.user.findUnique({
      where: { firebaseUid: decodedToken.uid },
      include: {
        engineerRole: true,
        engineerSkill: {
          include: { skill: true },
        },
      },
    });

  

    //if not in db then create them with engineer as default.
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
      return NextResponse.json({ err: err.message });
    } else {
      return NextResponse.json(
        { err: "An unknown error occurred." },
      );
    }
  }
}
