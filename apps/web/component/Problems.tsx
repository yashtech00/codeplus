import { getProblems } from "../db/problem"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building, Code2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export async function Problems() {
  const problems = await getProblems()

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold text-white tracking-tight">Coding Problems</h1>
          <p className="text-neutral-400">Practice your coding skills with these challenges</p>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 h-4 w-4" />
            <Input
              placeholder="Search problems..."
              className="pl-10 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-600"
            />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 backdrop-blur-sm overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-neutral-700 hover:bg-transparent">
                  <TableHead className="text-neutral-300 font-semibold">Title</TableHead>
                  <TableHead className="text-neutral-300 font-semibold">Difficulty</TableHead>
                  <TableHead className="text-neutral-300 font-semibold">Company</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {problems.map((problem) => (
                  <TableRow key={problem.id} className="border-neutral-700 transition-colors hover:bg-neutral-700/30">
                    <TableCell className="font-medium text-white flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-neutral-400" />
                      {problem.title}
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="p-4 border-t border-neutral-700 bg-neutral-800/80">
            <p className="text-sm text-neutral-400">Showing {problems.length} problems</p>
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
  }

  const defaultColor = "bg-blue-500/10 text-blue-500 border-blue-500/20"
  const colorClass = colorMap[difficulty] || defaultColor

  return (
    <Badge variant="outline" className={`${colorClass} font-medium border`}>
      {difficulty}
    </Badge>
  )
}

