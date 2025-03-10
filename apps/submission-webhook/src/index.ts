import express, { Request, Response } from 'express';  
import { SubmissionCallback } from "@repo/common/zod";  
import prisma from './db';  
import { outputMapping } from './outputMapping';  

const app = express();  
app.use(express.json());  

// Handle both POST and PUT requests for /submission-callback  
app.post('/submission-callback', async (req: Request, res: Response) => {  
    console.log("Handling POST request");  

    // Extract relevant fields  
    const { judge0TrackingId, submissionId, status, time, memory } = req.body;  

    if (!judge0TrackingId || !submissionId || !status) {  
        return res.status(400).json({  
            message: "Missing required fields: judge0TrackingId, submissionId, or status."  
        });  
    }  

    try {  
        // Check if the test case already exists  
        const existingTestCase = await prisma.testCase.findUnique({  
            where: { judge0TrackingId },  
        });  

        if (existingTestCase) {  
            console.log("Test case exists, updating...");  

            // If it exists, handle it with the PUT logic  
            const updatedTestCase = await prisma.testCase.update({  
                where: { judge0TrackingId },  
                data: {  
                    status: outputMapping[status], // Map the status if necessary  
                    time: time || 0,  
                    memory: memory || 0,  
                }  
            });  

            // Additional logic if needed after updating...  

            return res.status(200).json(updatedTestCase);  
        } else {  
            console.log("Test case does not exist, creating...");  

            // If it does not exist, create a new test case  
            const newTestCase = await prisma.testCase.create({  
                data: {  
                    submissionId,  
                    status: outputMapping[status], // Map the status if necessary  
                    time: time || 0,  
                    memory: memory || 0,  
                    index: 0, // Initialize index with a default value  
                    judge0TrackingId, // Include judge0TrackingId  
                }  
            });  

            return res.status(201).json(newTestCase);  
        }  
    } catch (e) {  
        console.error(e);  
        return res.status(500).json({  
            message: "Internal Server Error",  
        });  
    }  
});  

// Start your Express app  
app.listen(process.env.PORT || 3001, () => {  
    console.log(`Submission webhook is running on port ${process.env.PORT || 3001}`);  
});  