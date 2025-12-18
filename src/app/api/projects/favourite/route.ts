import { NextResponse } from "next/server";
import { PrismaClient} from '@prisma/client';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try{
        const { projectId, engineerId } = await req.json();

        const pid = Number(projectId);
        const eid = Number(engineerId);
        if(!Number.isFinite(pid) || !Number.isFinite(eid)){
            return NextResponse.json(
                { error: "Missing or invalid project/engineer ID"}, { status: 400});
        }
        try{
            await prisma.engineerFavProject.create({ data: { projectId: pid, engineerId: eid}, });
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
