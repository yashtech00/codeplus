
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
import { Filter } from "./Filter";


export async function Problems() {
    const problems = await getProblems();
    




    return (

        <div className="flex justify-center  ">
            {problems.map((filterProblem)=>(
                <Filter problem={filterProblem } />
           ) )}
            

                <div className=" border-2 border-gray-500 bg-neutral-800 text-white w-1/2 mt-32 ">

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
        
    );
}


