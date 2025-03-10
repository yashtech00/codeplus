"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { type submissionProp, SubmissionTable } from "./ProblemSubmissionTable"
import axios from "axios"
import { LANGUAGE_MAPPING } from "../../../packages/common/language"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SelectItem } from "@radix-ui/react-select"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"
import { Label } from "@/components/ui/label"

export interface ProblemsProp {
  id: string
  title: string
  description: string
  slug: string
  defaultCode: {
    code: string
    languageId: number
  }[]
}

enum SubmitStatus {
  SUBMIT = "SUBMIT",
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  FAIL = "FAIL",
}

export function ProblemSubmitBar({ problems }: { problems: ProblemsProp }) {
  const [activeTab, setActiveTab] = useState("problem")
  return (
    <div className="bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-700">
      <div>
        <Tabs defaultValue="problem" className="rounded-md -1" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-neutral-700 p-1">
            <TabsTrigger
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 transition-all"
              value="problem"
            >
              Submit
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 transition-all"
              value="submissions"
            >
              Submission
            </TabsTrigger>
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
  problem,
}: {
  problem: ProblemsProp
}) {
  const [language, setLanguage] = useState(Object.keys(LANGUAGE_MAPPING)[0] as string)
  const [code, setCode] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<string>(SubmitStatus.SUBMIT)
  const [testCase, setTestCase] = useState<any>([])

  useEffect(() => {
    if (!problem || !problem.defaultCode) return
    const defaultCode: { [key: string]: string } = {}
    problem.defaultCode.forEach((code) => {
      const language = Object.keys(LANGUAGE_MAPPING).find(
        (language) => LANGUAGE_MAPPING[language]?.internal === code.languageId,
      )
      if (!language) return
      defaultCode[language] = code.code
    })
    setCode(defaultCode)
  }, [problem])

  async function submitPoll(id: string, retry: number) {
    if (retry === 0) {
      setStatus(SubmitStatus.SUBMIT)
      return
    }

    const response = await axios.get(`/api/submission?id = ${id}`)

    if (response.data.submission.status === "PENDING") {
      setTestCase(response.data.testCase)

      await new Promise((resolve) => setTimeout(resolve, 2.5 * 1000))

      submitPoll(id, retry - 1)
    } else if (response.data.submission.status === "AC") {
      setStatus(SubmitStatus.PENDING)
      setTestCase(response.data.testCase)
      return
    } else {
      setStatus(SubmitStatus.FAIL)
      setTestCase(response.data.TestCase)
      return
    }
  }

  async function Submit() {
    setStatus(SubmitStatus.PENDING)
      setTestCase((t: any[]) => t.map((tc) => ({ ...tc, status: "PENDING" })));
      try {
        const res = await axios.post(`/api/submission/`, {
            code: code[language],
            languageId: language,
            problemId: problem.id,
          })
          submitPoll(res.data.id, 10) 
      } catch (e) {
          console.error(e);
      }
  
  }

  return (
    <div>
      <div className="flex items-center space-x-4 mb-4 mt-4">
        <Label htmlFor="language" className="text-neutral-300 font-medium">
          Language
        </Label>
        <Select value={language} defaultValue="cpp" onValueChange={(value) => setLanguage(value)}>
          <SelectTrigger className="w-[180px] bg-neutral-700 border-neutral-600 text-white">
            <SelectValue placeholder="Select language" className="text-white" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-700 border-neutral-600">
            {Object.keys(LANGUAGE_MAPPING).map((language) => (
              <SelectItem key={language} value={language} className="text-white hover:bg-neutral-600">
                {LANGUAGE_MAPPING[language]?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-xl pt-2 border border-neutral-700 overflow-hidden">
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
      <div className="mt-6 mb-4">
        <Button
          onClick={Submit}
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2"
          disabled={status === SubmitStatus.PENDING}
        >
          {status === SubmitStatus.PENDING ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
      <div>
        <Tests testCase={testCase} />
      </div>
    </div>
  )
}

function Submission({ problem }: { problem: ProblemsProp }) {
  const [submission, setSubmission] = useState<submissionProp[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.post(`/api/submission/bulk?problemId=${problem.id}`)
        setSubmission(response.data || [])
      } catch (error) {
        console.error("Failed to fetch submissions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [problem.id])

  return (
    <div className="mt-4">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <svg
            className="animate-spin h-8 w-8 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : submission.length === 0 ? (
        <div className="text-center py-10 text-neutral-400">No submissions found for this problem.</div>
      ) : (
        <SubmissionTable submission={submission} />
      )}
    </div>
  )
}

function Tests({ testCase }: { testCase: any[] }) {
  if (!testCase || testCase.length === 0) return null

  return (
    <div className="mt-4 border border-neutral-700 rounded-lg p-4 bg-neutral-900">
      <h3 className="text-lg font-medium text-neutral-200 mb-3">Test Results</h3>
      <div className="grid gap-3">
        {testCase.map((testcase, index) => (
          <div key={testcase.id} className="flex items-center justify-between p-3 rounded-md bg-neutral-800">
            <div className="text-neutral-300 font-medium">Test #{index + 1}</div>
            <div className="flex items-center">
              {testcase.status === "AC" && (
                <div className="flex items-center text-green-500">
                  <CheckIcon className="h-5 w-5 mr-2" />
                  <span>Passed</span>
                </div>
              )}
              {testcase.status === "FAIL" && (
                <div className="flex items-center text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Failed</span>
                </div>
              )}
              {testcase.status === "PENDING" && (
                <div className="flex items-center text-yellow-500">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Pending</span>
                </div>
              )}
              {(testcase.status === "COMPILATION ERROR" || testcase.status === "TLE") && (
                <div className="flex items-center text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{testcase.status === "COMPILATION ERROR" ? "Compilation Error" : "Time Limit Exceeded"}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

