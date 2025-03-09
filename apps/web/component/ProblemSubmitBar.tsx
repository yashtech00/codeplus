"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Editor from "@monaco-editor/react"

interface ProblemsProp{
    title:string
}

export async function ProblemSubmitBar({problems}:{problems:ProblemsProp}) {


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
            <div>
                <SubmitProblem prbolem={ problems} />
            </div>
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