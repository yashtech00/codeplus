import prisma from "."


export const  getComment=async(commentId:string)=> {
    
    const comment = await prisma.comment.findMany({
        where: {
            id:commentId
        }
    })
    
}
