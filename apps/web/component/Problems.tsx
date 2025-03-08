
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
    console.log(problems,"yash");
    
    return (
        <div className="bg-background">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {problems.map((problem) => (
                        <TableRow key={problem.id}>
                            <TableCell className="font-medium">{problem.title}</TableCell>
                            <TableCell>{problem.difficulty}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            <p className="mt-4 text-center text-sm text-muted-foreground">Basic table</p>
        </div>
    );
}


