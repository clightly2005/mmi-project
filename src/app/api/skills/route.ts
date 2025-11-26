//using prisma to write /read from mysql

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//for getting skills from skill table
export async function GET(){
    const skills = await prisma.skill.findMany({
        select:{ id: true, name: true,},
    });
    return NextResponse.json( skills );
}