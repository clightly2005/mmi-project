import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuth } from 'firebase-admin/auth';
import { adminApp } from '../../../lib/firebaseAdmin';

const prisma = new PrismaClient();


export async function POST(req: Request) {
    try {
        //get token from firebase
        const authHeader = req.headers.get('authorisation');
        const token = authHeader?.split("Bearer ")[1];
        if(!token){
            return NextResponse.json({error: "Token missing"}, {status: 401});
        }

        const decodedToken = await getAuth(adminApp).verifyIdToken(token);
        const email = decodedToken.email;
        const name = decodedToken.name;

        let user = await prisma.user.findUnique({ where: { email} });
        if(!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    role: "ENGINEER" //def role
                },
            });
        }
        return NextResponse.json(user);
    }
    catch (error: any) {
        console.error("Auth sync to DB error: ", error);
       return NextResponse.json({error: error.message }, {status: 500});
    }
}