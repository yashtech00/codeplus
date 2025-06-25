import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface problemProp {
  description: string
  difficulty:string
}

export function ProblemStatement({ problem }: { problem: problemProp }) {

  return (
    <div className="flex justify-between">
    <div className="markdown prose lg:prose-xl text-white overflow-x-hidden ">
        <Markdown remarkPlugins={[remarkGfm]}>{problem.description}</Markdown>
        
      </div>
      <div className="text-yellow-400 mt-6 border-2 rounded-full px-2 h-8 py-2 flex items-center">
          {problem.difficulty}
      </div>
      </div>
  );
}
