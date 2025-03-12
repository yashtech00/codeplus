import {  
  Table,  
  TableHeader,  
  TableRow,  
  TableHead,  
  TableBody,  
  TableCell,  
} from "@/components/ui/table";  
import { CheckIcon, ClockIcon, CircleX } from "lucide-react";  

export interface ISubmission {  
  id: string;  
  time: string;  
  memory: string;  
  problemId: string;  
  languageId: string;  
  code: string;  
  fullCode: string;  
  status: string;  
  testcases: {  
    status: string;  
    index: number;  
  }[];  
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
      return <CheckIcon className="h-5 w-5" />;  
    case "FAIL":  
    case "REJECTED":  
      return <CircleX className="h-5 w-5" />;  
    case "TLE":  
    case "COMPILATION_ERROR":  
    case "PENDING":  
      return <ClockIcon className="h-5 w-5" />;  
    default:  
      return <ClockIcon className="h-5 w-5" />;  
  }  
}  

export function SubmissionTable({  
  submissions,  
}: {  
  submissions: ISubmission[];  
}) {  
  return (  
    <div className="overflow-x-auto">  
      <Table className="min-w-full">  
        <TableHeader>  
          <TableRow>  
            <TableHead>Submission ID</TableHead>  
            <TableHead>Result</TableHead>  
            <TableHead>Tests Passed</TableHead>  
            <TableHead>Time</TableHead>  
            <TableHead>Memory</TableHead>  
          </TableRow>  
        </TableHeader>  
        <TableBody>  
          {submissions.map((submission) => (  
            <TableRow key={submission.id}>  
              <TableCell className="truncate">{submission.id.substr(0, 8)}</TableCell>  
              <TableCell className={getColor(submission.status)}>  
                {getIcon(submission.status)}  
              </TableCell>  
              <TableCell>  
                {  
                  submission.testcases.filter(  
                    (testcase) => testcase.status === "AC",  
                  ).length  
                }  
                /{submission.testcases.length}  
              </TableCell>  
              <TableCell>{submission.time}</TableCell>  
              <TableCell>{submission.memory}</TableCell>  
            </TableRow>  
          ))}  
        </TableBody>  
      </Table>  
    </div>  
  );  
}  