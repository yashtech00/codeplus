
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckIcon, CircleX, ClockIcon } from "lucide-react";

export interface submissionProp {
    id: string;
    time: string;
    memory: string;
    languageId: number,
    code: string;
    FullCode: string;
    status: string;
    testCase: Array<{
        status: string,
        index: number
    }>
}

function getColor(status: string) {
    switch (status) {
      case "AC":
        return "text-green-500";
      case "FAIL":
        return "text-red-500";
      case "TLE":
        return "text-red-500";
      case "COMPILATION_ERROR":
        return "text-red-500";
      case "PENDING":
        return "text-yellow-500";
      case "REJECTED":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  }
  
  function getIcon(status: string) {
    switch (status) {
      case "AC":
        return <CheckIcon className="h-4 w-4" />;
      case "FAIL":
        return <CircleX className="h-4 w-4" />;
      case "REJECTED":
        return <CircleX className="h-4 w-4" />;
      case "TLE":
        return <ClockIcon className="h-4 w-4" />;
      case "COMPILATION_ERROR":
        return <CircleX className="h-4 w-4" />;
      case "PENDING":
        return <ClockIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  }
export  function SubmissionTable({submission}:{submission:submissionProp[]}) {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Submission Id</TableHead>
                        <TableHead>Results</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Memory</TableHead>
                    </TableRow>
                    <TableBody>
                        {submission.map((sub) => (
                            <TableRow>
                                <TableCell>{sub.id.substr(0, 4)}</TableCell>
                                <TableCell className={getColor(sub.status)}>{getIcon(sub.status)}</TableCell>
                                <TableCell>
                                    {sub.testCase.filter((tc:any)=>tc.status === "AC").length}/{sub.testCase.length}
                                </TableCell>
                                <TableCell>{sub.time}</TableCell>
                                <TableCell>{sub.memory}</TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
            </TableHeader>
            </Table>
        </div>
    )
}