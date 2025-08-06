import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import AddPositionModal from "./AddPositionModal";

const EmployeePositionHistory = () => {
  const [isAddPositionOpen, setIsAddPositionOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("all-employees");
  const [departmentFilter, setDepartmentFilter] = useState("all-departments");
  const [statusFilter, setStatusFilter] = useState("all-statuses");
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

  const handleEditPosition = (id: number) => {
    console.log("Edit position:", id);
  };

  const handleDeletePosition = (id: number) => {
    setPositionHistory(prev => prev.filter(position => position.id !== id));
  };

  const filteredPositions = positionHistory.filter(position => {
    const matchesSearch = position.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         position.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         position.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all-departments" || position.department === departmentFilter;
    const matchesStatus = statusFilter === "all-statuses" || position.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

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
      
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search positions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
        />
        <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
          <SelectTrigger className="w-48 bg-slate-700/50 border-slate-600 text-white">
            <SelectValue placeholder="Select Employee" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all-employees" className="text-white">All Employees</SelectItem>
            <SelectItem value="john-doe" className="text-white">John Doe</SelectItem>
            <SelectItem value="jane-smith" className="text-white">Jane Smith</SelectItem>
          </SelectContent>
        </Select>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-48 bg-slate-700/50 border-slate-600 text-white">
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all-departments" className="text-white">All Departments</SelectItem>
            <SelectItem value="Engineering" className="text-white">Engineering</SelectItem>
            <SelectItem value="HR" className="text-white">HR</SelectItem>
            <SelectItem value="Finance" className="text-white">Finance</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 bg-slate-700/50 border-slate-600 text-white">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all-statuses" className="text-white">All Statuses</SelectItem>
            <SelectItem value="Active" className="text-white">Active</SelectItem>
            <SelectItem value="Completed" className="text-white">Completed</SelectItem>
          </SelectContent>
        </Select>
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
              {filteredPositions.map((position) => (
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
                        variant="ghost" 
                        onClick={() => handleEditPosition(position.id)}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/20 h-8 w-8 p-0"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDeletePosition(position.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-600/20 h-8 w-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
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