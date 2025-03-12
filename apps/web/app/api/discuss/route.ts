import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth-Options";
import prisma from "../../../db";
import { discussSchema } from "../../../lib/discuss-schema";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json(
      {
        message: "You are not logged In",
      },
      {
        status: 404,
      }
    );
  }

  try {
    const discussParsed = discussSchema.safeParse(await req.json());
    if (!discussParsed.success) {
      return NextResponse.json(
        {
          message: "Invalid data",
        },
        {
          status: 400,
        }
      );
    }
    const discuss = await prisma.discuss.create({
      data: {
        title: discussParsed.data.title,
        description: discussParsed.data.description,
        upVote: discussParsed.data.upVote,
        downVote: discussParsed.data.downVote,
        comment: discussParsed.data.comment,
        userId: session?.user?.id,
      },
    });
    return NextResponse.json(
      {
        message: "comment created successfully",
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json(
      {
        message: "You are not logged In",
      },
      {
        status: 404,
      }
    );
  }

  try {
    const discuss = await prisma.discuss.findMany({});
    return NextResponse.json(
      {
        message: "comment created successfully",
        discuss,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
