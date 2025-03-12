import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth-Options";
import prisma from "../../../db";



export async function POST(req:NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
        return NextResponse.json({
            message:"You are not logged In"
        }, {
            status:404
        })
    }

    const discussParsed = 
    const discuss = await prisma.discuss.create({
        data: {
            title:
        }
    })
}