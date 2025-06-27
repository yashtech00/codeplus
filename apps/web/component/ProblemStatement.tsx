import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ISubmission, SubmissionTable } from "./ProblemSubmissionTable";
import axios from "axios";
import { IProblem } from "./ProblemSubmitBar";

// export interface problemProp {
//   description: string
//   difficulty:string
// }

export function ProblemStatement({ problem }: { problem: IProblem; }) {

   const [activeTab, setActiveTab] = useState("problem");  

  return (
    <div className="flex justify-between">
      <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-800">  
          <div className=""> 
            <Tabs defaultValue="problem" className="rounded-md p-1 " value={activeTab} onValueChange={setActiveTab} >  
              <TabsList className="grid grid-cols-2 text-white ">  
                <TabsTrigger  
                  value="problem"  
                  className="data-[state=active]:bg-stone-800 "  
                > 
                <NotepadText/>  
                  Description  
                </TabsTrigger>  
                <TabsTrigger  
                  value="submissions"  
                  className="data-[state=active]:bg-stone-800 "  
                >  
                  Submissions  
                </TabsTrigger>  
              </TabsList>  
            </Tabs>  
          </div>  
        </div>  
        {activeTab === "submissions" && <Submissions problem={problem} />}
    <div className={`${activeTab === "problem" ? "" : "hidden"} markdown prose lg:prose-xl text-white overflow-x-hidden p-6`}>
        <Markdown remarkPlugins={[remarkGfm]}>{problem.description}</Markdown>
         <div className="text-yellow-400 mt-6 border-2 rounded-full px-2 h-8 py-2 flex items-center">
          {problem.difficulty}
        </div>
      </div>
     
        </div>
      </div>
  );
}


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