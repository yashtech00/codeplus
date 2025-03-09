"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { SubmissionTable } from "./ProblemSubmissionTable"
import axios from "axios"

interface ProblemsProp{
    id: string,
    title: string
    defaultCode: {
        code: string,
        languageId: number,
        language: {
            name:string
        }
    }

}

export async function ProblemSubmitBar({problems}:{problems:ProblemsProp}) {
    const [activeTab, setActiveTab] = useState("problem");

    

    return (
        <div className="bg-neutral-800 rounded-2xl p-4">
            <div>
            <Tabs>
                <TabsList className="">
                    <TabsTrigger value="problem"> Submit </TabsTrigger>
                    <TabsTrigger value="submissions"> Submission </TabsTrigger>
                </TabsList>
                </Tabs>
            </div>
            <div className={`${activeTab==="problem"? "" : "hidden"}`}>
                <SubmitProblem problem={ problems} />
            </div>
            {activeTab === "submissions" && <Submission problem={ problems} />}
        </div>
    )
}


function SubmitProblem({
    problem
}: {
    problem:ProblemsProp
    }) {
    
    
    
    return (
        <div>
            <Editor
                height={"60vh"}
                theme="vs-dark"

            defaultLanguage="javascript"
            
            
            
            />
        </div>
    )
}

function Submission({ problem }: { problem: ProblemsProp }) {
    
    const [submission,setSubmission] = useState<submissionProp[]>([])

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