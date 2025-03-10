import express, { Request, Response } from 'express';  
import { SubmissionCallback } from "@repo/common/zod";  
import prisma from './db';  
import { outputMapping } from './outputMapping';  

const app = express();  
app.use(express.json());  

app.put('/submission-callback', async (req: Request, res: Response) => {  
    console.log("yash before parsed");  

    const parsedBody = SubmissionCallback.safeParse(req.body);  
    console.log(parsedBody, "yash parsed");  

    if (!parsedBody.success) {  
        console.error("Validation failed:", parsedBody.error);  
        return res.status(400).json({  
            message: "Invalid Inputs",  
            errors: parsedBody.error,  
        });  
    }  

    try {  
        // Check if the TestCase exists  
        const existingTestCase = await prisma.testCase.findUnique({  
            where: {  
                judge0TrackingId: parsedBody.data.token,  
            },  
        });  

        if (!existingTestCase) {  
            console.error("No TestCase found with the given judge0TrackingId:", parsedBody.data.token);  
            return res.status(404).json({  
                message: "TestCase Not Found",  
            });  
        }  

        // Proceed with the update if the TestCase exists  
        const testCase = await prisma.testCase.update({  
            where: {  
                judge0TrackingId: parsedBody.data.token,  
            },  
            data: {  
                status: outputMapping[parsedBody.data.status.description],  
                time: Number(parsedBody.data.time),  
                memory: Number(parsedBody.data.memory),  
            },  
        });  

        // Continue with the rest of your logic...  

        res.send("Received");  
    } catch (e) {  
        console.error("An error occurred: ", e);  
        res.status(500).send("Internal Server Error");  
    }  
});  
app.listen(process.env.PORT || 3001, () => {  
    console.log(`Submission webhook is running on port ${process.env.PORT || 3001}`);  
});  