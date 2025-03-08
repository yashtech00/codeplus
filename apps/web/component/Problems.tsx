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
  
  const items = [
    {
      id: "1",
      name: "Alex Thompson",
      email: "alex.t@company.com",
      location: "San Francisco, US",
      status: "Active",
      balance: "$1,250.00",
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah.c@company.com",
      location: "Singapore",
      status: "Active",
      balance: "$600.00",
    },
    {
      id: "3",
      name: "James Wilson",
      email: "j.wilson@company.com",
      location: "London, UK",
      status: "Inactive",
      balance: "$650.00",
    },
    {
      id: "4",
      name: "Maria Garcia",
      email: "m.garcia@company.com",
      location: "Madrid, Spain",
      status: "Active",
      balance: "$0.00",
    },
    {
      id: "5",
      name: "David Kim",
      email: "d.kim@company.com",
      location: "Seoul, KR",
      status: "Active",
      balance: "-$1,000.00",
    },
  ];
  
export async function Problems() {
    const problems = await getProblems();
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
                <TableCell>{problem.}</TableCell>
                <TableCell>{problem.status}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <p className="mt-4 text-center text-sm text-muted-foreground">Basic table</p>
      </div>
    );
  }
  

  