
import { ProblemStatement } from "../../../component/ProblemStatement";
import { ProblemSubmitBar } from "../../../component/ProblemSubmitBar";
import { getProblem } from "../../../db/problem";

export default async function ProblemPage({
  params: { problemId },
}: {
  params: {
    problemId: string;
  };
}) {
  const problem = await getProblem(problemId);

  if (!problem) {
    return <div>Problem not found</div>;
  }
  

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
      <main className="flex-1 py-8 md:py-12 grid md:grid-cols-2 gap-8 md:gap-4 mt-10 mx-6">
        <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 backdrop-blur-sm overflow-hidden shadow-xl p-6">
          <div className="prose prose-stone dark:prose-invert">
            <ProblemStatement problem={problem} />
          </div>
        </div>
        <ProblemSubmitBar problem={problem} />
      </main>
    </div>
  );
}
export const dynamic = "force-dynamic";
