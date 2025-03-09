import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface submissionProp {
    id: string;

}

export async function SubmissionTable({submission}:{submission:submissionProp}) {
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
                    
            </TableHeader>
            </Table>
        </div>
    )
}