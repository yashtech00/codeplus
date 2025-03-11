import z from "zod";  

export const SubmissionCallback = z.object({  
  stdout: z.string().optional().nullable(), // Optional and can be null  
  time: z.string().optional().nullable(),   // Optional and can be null  
  memory: z.number().optional().nullable(),  // Optional and can be null  
  stderr: z.string().optional().nullable(),  // Optional and can be null  
  token: z.string(),                         // Required string  
  compile_output: z.string().optional().nullable(), // Optional and can be null  
  message: z.string().optional().nullable(), // Optional and can be null  
  status: z.object({  
    id: z.string(),                          // Required string  
    description: z.enum([                    // Required enum  
      "Accepted",  
      "Rejected",  
      "Runtime Error (NZEC)",  
      "Compilation Error",  
      "Time Limit Exceeded",  
      "Memory Limit Exceeded",  
      "Wrong Answer",  
    ]),  
  }),  
});  