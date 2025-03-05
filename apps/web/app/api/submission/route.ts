import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth-Options";
import prisma from "../../../db/db";
// import { SubmissionInput } from "@repo/common/zod";



export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({
            message:"You must logged in to submit a problem",
        }, {
            status:401,
        })
    }

    const submissionInput = await  req.json();
    if(!submissionInput) {
        return NextResponse.json({
            message:"Invalid submission input",
        }, {
            status:400,
        })
    }

    const dbProblem = await prisma.problem.findUnique({
        where: {
            id:submissionInput.data.problemId,
        }
    })
    if (!dbProblem) {
        return NextResponse.json({
            message:"Problem Not found"
        }, {
            status:404
        })
    }

    const problem = await getProblem(
        dbProblem.slug,
        submissionInput.data.languageId,
    );
    problem.fullBoilerPlate = problem.fullBoilerPlate.replace(
        "##USER_CODE_HERE##",
        submissionInput.data.code,
    )

    const response = await .post(
         
    )
}