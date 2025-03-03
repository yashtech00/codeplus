import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/db";
import { ProblemSchema } from "@/Schema/problem";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return NextResponse.json(
      {
        message: "Invalid User",
      },
      {
        status: 411,
      }
    );
  }

  try {
    const body = await req.json();

    const bodyParsed = ProblemSchema.safeParse(body);
    if (!bodyParsed) {
      return NextResponse.json(
        {
          message: "Invalid Inputs",
        },
        {
          status: 411,
        }
      );
    }
    const bodyData = bodyParsed.data;
    const newProblem = await prisma.problem.create({
      data: {
        title: bodyData?.title || "title",
        description: bodyData?.description || "description",
        inputDescription: bodyData?.inputDescription || "input",
        outputDescription: bodyData?.outputDescription || "output",
        difficulty: bodyData?.difficulty || "difficulty",
        companyName: bodyData?.companyName || ["[company Name]"],
        likeCount: bodyData?.likeCount || 0,
        dislikeCount: bodyData?.dislikeCount || 0,
      },
    });
    return NextResponse.json(
      {
        message: "Problem Created",
        newProblem,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Internal server error while posting a problem",
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return NextResponse.json(
      {
        message: "Invalid User",
      },
      {
        status: 411,
      }
    );
  }
  try {
    const problem = await prisma.problem.findMany();
    return problem;
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Internal server error while getting problems",
      },
      {
        status: 411,
      }
    );
  }
}
