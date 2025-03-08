import { getProblems } from "../db/problem"


import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


export async function Problems() {
    const problems = await getProblems();
    return (
        <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 space-y-10 ">
                    <h1 className="text-white font-semibold text-4xl tracking-tight">Coding problems</h1>
                <p className="text-neutral-400">Popular Problems</p>
            </div>
            <div className=" border-2 border-neutral-700 rounded-xl bg-neutral-800/50  text-white backdrop-blur-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="text-white">
                            <TableHead>Title</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>Company Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {problems.map((problem) => (
                            <TableRow key={problem.id}>
                                <TableCell className="font-medium">{problem.title}</TableCell>
                                <TableCell>{problem.difficulty}</TableCell>
                                <TableCell>{problem.companyName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>

                </div>
                </div>
        </div>

    );
}


