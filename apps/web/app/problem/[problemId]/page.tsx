"use client";

import { useEffect, useState } from "react";
import { ProblemStatement } from "../../../component/ProblemStatement";
import { IProblem, ProblemSubmitBar } from "../../../component/ProblemSubmitBar";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ProblemPage() {
  const [prob, setProb] = useState<IProblem | null>(null);
  const params = useParams();
  const problemId = params.problemId as string;
 

  useEffect(() => {
    if (!problemId) return;
  
     console.log(problemId,"id of problem");

    const fetch = async () => {
      try {
        const res = await axios.get(`/api/problems/${problemId}`);
        console.log(res,"problem res");
        
        setProb(res.data);
      } catch (e) {
        console.error("Error getting problem by id", e);
      }
    };

    fetch();
  }, [problemId]);

  if (!prob) {
    return <div>Problem not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
      <main className="flex-1 py-8 md:py-12 grid md:grid-cols-2 gap-8 md:gap-4 mt-10 mx-6 ">
        <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 backdrop-blur-sm overflow-hidden shadow-xl ">
          <div className="prose prose-stone dark:prose-invert">
            <ProblemStatement problem={prob} />
          </div>
        </div>
        <ProblemSubmitBar problem={prob} />
      </main>
    </div>
  );
}
