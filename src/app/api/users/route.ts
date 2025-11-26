import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { adminApp } from "../../lib/firebaseAdmin";
import { get } from "http";

const prisma = new PrismaClient();
const auth = getAuth(adminApp);

//creating users and adding to db
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
        return NextResponse.json(user);
    } 
    catch (err: unknown){
        if (err instanceof Error){
            return NextResponse.json({err: err.message},);
        }else{
            return NextResponse.json({err: "An unknown error occurred."});
        }     
    }
}

//get endpoint to find DB user by firebase id
export async function GET(req: Request){
    const authHeader = req.headers.get("Authorization");
    const idToken = authHeader?.split(" ")[1];
    const decoded = await getAuth(adminApp).verifyIdToken(idToken!);
    const user = await prisma.user.findUnique({
        where: { firebaseUid: decoded.uid, },
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