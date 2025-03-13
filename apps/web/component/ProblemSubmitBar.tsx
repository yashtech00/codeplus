"use client";  
import Editor from "@monaco-editor/react";  
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";  
import { Button } from "@/components/ui/button";  
import { Label } from "@/components/ui/label";  
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";  
import { useEffect, useState } from "react";  
import { LANGUAGE_MAPPING } from "@repo/common/language";  
import axios from "axios";  
import { type ISubmission, SubmissionTable } from "./ProblemSubmissionTable";  
import { toast } from "react-toastify";  

enum SubmitStatus {  
  SUBMIT = "SUBMIT",  
  PENDING = "PENDING",  
  ACCEPTED = "ACCEPTED",  
  FAILED = "FAILED",  
}  

export interface IProblem {  
  id: string;  
  title: string;  
  description: string;  
  slug: string;  
  defaultCode: {  
    languageId: number;  
    code: string;  
  }[];  
}  

export const ProblemSubmitBar = ({  
  problem,  
}: {  
  problem: IProblem;  
}) => {  
  const [activeTab, setActiveTab] = useState("problem");  

  return (  
    <div className="bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-700">  
      <div className="grid gap-4">  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">  
          <div>  
            <Tabs defaultValue="problem" className="rounded-md p-1" value={activeTab} onValueChange={setActiveTab}>  
              <TabsList className="grid grid-cols-2 w-full bg-gray-100">  
                <TabsTrigger  
                  value="problem"  
                  className="data-[state=active]:bg-white"  
                >  
                  Submit  
                </TabsTrigger>  
                <TabsTrigger  
                  value="submissions"  
                  className="data-[state=active]:bg-white"  
                >  
                  Submissions  
                </TabsTrigger>  
              </TabsList>  
            </Tabs>  
          </div>  
        </div>  
        
        <div className={`${activeTab === "problem" ? "" : "hidden"}`}>  
          <SubmitProblem problem={problem} />  
        </div>  
        {activeTab === "submissions" && <Submissions problem={problem} />}  
      </div>  
    </div>  
  );  
};  

function Submissions({ problem }: { problem: IProblem }) {  
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);  

  useEffect(() => {  
    console.log("yash submission before");
    
    const fetchData = async () => {  
      const response = await axios.get(`/api/submission/bulk?problemId=${problem.id}`);  
      setSubmissions(response.data.Submission || []); 
      console.log("yash submission " , response.data.Submission);
      
    };  
    fetchData(); 
    
  }, [problem.id]);  

  return (  
    <div>  
      <SubmissionTable submissions={submissions} />  
    </div>  
  );  
}  

function SubmitProblem({  
  problem,  
}: {  
  problem: IProblem;  
}) {  
  const [language, setLanguage] = useState(Object.keys(LANGUAGE_MAPPING)[0] as string);  
  const [code, setCode] = useState<Record<string, string>>({});  
  const [status, setStatus] = useState<string>(SubmitStatus.SUBMIT);  
  const [testcases, setTestcases] = useState<any[]>([]);  

  useEffect(() => {  
    const defaultCode: { [key: string]: string } = {};  
    problem.defaultCode.forEach((code) => {  
      const language = Object.keys(LANGUAGE_MAPPING).find(  
        (language) => LANGUAGE_MAPPING[language]?.internal === code.languageId  
      );  
      if (!language) return;  
      defaultCode[language] = code.code;  
    });  
    setCode(defaultCode);  
  }, [problem]);  

  async function pollWithBackoff(id: string, retries: number) {  
    if (retries === 0) {  
      setStatus(SubmitStatus.SUBMIT);  
      toast.error("Not able to get status ");  
      return;  
    }  

    const response = await axios.get(`/api/submission/?id=${id}`);  

    if (response.data.submission.status === "PENDING") {  
      setTestcases(response.data.testcase);  
      await new Promise((resolve) => setTimeout(resolve, 2.5 * 1000));  
      pollWithBackoff(id, retries - 1);  
    } else {  
      setTestcases(response.data.testcase);  
      if (response.data.submission.status === "AC") {  
        setStatus(SubmitStatus.ACCEPTED);  
        toast.success("Accepted!");  
      } else {  
        setStatus(SubmitStatus.FAILED);  
        toast.error("Failed :(");  
      }  
    }  
  }  

  async function submit() {  
    setStatus(SubmitStatus.PENDING);  
    setTestcases((t) => t.map((tc) => ({ ...tc, status: "PENDING" })));  
    console.log("before submit button");
    
    const response = await axios.post(`/api/submission/`, {  
      code: code[language],  
      languageId: language,  
      problemId: problem.id,  
    }); 
    console.log("after submit button ", response);
    

    pollWithBackoff(response.data.id, 10);  
  }  

  return (  
    <div>  
      {/* Language Selector */}  
      <div className="my-2">  
        <Label htmlFor="language" className="text-white">Language</Label>  
        <Select value={language} onValueChange={setLanguage}>  
          <SelectTrigger className="bg-white border-gray-300">  
            <SelectValue placeholder="Select language" />  
          </SelectTrigger>  
          <SelectContent className="bg-white">  
            {Object.keys(LANGUAGE_MAPPING).map((language) => (  
              <SelectItem key={language} value={language}>  
                {LANGUAGE_MAPPING[language]?.name}  
              </SelectItem>  
            ))}  
          </SelectContent>  
        </Select>  
      </div>  

      {/* Code Editor */}  
      <div className="pt-4 rounded-md border border-gray-300 dark:border-gray-700 overflow-hidden mt-4">  
        <Editor  
          height="60vh"  
          value={code[language]}  
          theme="vs-dark"  
          options={{  
            fontSize: 14,  
            scrollBeyondLastLine: false,  
          }}  
          language={LANGUAGE_MAPPING[language]?.monaco} 
          // @ts-ignore
          onChange={(value) => setCode({ ...code, [language]: value })}  
        />  
      </div>  

      {/* Submit Button */}  
      <div className="flex justify-end">  
        <Button  
          disabled={status === SubmitStatus.PENDING}  
          onClick={submit}  
          className="mt-4 bg-white hover:bg-gray-200 text-black"  
        >  
          {status === SubmitStatus.PENDING ? (  
            <span className="flex items-center gap-2">  
              <svg  
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"  
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
              Submitting  
            </span>  
          ) : (  
            "Submit"  
          )}  
        </Button>  
      </div>  

      {/* Test Cases Results */}  
      <RenderTestcase testcases={testcases} />  
    </div>  
  );  
}  

