import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "firebase-admin/auth";
import { adminApp } from "../../lib/firebaseAdmin";

const prisma = new PrismaClient();

export async function POST(req: Request){
    
}