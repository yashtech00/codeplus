import { z } from "zod"

export const  ProblemSchema = z.object({
    title: z.string(),
    description: z.string(),
    inputDescription: z.string(),
    outputDescription: z.string(),
    difficulty: z.string(),
    companyName:z.string().array(),
    likeCount: z.number(),
    dislikeCount: z.number(),
    submission: z.number().optional(),
    testcase:z.number()
})