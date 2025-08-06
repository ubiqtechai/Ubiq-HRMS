import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const EmployeePreviousEmployment = () => {
  const [currentMode, setCurrentMode] = useState<'view' | 'add' | 'edit'>('view');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [designationFilter, setDesignationFilter] = useState('');

  // Mock data for employees and their previous employment
  const employees = [
    { id: 'EMP001', name: 'John Doe', department: 'Engineering' },
    { id: 'EMP002', name: 'Jane Smith', department: 'HR' },
    { id: 'EMP003', name: 'Mike Johnson', department: 'Finance' },
  ];

  const previousEmployments = [
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      companyName: 'Tech Corp',
      designation: 'Software Engineer',
      fromDate: '2020-01-15',
      toDate: '2023-06-30',
      experience: '3 Years 5 Months',
      companyAddress: '123 Tech Street, Silicon Valley',
      natureOfDuties: 'Full-stack development',
      leavingReason: 'Career growth',
      pfMemberId: 'AA/BBB/1234567/123/7654321',
      lastSalary: '₹8,50,000'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Jane Smith',
      companyName: 'HR Solutions',
      designation: 'HR Manager',
      fromDate: '2019-03-01',
      toDate: '2023-04-15',
      experience: '4 Years 1 Month',
      companyAddress: '456 Corporate Ave, Business District',
      natureOfDuties: 'Employee management and recruitment',
      leavingReason: 'Better opportunity',
      pfMemberId: 'AA/CCC/2345678/124/8765432',
      lastSalary: '₹7,20,000'
    }
  ];

  // Filter and search logic
  const filteredEmployments = previousEmployments.filter(employment => {
    const matchesEmployee = !selectedEmployeeId || employment.employeeId === selectedEmployeeId;
    const matchesSearch = !searchTerm || 
                         employment.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employment.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employment.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = companyFilter === "all-companies" || !companyFilter || employment.companyName === companyFilter;
    const matchesDesignation = designationFilter === "all-designations" || !designationFilter || employment.designation === designationFilter;
    
    return matchesEmployee && matchesSearch && matchesCompany && matchesDesignation;
  });

  const uniqueCompanies = [...new Set(previousEmployments.map(emp => emp.companyName))];
  const uniqueDesignations = [...new Set(previousEmployments.map(emp => emp.designation))];

  if (currentMode === 'add' || currentMode === 'edit') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {currentMode === 'add' ? 'Add Previous Employment' : 'Edit Previous Employment'}
          </h2>
          <Button 
            variant="outline" 
            onClick={() => setCurrentMode('view')}
            className="text-slate-300 border-slate-600 hover:bg-slate-700"
          >
            Back to List
          </Button>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Name
                </label>
                <Input 
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Designation
                </label>
                <Input 
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Designation"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  From Date
                </label>
                <Input 
                  type="date"
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  To Date
                </label>
                <Input 
                  type="date"
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Relevant Experience
                </label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Y"
                    className="bg-slate-700/50 border-slate-600 text-white w-16"
                  />
                  <Input 
                    placeholder="M"
                    className="bg-slate-700/50 border-slate-600 text-white w-16"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Address
                </label>
                <Input 
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Company Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nature Of Duties
                </label>
                <Input 
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Nature Of Duties"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Leaving Reason
              </label>
              <Input 
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 max-w-md"
                placeholder="Leaving Reason"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  PF Member ID
                </label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="AA"
                    className="bg-slate-700/50 border-slate-600 text-white w-16"
                  />
                  <span className="text-slate-400 self-center">/</span>
                  <Input 
                    placeholder="BBB"
                    className="bg-slate-700/50 border-slate-600 text-white w-20"
                  />
                  <span className="text-slate-400 self-center">/</span>
                  <Input 
                    placeholder="1234567"
                    className="bg-slate-700/50 border-slate-600 text-white w-24"
                  />
                  <span className="text-slate-400 self-center">/</span>
                  <Input 
                    placeholder="123"
                    className="bg-slate-700/50 border-slate-600 text-white w-16"
                  />
                  <span className="text-slate-400 self-center">/</span>
                  <Input 
                    placeholder="1234567"
                    className="bg-slate-700/50 border-slate-600 text-white w-24"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Last Drawn Salary
                </label>
                <Input 
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Last Drawn Salary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setCurrentMode('view')}
                className="text-slate-300 border-slate-600 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setCurrentMode('view')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Previous Employment Records</CardTitle>
            <Button 
              onClick={() => setCurrentMode('add')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Previous Employment
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Employee Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Select Employee
            </label>
            <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white w-full max-w-xs">
                <SelectValue placeholder="All Employees" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all-employees">All Employees</SelectItem>
                {employees.map(employee => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name} ({employee.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search employees, companies, designations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
              />
            </div>

            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all-companies">All Companies</SelectItem>
                {uniqueCompanies.map(company => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={designationFilter} onValueChange={setDesignationFilter}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                <SelectValue placeholder="Designation" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all-designations">All Designations</SelectItem>
                {uniqueDesignations.map(designation => (
                  <SelectItem key={designation} value={designation}>{designation}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Table */}
          <div className="rounded-lg overflow-hidden border border-slate-700">
            <Table>
              <TableHeader className="bg-slate-700/50">
                <TableRow className="border-slate-600">
                  <TableHead className="text-slate-300">Employee</TableHead>
                  <TableHead className="text-slate-300">Company</TableHead>
                  <TableHead className="text-slate-300">Designation</TableHead>
                  <TableHead className="text-slate-300">Duration</TableHead>
                  <TableHead className="text-slate-300">Experience</TableHead>
                  <TableHead className="text-slate-300">Last Salary</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-slate-400 py-8">
                      No previous employment records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployments.map((employment) => (
                    <TableRow key={employment.id} className="border-slate-700 hover:bg-slate-700/30">
                      <TableCell className="text-white font-medium">
                        {employment.employeeName}
                      </TableCell>
                      <TableCell className="text-slate-300">{employment.companyName}</TableCell>
                      <TableCell className="text-slate-300">{employment.designation}</TableCell>
                      <TableCell className="text-slate-300">
                        {employment.fromDate} to {employment.toDate}
                      </TableCell>
                      <TableCell className="text-slate-300">{employment.experience}</TableCell>
                      <TableCell className="text-slate-300">{employment.lastSalary}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentMode('edit')}
                            className="text-slate-300 border-slate-600 hover:bg-slate-700"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-400 border-red-600 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeePreviousEmployment;