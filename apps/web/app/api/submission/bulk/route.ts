import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth-Options";
import prisma from "../../../../db";



export async function GET(req:NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({
            message:"You are not logged in"
        }, {
            status:404
        })
    }

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const problemId = searchParams.get("problemId");

    if (!problemId) {
        return NextResponse.json({
            message : "Wrong Problem Id"
        }, {
            status:404
        })
    }

    const Submission = await prisma.submission.findMany({
        where: {
            problemId: problemId,
            userId: session?.user.id,
        },
        take: 10,
        include: {
            testCases: true,
        },
        orderBy: {
            createdAt:"desc",
        }
    })

    return NextResponse.json({
        Submission
    }, {
        status:200
    })
}