import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../db";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const problems = await prisma.problem.findMany({
      where: {
        hidden: false,
      },
      include: {
        defaultCode: true,
      },
    });
    return NextResponse.json(problems);
  } catch (err) {
    console.error("Internal server error in problems", err);
  }
}
