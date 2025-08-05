import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import AddPositionModal from "./AddPositionModal";

const EmployeePositionHistory = () => {
  const [isAddPositionOpen, setIsAddPositionOpen] = useState(false);
  const [positionHistory, setPositionHistory] = useState([
    {
      id: 1,
      position: "Senior Developer",
      department: "Engineering",
      startDate: "2023-01-15",
      endDate: "Current",
      salary: "$85,000",
      status: "Active",
      manager: "John Smith"
    },
    {
      id: 2,
      position: "Junior Developer",
      department: "Engineering",
      startDate: "2021-06-01",
      endDate: "2023-01-14",
      salary: "$60,000",
      status: "Completed",
      manager: "Sarah Johnson"
    },
    {
      id: 3,
      position: "Intern",
      department: "Engineering",
      startDate: "2021-01-15",
      endDate: "2021-05-31",
      salary: "$30,000",
      status: "Completed",
      manager: "Mike Brown"
    }
  ]);

  const handleAddPosition = (newPosition: any) => {
    const newId = Math.max(...positionHistory.map(p => p.id)) + 1;
    setPositionHistory([
      {
        id: newId,
        ...newPosition,
        endDate: "Current",
        status: "Active"
      },
      ...positionHistory
    ]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Position History</h2>
          <p className="text-slate-400">Track employee career progression</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsAddPositionOpen(true)}
        >
          Add Position
        </Button>
      </div>
      
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-transparent">
                <TableHead className="text-slate-300 font-medium">Position</TableHead>
                <TableHead className="text-slate-300 font-medium">Department</TableHead>
                <TableHead className="text-slate-300 font-medium">Start Date</TableHead>
                <TableHead className="text-slate-300 font-medium">End Date</TableHead>
                <TableHead className="text-slate-300 font-medium">Salary</TableHead>
                <TableHead className="text-slate-300 font-medium">Manager</TableHead>
                <TableHead className="text-slate-300 font-medium">Status</TableHead>
                <TableHead className="text-slate-300 font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positionHistory.map((position) => (
                <TableRow key={position.id} className="border-slate-700 hover:bg-slate-700/50">
                  <TableCell className="text-slate-300 font-medium">{position.position}</TableCell>
                  <TableCell className="text-slate-300">{position.department}</TableCell>
                  <TableCell className="text-slate-300">{position.startDate}</TableCell>
                  <TableCell className="text-slate-300">{position.endDate}</TableCell>
                  <TableCell className="text-slate-300">{position.salary}</TableCell>
                  <TableCell className="text-slate-300">{position.manager}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={position.status === "Active" ? "default" : "secondary"}
                      className={position.status === "Active" 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "bg-slate-600 hover:bg-slate-700"
                      }
                    >
                      {position.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-slate-300 border-slate-600 hover:bg-slate-700 h-8"
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-400 border-red-600 hover:bg-red-600/20 h-8"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Position Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">3</div>
              <div className="text-slate-400 text-sm">Total Positions</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">2.5 years</div>
              <div className="text-slate-400 text-sm">Average Duration</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">42%</div>
              <div className="text-slate-400 text-sm">Salary Growth</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddPositionModal
        open={isAddPositionOpen}
        onOpenChange={setIsAddPositionOpen}
        onAddPosition={handleAddPosition}
      />
    </div>
  );
};

export default EmployeePositionHistory;