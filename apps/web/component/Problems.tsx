import { getProblems } from "../db/problem";  
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";  
import { Badge } from "@/components/ui/badge";  
import { Building, Code2 } from "lucide-react";  
import Link from "next/link";  
import { ProblemSearch } from "./Filter";  
import { Button } from "@/components/ui/button";  

interface Problem {  
  id: string;  
  title: string;  
  difficulty: string;  
  companyName: string;  
}  

export async function Problems({ searchParams }: { searchParams?: { q?: string } }) {  
  const problems = await getProblems();  

  // Filter problems based on search query  
  const query = searchParams?.q?.toLowerCase() || "";  
  const filteredProblems = query  
    ? problems.filter(  
        (problem: Problem) =>  
          problem.title.toLowerCase().includes(query) ||  
          problem.difficulty.toLowerCase().includes(query) ||  
          problem.companyName.toLowerCase().includes(query)  
      )  
    : problems;  

  return (  
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 p-4 md:p-8">  
      <div className="max-w-6xl mx-auto mt-20">  
        <div className="mb-8 space-y-4">  
          <h1 className="text-3xl font-bold text-white tracking-tight">Coding Problems</h1>  
          <p className="text-neutral-400">Practice your coding skills with these challenges</p>  
          <ProblemSearch />  
        </div>  

        <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 backdrop-blur-sm overflow-hidden shadow-xl">  
          <div className="overflow-x-auto">  
            <Table>  
              <TableHeader>  
                <TableRow className="border-neutral-700 hover:bg-transparent">  
                  <TableHead className="text-neutral-300 font-semibold">Title</TableHead>  
                  <TableHead className="text-neutral-300 font-semibold">Difficulty</TableHead>  
                  <TableHead className="text-neutral-300 font-semibold">Company</TableHead>  
                  <TableHead className="text-neutral-300 font-semibold text-center">Action</TableHead>  
                </TableRow>  
              </TableHeader>  
              <TableBody>  
                {filteredProblems.length === 0 ? (  
                  <TableRow>  
                    <TableCell colSpan={4} className="h-24 text-center text-neutral-400">  
                      No problems found matching your search.  
                    </TableCell>  
                  </TableRow>  
                ) : (  
                  filteredProblems.map((problem: Problem) => (  
                    <TableRow  
                      key={problem.id}  
                      className="border-neutral-700 transition-colors hover:bg-neutral-700/30 cursor-pointer"  
                    >  
                      
                      <TableCell className="p-0">  
                        
                          <div className="flex items-center gap-2 py-4 px-4 w-full">  
                            <Code2 className="h-4 w-4 text-neutral-400 flex-shrink-0" />  
                            <span className="font-medium text-white">{problem.title}</span>  
                          </div>  
                        
                      </TableCell>  
                      <TableCell>  
                        <DifficultyBadge difficulty={problem.difficulty} />  
                      </TableCell>  
                      <TableCell className="text-neutral-300">  
                        <div className="flex items-center gap-2">  
                          <Building className="h-4 w-4 text-neutral-400" />  
                          {problem.companyName}  
                        </div>  
                      </TableCell>  
                      <TableCell className="text-neutral-300 text-center"> 
                      <Link href={`/problem/${problem.id}`} className="flex w-full h-full">  
                        <div className="flex items-center justify-center cursor-pointer">  
                          <Button className="w-20">Solve</Button>  
                          </div>  
                          </Link> 
                        </TableCell> 
                           
                    </TableRow>  
                  ))  
                )}  
              </TableBody>  
            </Table>  
          </div>  

          <div className="p-4 border-t border-neutral-700 bg-neutral-800/80">  
            <p className="text-sm text-neutral-400">  
              {query  
                ? `Showing ${filteredProblems.length} of ${problems.length} problems`  
                : `Showing ${problems.length} problems`}  
            </p>  
          </div>  
          </div>  
        </div>  
      </div>  
  )  
}  

function DifficultyBadge({ difficulty }: { difficulty: string }) {  
  const colorMap: Record<string, string> = {  
    Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",  
    Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",  
    Hard: "bg-rose-500/10 text-rose-500 border-rose-500/20",  
  };  

  const defaultColor = "bg-blue-500/10 text-blue-500 border-blue-500/20";  
  const colorClass = colorMap[difficulty] || defaultColor;  

  return (  
    <Badge variant="outline" className={`${colorClass} font-medium border`}>  
      {difficulty}  
    </Badge>  
  );  
}  