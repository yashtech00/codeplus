"use client";  
import Markdown from "react-markdown";  
import remarkGfm from "remark-gfm";  

export function ProblemStatement({ description }: { description: string }) {  
  return (  
    <div className="prose lg:prose-xl text-white">  
      <Markdown  
        children={description}  
        remarkPlugins={[remarkGfm]} // Ensure this is properly set  
      />  
    </div>  
  );  
}  