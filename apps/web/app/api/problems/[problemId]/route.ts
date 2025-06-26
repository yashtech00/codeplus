import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../db";


// This runs when a GET request is made to /api/problem/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const problemId = params.id;
  console.log(problemId,"backend problem id");
  
  try {
    const problem = await prisma.problem.findFirst({
      where: { id: problemId },
      include: { defaultCode: true },
    });

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    return NextResponse.json(problem);
  } catch (err) {
    console.error("Internal server error in problem", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
