"use client";  
import Markdown from "react-markdown";  
import remarkGfm from "remark-gfm";  

export function ProblemStatement({ description }: { description: string }) {  
  return (  
    <div className="prose lg:prose-xl text-white">  
      {description ? (  
        <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>  
      ) : (  
        <p>No description provided.</p>  
      )}  
    </div>  
  );  
}  

