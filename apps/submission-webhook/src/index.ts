import express from "express";
import prismaClient from "./db";
import { SubmissionCallback } from "@repo/common/zod";
import { outputMapping } from "./outputMapping";

import cors from 'cors';  

 // Enable CORS for all routes  
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;  

// Middleware to parse JSON bodies  
// app.use(bodyParser.json()); 
app.put("/submission-callback", async (req, res) => {
    console.log("Received callback:", req.body); // Log the incoming request body 
    console.log("Received status.id:", req.body.status.id, "Type:", typeof req.body.status.id);

    const transformedBody = {
        ...req.body,
        status: {
          ...req.body.status,
          id: String(req.body.status.id), // Convert number to string
        },
      };
      
      const parsedBody = SubmissionCallback.safeParse(transformedBody);
      
    console.log(parsedBody,"yash test parsedBidy");
    
    if (!parsedBody.success) {  
        console.error("Validation Errors:", parsedBody.error); // Log the specific validation errors  
        return res.status(403).json({  
            message: "Invalid input",  
            errors: parsedBody.error, // This will show you what went wrong  
        });  
    }  

  const testCase = await prismaClient.testCase.update({
    where: {
      judge0TrackingId: parsedBody.data.token,
    },
    data: {
      status: outputMapping[parsedBody.data.status.description],
      time: Number(parsedBody.data.time),
      memory: parsedBody.data.memory,
    },
  });

  if (!testCase) {
    return res.status(404).json({
      message: "Testcase not found",
    });
  }

  const allTestcaseData = await prismaClient.testCase.findMany({
    where: {
      submissionId: testCase.submissionId,
    },
  });

  const pendingTestcases = allTestcaseData.filter(
    (testcase) => testcase.status === "PENDING",
  );
  const failedTestcases = allTestcaseData.filter(
    (testcase) => testcase.status !== "AC",
  );


  // This logic is fairly ugly
  // We should have another async process update the status of the submission.
  // This can also lead to a race condition where two test case webhooks are sent at the same time
  // None of them would update the status of the submission
  if (pendingTestcases.length === 0) {
      const accepted = failedTestcases.length === 0;
      console.log(accepted,"submission webhook:accepted status");
      console.log("before resonse");
      
    const response = await prismaClient.submission.update({
      where: {
        id: testCase.submissionId,
      },
      data: {
        status: accepted ? "AC" : "REJECTED",
        time: Math.max(
          ...allTestcaseData.map((testcase) => Number(testcase.time || "0")),
        ),
        memory: Math.max(
          ...allTestcaseData.map((testcase) => testcase.memory || 0),
        ),
      },
      include: {
        problem: true,
       
      }
    });
      console.log(response,"after tests case response");
      
  }
  res.status(200).json({ message: 'Callback received successfully' });  
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
  