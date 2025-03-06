import { TestCaseResult } from "@prisma/client";

export const outputMapping: Record<string, TestCaseResult> = {
    Accepted: TestCaseResult.AC,
    "Wrong Answer": TestCaseResult.FAIL,
    "Time Limit Exceeds": TestCaseResult.TLE,
    "Memory Limit Exceeds": TestCaseResult.COMPILATION_ERROR,
    "Runtime Error": TestCaseResult.COMPILATION_ERROR,
    "Compilation Error": TestCaseResult.COMPILATION_ERROR
};