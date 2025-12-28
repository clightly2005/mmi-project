//using prisma to write /read from mysql

import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prismaClient'


//for getting skills from skill table
export async function GET(){
    const skills = await prisma.skill.findMany({
        select:{ id: true, name: true,},
    });
    return NextResponse.json( skills );
}