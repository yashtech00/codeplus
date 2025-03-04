import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { items } from "@/lib/problemlists";
  
  
  
  export default function ProblemList() {
    return (
      <div className="bg-background  flex justify-center mt-10 ">
        <div className="[&>div]:max-h-96">
          <Table className="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr:not(:last-child)_td]:border-b [&_tr]:border-none">
            <TableHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
              <TableRow className="hover:bg-transparent">
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Company</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-transparent">
            
            </TableFooter>
          </Table>
        </div>
      </div>
    );
  }
  
  export { ProblemList }