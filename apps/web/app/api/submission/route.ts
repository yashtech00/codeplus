import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth-Options";
import prisma from "../../../db/db";
// import { SubmissionInput } from "@repo/common/zod";
import axios from "axios";
import { getProblem } from "../../../lib/problem";

const JUDGE0_URI = process.env.JUDGE0_URI ?? "http://localhost:3000";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
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
  const submissionInput = await req.json();
  if (!submissionInput) {
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
      id: submissionInput.data.problemId,
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
    submissionInput.data.languageId
  );
  problem.fullBoilerPlate = problem.fullBoilerPlate.replace(
    "##USER_CODE_HERE##",
    submissionInput.data.code
  );

  const response = await axios.post(
    `${JUDGE0_URI}/submissions/batch?base64_encoded=false `,
    {
      submissions: problem.inputs.map((input, index) => ({
        language_id: LANGUAGE_MAPPING[submissionInput.data.languageId]?.judgge0,
        source_code: problem.fullBoilerPlate,
        stdin: input,
        expected_output: problem.outputs[index],
        callback_url:
          process.env.JUDGE0_CALLBACK_URL ??
          "http://localhost:3001/submission-webhook/submission-callback",
      })),
    }
  );

  const submission = await prisma.submission.create({
    data: {
      userId: session.user.id,
      problemId: submissionInput.data.problemId,
      languageId: LANGUAGE_MAPPING[submissionInput.data.languageId]?.internal,
      code: submissionInput.data.code,
      FullCode: problem.fullBoilerPlate,
      status: "PENDING",
    },
  });

  await prisma.testCase.createMany({
    data: problem.inputs.map((input, index) => ({
      id: `${submission.id}-${index}`, // Assuming id can be generated like this
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
}

export async function GET(req:NextResponse) {

    const session = await getServerSession(authOptions);
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
