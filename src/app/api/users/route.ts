import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { adminApp } from "../../lib/firebaseAdmin";
import { get } from "http";

const prisma = new PrismaClient();
const auth = getAuth(adminApp);

export async function POST(request: Request){
    console.log("/api/users called");
    try {
        //extracts and verifies token
        const authHeader = request.headers.get("Authorization");
         console.log("Auth header:", authHeader);

        if(!authHeader?.startsWith("Bearer ")){
            console.log("Missing token");
            return NextResponse.json({error: "Unauthorised"}, {status: 401});
        }
        const idToken = authHeader.split(" ")[1];
        const decoded = await auth.verifyIdToken(idToken);
         console.log("Firebase token decoded");
        const {uid, email} = decoded;

        //ask firebase if token is real
        if (!uid ||!email) {
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }
        //insert user into db
        const user = await prisma.user.create({
            data: {
                firebaseUid: uid,
                email: email!,
                name: email!.split("@")[0],
                role: "ENGINEER",
            },
        });
        return NextResponse.json({success: true, user});
    } 
    catch (error:any) {
        console.log("Error creating user:", error);
        return NextResponse.json({error: "Unauthorised token"});
    }
}