import { CheckCircle, Clock, XCircle } from "lucide-react";  

function renderResult(status: string) {  
  switch (status) {  
    case "AC":  
      return <CheckCircle className="h-5 w-5 text-green-500" />;  
    case "FAIL":  
    case "COMPILATION_ERROR":  
      return <XCircle className="h-5 w-5 text-red-500" />;  
    case "TLE":  
      return <Clock className="h-5 w-5 text-amber-500" />;  
    case "PENDING":  
      return (  
        <div className="flex h-5 w-5 items-center justify-center">  
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-500 border-t-transparent"></div>  
        </div>  
      );  
    default:  
      return <div className="h-5 w-5 rounded-full bg-gray-200"></div>;    }  
    }  
    
    function getStatusStyles(status: string) {  
      switch (status) {  
        case "AC":  
          return {  
            bg: "bg-green-100 dark:bg-green-900/30",  
            border: "border-green-200 dark:border-green-800",  
            text: "text-green-800 dark:text-green-200",  
          };  
        case "FAIL":  
        case "COMPILATION_ERROR":  
          return {  
            bg: "bg-red-100 dark:bg-red-900/30",  
            border: "border-red-200 dark:border-red-800",  
            text: "text-red-800 dark:text-red-200",  
          };  
        case "TLE":  
          return {  
            bg: "bg-amber-100 dark:bg-amber-900/30",  
            border: "border-amber-200 dark:border-amber-800",  
            text: "text-amber-800 dark:text-amber-200",  
          };  
        case "PENDING":  
          return {  
            bg: "bg-yellow-100 dark:bg-yellow-900/20",  
            border: "border-yellow-200 dark:border-yellow-800/50",  
            text: "text-yellow-800 dark:text-yellow-200",  
          };  
        default:  
          return {  
            bg: "bg-gray-100 dark:bg-gray-800",  
            border: "border-gray-200 dark:border-gray-700",  
            text: "text-gray-800 dark:text-gray-200",  
          };  
      }  
    }  
    
    export default function RenderTestcase({ testcases }: { testcases: any[] }) {  
      return (  
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">  
          {testcases.map((testcase, index) => {  
            const styles = getStatusStyles(testcase.status);  
    
            return (  
              <div  
                key={index}  
                className={`flex flex-col rounded-lg border ${styles.border} ${styles.bg} shadow-sm transition-all duration-200 hover:shadow-md`}  
              >  
                <div className="flex items-center justify-between p-3">  
                  <span className={`text-sm font-medium ${styles.text}`}>Test #{index + 1}</span>  
                  <div className="flex items-center justify-center">  
                    {renderResult(testcase.status)}  
                  </div>  
                </div>  
              </div>  
            );  
          })}  
        </div>  
      );  
    }  