import { NextResponse } from "next/server";
import { Prisma} from '@prisma/client';
import { prisma } from '@/lib/prismaClient'

//route for when an engineer favourites a project. this needs to be added into the algorithm that matches engineers or have a notificationt os ay you must add this skill as a beginner atleast to fav it
export async function POST(req: Request, { params}: {params: Promise<{ id: string}>}) {
    try{
        const {id} = await params;
        const projectId = Number(id);
        const body = await req.json().catch(() => null);
        const engineerId = Number(body?.engineerId);

        if(!Number.isInteger(projectId) || !Number.isInteger(engineerId)){
            return NextResponse.json({ error: "Missing or invalid project/engineer ID"}, { status: 400});
        }
        try{
            await prisma.engineerFavProject.create({ data: { projectId, engineerId: engineerId}, });
        } catch(err: unknown){
            if( err instanceof Prisma.PrismaClientKnownRequestError)
            //already favourited it
            if(err?.code !== "P2002") throw err;
        }
    return NextResponse.json({message: "OK"}, {status: 200});
    } catch(error){
        console.error("Error favouriting project:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });  
    }
}
