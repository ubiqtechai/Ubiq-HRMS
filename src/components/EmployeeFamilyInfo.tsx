import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const EmployeeFamilyInfo = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">
          New Family Member
        </Button>
      </div>
      
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-transparent">
                <TableHead className="text-slate-300 font-medium">Name</TableHead>
                <TableHead className="text-slate-300 font-medium">Relation</TableHead>
                <TableHead className="text-slate-300 font-medium">DOB</TableHead>
                <TableHead className="text-slate-300 font-medium">Age</TableHead>
                <TableHead className="text-slate-300 font-medium">Blood Group</TableHead>
                <TableHead className="text-slate-300 font-medium">Gender</TableHead>
                <TableHead className="text-slate-300 font-medium">Nationality</TableHead>
                <TableHead className="text-slate-300 font-medium">Profession</TableHead>
                <TableHead className="text-slate-300 font-medium">Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-slate-700 hover:bg-slate-700/50">
                <TableCell className="text-slate-300">-</TableCell>
                <TableCell className="text-slate-300">-</TableCell>
                <TableCell className="text-slate-300">-</TableCell>
                <TableCell className="text-slate-300">-</TableCell>
                <TableCell className="text-slate-300">-</TableCell>
                <TableCell className="text-slate-300">-</TableCell>
                <TableCell className="text-slate-300">-</TableCell>
                <TableCell className="text-slate-300">-</TableCell>
                <TableCell className="text-slate-300">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeFamilyInfo;