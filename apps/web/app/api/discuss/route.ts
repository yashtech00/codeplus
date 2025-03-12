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
        status: 401,
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
        status: 401,
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

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json(
      {
        message: "You are not logged In",
      },
      {
        status: 401,
      }
    );
  }

//   const url = new URL(req.url);
//   const searchParams = new URLSearchParams(url.search);
    //   const discussId = searchParams.get("id");
    const { id } = await req.json();

  try {
    const updatedDiscuss = await prisma.discuss.update({
      where: {
        id
      },
      data: {
        upVote: {
          increment: 1,
        },
      },
    });
    return NextResponse.json(
      {
        message: "UpVote successfully",
        discuss: updatedDiscuss,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Error while upvoting",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json(
      {
        message: "You are not logged In",
      },
      {
        status: 401,
      }
    );
  }

  const { id } = await req.json();

  try {
    const updatedDiscuss = await prisma.discuss.update({
      where: {
        id
      },
      data: {
        downVote: {
          increment: 1,
        },
      },
    });
    return NextResponse.json(
      {
        message: "downVote successfully",
        discuss: updatedDiscuss,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Error while downVoting",
      },
      {
        status: 500,
      }
    );
  }
}

