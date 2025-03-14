import z from "zod";

export const discussSchema = z.object({
    title: z.string(),
    description: z.string(),
    upVote: z.number().optional(),
    downVote: z.number().optional(),
    comment:z.string().optional()
})