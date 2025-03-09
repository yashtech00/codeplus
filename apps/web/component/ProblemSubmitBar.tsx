"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { submissionProp, SubmissionTable } from "./ProblemSubmissionTable"
import axios from "axios"
import { LANGUAGE_MAPPING } from "../../../packages/common/language"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SelectItem } from "@radix-ui/react-select"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"

 export interface ProblemsProp {
    id: string,
    title: string,
    description: string,
    slug: string,
    defaultCode: {
        code: string,
        languageId: number,
    }[];

}

enum SubmitStatus {
    SUBMIT = "SUBMIT",
    ACCEPTED = "ACCEPTED",
    PENDING = "PENDING",
    FAIL = "FAIL"
}

export async function ProblemSubmitBar({ problems }: { problems: ProblemsProp }) {
    const [activeTab, setActiveTab] = useState("problem");
    return (
        <div className="bg-neutral-800 rounded-2xl p-4">
            <div>
                <Tabs
                    defaultValue="problem"
                    className="rounded-md -1"
                    value={activeTab}
                    onValueChange={setActiveTab}
                >
                    <TabsList className="">
                        <TabsTrigger value="problem"> Submit </TabsTrigger>
                        <TabsTrigger value="submissions"> Submission </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className={`${activeTab === "problem" ? "" : "hidden"}`}>
                <SubmitProblem problem={problems} />
            </div>
            {activeTab === "submissions" && <Submission problem={problems} />}
        </div>
    )
}


function SubmitProblem({
    problem
}: {
    problem: ProblemsProp
}) {

    const [language, setLanguage] = useState(
        Object.keys(LANGUAGE_MAPPING)[0] as string
    )
    const [code, setCode] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<string>(SubmitStatus.SUBMIT);
    const [testCase, setTestCase] = useState<any>([]);

    useEffect(() => {
        if (!problem || !problem.defaultCode) return;
        const defaultCode: { [key: string]: string } = {};
        problem.defaultCode.forEach((code) => {
          const language = Object.keys(LANGUAGE_MAPPING).find(
            (language) => LANGUAGE_MAPPING[language]?.internal === code.languageId,
          );
          if (!language) return;
          defaultCode[language] = code.code;
        });
        setCode(defaultCode);
      }, [problem]);

    async function submitPoll(id: string, retry: number) {
        if (retry === 0) {
            setStatus(SubmitStatus.SUBMIT);
            return
        }

        const response = await axios.get(`/api/submission?id = ${id}`);

        if (response.data.submission.status === "PENDING") {
            setTestCase(response.data.testCase);

            await new Promise((resolve) => setTimeout(resolve, 2.5 * 1000));

            submitPoll(id, retry - 1);
        } else
            if (response.data.submission.status === "AC") {
                setStatus(SubmitStatus.PENDING)
                setTestCase(response.data.testCase);
                return;
            } else {
                setStatus(SubmitStatus.FAIL)
                setTestCase(response.data.TestCase);
                return;
            }
    }

    async function Submit() {
        setStatus(SubmitStatus.PENDING);
        setTestCase((t: any[]) => t.map(tc => ({ ...tc, status: "PENDING" })));
        const res = await axios.post(`/api/submission/`, {
            code: code[language],
            languageId: language,
            problem: problem.id,
        })
        submitPoll(res.data.id, 10);
    }

    return (
        <div>
            <div>
                <label htmlFor="language">Language</label>
                <Select
                    value={language}
                    defaultValue="cpp"
                    onValueChange={(value) => (setLanguage(value))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(LANGUAGE_MAPPING).map((Lang) => (
                            <SelectItem key={language} value={language}>
                                {LANGUAGE_MAPPING[language]?.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="rounded-xl pt-4">
                <Editor
                    height={"60vh"}
                    theme="vs-dark"
                    value={code[language]}
                    defaultLanguage="javascript"
                    defaultValue="// some comment"
                    onChange={(value) => {
                        setCode({ ...code, [language]: value || "" })
                    }}
                    options={{
                        fontSize: 18,
                        scrollBeyondLastLine: false,
                    }}
                />
            </div>
            <div>
                <Button
                    onClick={Submit}
                    type="submit"
                    className="m-4"
                    disabled={status === SubmitStatus.PENDING}
                >
                    Submit
                </Button>
            </div>
            <div><Tests testCase={ testCase} /></div>
        </div>
    )
}

function Submission({ problem }: { problem: ProblemsProp }) {

    const [submission, setSubmission] = useState<submissionProp[]>([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.post(`/api/submission/bulk?problemId=${problem.id}`)
        }
    })

    return (
        <div>
            <SubmissionTable submission={submission} />
        </div>
    )
}

function testResult(status: string) {
    switch (status) {
        case "AC":
            return <CheckIcon className="h-6 w-6 bg-green-500" />
        case "FAIL":
            return <CheckIcon className="h-6 w-6 bg-red-500" />
        case "PENDING":
            return <CheckIcon className="h-6 w-6 bg-yellow-500" />
        case "COMPILATION ERROR":
            return <CheckIcon className="h-6 w-6 bg-red-500" />
        case "TLE":
            return <CheckIcon className="h-6 w-6 bg-red-500" />
        default:
            return <div className=" bg-gray-500"></div>
        
    }
}

function Tests({ testCase }: { testCase: any[] }) {
    return (
        <div>
            {testCase.map((testcase,index) => (
                <div key={testcase.id}>
                    <div>
                        Test #{index+1}
                    </div>
                    {testResult(testcase.status)}

                </div>
            ))}
        </div>
    )
}
