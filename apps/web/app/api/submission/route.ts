import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth-Options";
import prisma from "../../../db";
import {SubmissionInput } from "@repo/common/zod";
import axios from "axios";
import { getProblem } from "../../../lib/problem";
import { LANGUAGE_MAPPING } from "../../../../../packages/common/language";

const JUDGE0_URI = "http://localhost:3001/submission-callback";

export async function POST(req: NextRequest) {
  const session: { user: { id: string } } | null = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "You must logged in to submit a problem",
      },
      {
        status: 401,
      }
    );
  }
  //TODO: Validate the submission input
  const submissionParsed = SubmissionInput.safeParse(await req.json());
  if (!submissionParsed.success) {
    return NextResponse.json(
      {
        message: "Invalid submission input",
      },
      {
        status: 400,
      }
    );
  }

  const dbProblem = await prisma.problem.findUnique({
    where: {
      id: submissionParsed.data.problemId,
    },
  });
  if (!dbProblem) {
    return NextResponse.json(
      {
        message: "Problem Not found",
      },
      {
        status: 404,
      }
    );
  }

  const problem = await getProblem(
    dbProblem.slug,
    submissionParsed.data.languageId
  );
  problem.fullBoilerPlate = problem.fullBoilerPlate.replace(
    "##USER_CODE_HERE##",
    submissionParsed.data.code
  );

  try {
    console.log("yash before response");
    
    const response = await axios.post(
      `${JUDGE0_URI}/submission/batch?base64_encoded=false `,
      {
        submissions: problem.inputs.map((input, index) => ({
          language_id: LANGUAGE_MAPPING[submissionParsed.data.languageId]?.judge0,
          source_code: problem.fullBoilerPlate,
          stdin: input,
          expected_output: problem.outputs[index],
          callback_url:
            "http://localhost:3001/submission-callback",
        })),
      }
    );
    console.log(response,"yash submission response");
    
  
    const submission = await prisma.submission.create({
      data: {
        userId: session.user.id,
        problemId: submissionParsed.data.problemId,
        languageId: LANGUAGE_MAPPING[submissionParsed.data.languageId]?.internal ?? 0,
        code: submissionParsed.data.code,
        FullCode: problem.fullBoilerPlate,
        status: "PENDING",
      },
    });
  
    await prisma.testCase.createMany({
      data: problem.inputs.map((input, index) => ({
         id:"2",// Assuming id can be generated like this
        judge0TrackingId: response.data[index].token,
        submissionId: submission.id,
        index: index,
        status: "PENDING",
      })),
    });
  
    return NextResponse.json({
      message: "Submission Successful",
      id: submission.id,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message:"Internal server error during submissions"
    }, {
      status:500
    })
    
  }

}

export async function GET(req:NextResponse) {

    const session: { user: { id: string } } | null = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({
            message:"You are not logged in"
        }, {
            status:404
        })
    }

    const Url = new URL(req.url);
    const searchParams = new URLSearchParams(Url.search);
    const submissionId = searchParams.get("id");

    if (!submissionId) {
        return NextResponse.json({
            message:"Invalid submission Id"
        }, {
            status:404
        })
    }

    const submission = await prisma.submission.findUnique({
        where: {
            id: submissionId,
            userId:session.user.id,
        },
    })

    if (!submission) {
        return NextResponse.json({
            message:"Submission not found"
        }, {
            status:404
        })
    }

    const testcase = await prisma.testCase.findMany({
        where: {
            submissionId:submissionId
        }

    })
    return NextResponse.json({
        submission,
        testcase
    }, {
        status:200
    })
}
