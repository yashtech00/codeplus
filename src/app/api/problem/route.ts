import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/db";
import { ProblemSchema } from "@/Schema/problem";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    const session = await getServerSession(authOptions)
    
    if (!session?.user.id) {
        return NextResponse.json({
            message:"Invalid User"
        }, {
            status:411
        })
    }

    try {
        const body = await req.json();

        const bodyParsed = ProblemSchema.safeParse(body)
        if (!bodyParsed) {
            return NextResponse.json({
                message:"Invalid Inputs"
            }, {
                status:411
            })
        }
        const bodyData = bodyParsed.data;
        const problem = await prisma.problem.create({
            data: {
                title:bodyData.title,
                description: bodyParsed.data,
                inputDescription: bodyParsed.data,
                outputDescription: bodyParsed.data,
                difficulty: bodyParsed.data,
                companyName: bodyParsed.data,
                likeCount: bodyParsed.data,
                dislikeCount: bodyParsed.data,
                submission: bodyParsed.data,
                testCase:bodyParsed.data
            }
        })
    } catch (e) {
        
    }
}