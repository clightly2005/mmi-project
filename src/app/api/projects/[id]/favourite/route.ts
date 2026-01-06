import { NextResponse } from "next/server";
import { Prisma} from '@prisma/client';
import { prisma } from '@/lib/prismaClient'

export async function POST(req: Request, { params}: {params: { id: string}}) {
    try{
        const projectId = Number(params.id);
        const { engineerId } = await req.json();
        const eid = Number(engineerId);
        if(!Number.isInteger(projectId) || !Number.isInteger(eid)){
            return NextResponse.json({ error: "Missing or invalid project/engineer ID"}, { status: 400});
        }
        try{
            await prisma.engineerFavProject.create({ data: { projectId, engineerId: eid}, });
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
