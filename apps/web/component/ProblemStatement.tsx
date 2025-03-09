import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ProblemStatement({ description }: { description: string }) {
  
  return (
    <div className="markdown prose lg:prose-xl text-white ">
          <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
    </div>
  );
}
