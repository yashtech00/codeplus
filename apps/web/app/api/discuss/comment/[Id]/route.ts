// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../../lib/auth-Options";
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../../../../db";

// export async function POST(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user.id) {
//     return NextResponse.json(
//       {
//         message: "You are not logged In",
//       },
//       {
//         status: 401,
//       }
//     );
//   }

    

//   try {
//     const { discussId, comment } = await req.json();

//     if (!comment) {
//       return NextResponse.json(
//         {
//           message: "Invalid comment data",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const newComment = await prisma.comment.create({
//       data: {
//         discussId,
//         comment: comment,
//         userId: session.user.id,
//         },
       
//     });

//     await prisma.discuss.update({
//       where: {
//         id: discussId,
//       },
//       data: {
//         commentCount: {
//           increment: 1,
//         },
//       },
//     });

//     return NextResponse.json(
//       {
//         message: "UpVote successfully",
//         discuss: newComment,
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json(
//       {
//         message: "Error while commenting",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// export async function GET(req: NextRequest, {params}:{params:{Id:string}}) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user.id) {
//     return NextResponse.json(
//       {
//         message: "You are not logged In",
//       },
//       {
//         status: 401,
//       }
//     );
//   }
//   const {Id} = params
//       // const { id } = await req.json();
//     // const url = new URL(req.url);
//     // const searchParams = new URLSearchParams(url.search);
//     // const id = searchParams.get("id");
//   try {
//     const comments = await prisma.comment.findMany({
//       where: {
//         discussId: Id ,
//       }, include: {
//         discuss: {
//           select: {
//             title:true,
//             description:true
//           }
//         }
//       }
//     });
//     return NextResponse.json(
//       {
//         message: "comments fetch successfully",
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json(
//       {
//         message: "Error while fetching",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
