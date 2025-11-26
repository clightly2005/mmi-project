import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuth } from 'firebase-admin/auth';
import { adminApp } from '../../../lib/firebaseAdmin';

const prisma = new PrismaClient();

//doing the secure park of verifying token as it needs to be server side and syncing to SQl.
//this is called on every page load to ensure user is in db
export async function POST(req: Request) {

    try {
        //get token from firebase
        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.split("Bearer ")[1];
        if(!token){
            return NextResponse.json({error: "Token missing"}, {status: 401});
        }

        //verify token
        const decodedToken = await getAuth(adminApp).verifyIdToken(token);

        //find user in db by firebase uid
        const user = await prisma.user.findUnique({ where: { firebaseUid: decodedToken.uid},
        include: {
            engineerRole: true,
            engineerSkill: {
            include: { skill: true }, 
        },}});

        //if not in db then create them with engineer as default.
        if(!user) {
            const user = await prisma.user.create({
                data: {
                    firebaseUid: decodedToken.uid,
                    email: decodedToken.email!,
                    name: decodedToken.name!,
                    role: "ENGINEER", 
                    engineerRoleId: null, 
                },
                select: {
                    email: true, name: true, role:true 
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
