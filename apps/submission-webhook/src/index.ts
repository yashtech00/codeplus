import express from 'express'

import { SubmissionCallback } from "@repo/common/zod";
import prisma from './db/db';
import { outputMapping } from './outputMapping';

const app = express();
app.use(express.json());

app.put('/submission-callbacks', async(req, res) => {
    const parsedBody = SubmissionCallback.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid Inputs"
        });
    }

    const testCase = await prisma.testCase.update({
        where: {
            judge0TrackingId:parsedBody.data.token,
        },
        data: {
            status: outputMapping[parsedBody.data.status.description],
            time: Number(parsedBody.data.time),
            memory:Number(parsedBody.data.memory)
        },
    })


    if (!testCase) {
        return res.status(404).json({
            message:"TestCase Not Found"
        })
    }

    const allTestCaseData = await prisma.testCase.findMany({
        where: {
            submissionId:testCase.submissionId
        }
    })

    const PendingTestcases = allTestCaseData.filter(
        (testcase) => testcase.status === "PENDING",
    );
    const failedTestcases = allTestCaseData.filter(
        (testcase)=>testcase.status!=="AC",
    )

    if (PendingTestcases.length === 0) {
        const accepted = failedTestcases.length === 0;
        const response = await prisma.submission.update({
            where: {
                id:testCase.submissionId
            },
            data: {
                status: accepted ? "AC" : "REJECTED",
                time: Math.max(
                    ...allTestCaseData.map((testcase)=>Number(testcase.time || "0"))
                ),
                memory: Math.max(
                    ...allTestCaseData.map((testcase)=>testcase.memory || 0)
                ),
            },
            include: {
                problem: true,
            }
        })
    
    }


})