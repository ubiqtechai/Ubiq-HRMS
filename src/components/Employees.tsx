import { useState, useEffect } from "react";
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, FileText, Users, History, Briefcase, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddEmployeeModal from "@/components/AddEmployeeModal";
import EmployeeDetailsModal from "@/components/EmployeeDetailsModal";
import EditEmployeeModal from "@/components/EditEmployeeModal";
import EmployeeBankDetails from "@/components/EmployeeBankDetails";
import EmployeeFamilyInfo from "@/components/EmployeeFamilyInfo";
import EmployeePreviousEmployment from "@/components/EmployeePreviousEmployment";
import EmployeePositionHistory from "@/components/EmployeePositionHistory";
import GenerateLetterForm from "@/components/GenerateLetterForm";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { 
  Employee, 
  subscribeToEmployees, 
  deleteEmployee as deleteEmployeeFromDB, 
  updateEmployee as updateEmployeeInDB,
  addEmployee as addEmployeeToDB 
} from "@/lib/firebase";

const Employees = () => {
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeDocumentView, setActiveDocumentView] = useState<string | null>(null);
  const [activeAdminView, setActiveAdminView] = useState<string | null>(null);

  // Employees state
  const [employees, setEmployees] = useState<Employee[]>([]);
  // For view details dialog
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [employeeToView, setEmployeeToView] = useState<Employee | null>(null);
  // For delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  // Edit Employee modal state
  const [editOpen, setEditOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  // Subscribe to Firebase employees collection
  useEffect(() => {
    const unsubscribe = subscribeToEmployees((employeesData) => {
      setEmployees(employeesData);
    });

    return () => unsubscribe();
  }, []);

  // Add a new employee from modal
  const handleAddEmployee = async (employee: Omit<Employee, "id" | "avatar">) => {
    try {
      // Generate avatar from name
      const nameTrim = employee.name.trim();
      let avatar = "";
      if (nameTrim.length > 0) {
        const split = nameTrim.split(" ");
        avatar = (split[0]?.[0] || "") + (split[1]?.[0] || split[0]?.[1] || "");
        avatar = avatar.toUpperCase();
      }
      
      await addEmployeeToDB({
        ...employee,
        avatar: avatar || "?"
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler used when confirm delete is clicked
  const handleDeleteEmployee = async () => {
    if (employeeToDelete) {
      try {
        await deleteEmployeeFromDB(employeeToDelete);
        setEmployeeToDelete(null);
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  // Open details modal
  const handleViewDetails = (employeeId: string) => {
    const foundEmployee = employees.find(emp => emp.id === employeeId) || null;
    setEmployeeToView(foundEmployee);
    setDetailsOpen(true);
  };

  // Edit Employee handler
  const handleOpenEdit = (employeeId: string) => {
    const found = employees.find(emp => emp.id === employeeId) || null;
    setEmployeeToEdit(found);
    setEditOpen(true);
  };

  const handleSaveEditEmployee = async (data: {
    name: string;
    email: string;
    phone: string;
    department: string;
    role: string;
    location: string;
    joiningDate: string;
  }) => {
    if (!employeeToEdit?.id) return;
    
    try {
      // Generate new avatar if name changed
      const nameTrim = data.name.trim();
      let avatar = "";
      if (nameTrim.length > 0) {
        const split = nameTrim.split(" ");
        avatar = (split[0]?.[0] || "") + (split[1]?.[0] || split[0]?.[1] || "");
        avatar = avatar.toUpperCase();
      }

      await updateEmployeeInDB(employeeToEdit.id, {
        ...data,
        avatar: avatar || "?"
      });
      setEmployeeToEdit(null);
      setEditOpen(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Add Employee Modal */}
      <AddEmployeeModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAddEmployee={handleAddEmployee}
      />

      {/* Edit Employee Modal */}
      <EditEmployeeModal
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setEmployeeToEdit(null);
        }}
        employee={employeeToEdit}
        onSave={handleSaveEditEmployee}
      />

      {/* Employee Details Modal */}
      <EmployeeDetailsModal
        open={detailsOpen}
        onOpenChange={(open) => {
          setDetailsOpen(open);
          if (!open) setEmployeeToView(null);
        }}
        employee={employeeToView}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Employee?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this employee? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEmployeeToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteEmployee}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Employees</h1>
          <p className="text-slate-400">Manage your team members and documents</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Main Tabs Container */}
      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
          <TabsTrigger 
            value="employees" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
          >
            <Users className="w-4 h-4 mr-2" />
            Employees
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
          >
            <FileText className="w-4 h-4 mr-2" />
            Employee Documents
          </TabsTrigger>
          <TabsTrigger 
            value="admin" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
          >
            <Building className="w-4 h-4 mr-2" />
            Admin
          </TabsTrigger>
        </TabsList>

        {/* Employees Tab Content */}
        <TabsContent value="employees" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className={viewMode === "table" ? "bg-blue-600" : "border-slate-600 text-slate-400"}
                  >
                    Table view
                  </Button>
                  <Button
                    variant={viewMode === "cards" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("cards")}
                    className={viewMode === "cards" ? "bg-blue-600" : "border-slate-600 text-slate-400"}
                  >
                    Cards view
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Count */}
          <div className="text-slate-400 text-sm">
            All employees • 1-{filteredEmployees.length} of {employees.length}
          </div>

          {/* Table View */}
          {viewMode === "table" && (
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
              <CardContent className="p-0">
                <div className="overflow-hidden">
                  <table className="w-full">
                    <thead className="border-b border-slate-700">
                      <tr className="text-left">
                        <th className="p-4 text-slate-400 font-medium">
                          <input type="checkbox" className="rounded border-slate-600 bg-slate-700" />
                        </th>
                        <th className="p-4 text-slate-400 font-medium">NAME</th>
                        <th className="p-4 text-slate-400 font-medium">EMPLOYEE ID</th>
                        <th className="p-4 text-slate-400 font-medium">DEPARTMENT</th>
                        <th className="p-4 text-slate-400 font-medium">ROLE</th>
                        <th className="p-4 text-slate-400 font-medium">DOB</th>
                        <th className="p-4 text-slate-400 font-medium">BLOOD GROUP</th>
                        <th className="p-4 text-slate-400 font-medium">PHONE</th>
                        <th className="p-4 text-slate-400 font-medium">LOCATION</th>
                        <th className="p-4 text-slate-400 font-medium">JOINING DATE</th>
                        <th className="p-4 text-slate-400 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((employee, index) => (
                        <tr key={employee.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                          <td className="p-4">
                            <input type="checkbox" className="rounded border-slate-600 bg-slate-700" />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">{employee.avatar}</span>
                              </div>
                              <div>
                                <div className="text-white font-medium">{employee.name}</div>
                                <div className="text-slate-400 text-sm">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-slate-300">{employee.employeeId || 'N/A'}</td>
                          <td className="p-4 text-slate-300">{employee.department}</td>
                          <td className="p-4 text-slate-300">{employee.role}</td>
                          <td className="p-4 text-slate-300">{employee.dateOfBirth || 'N/A'}</td>
                          <td className="p-4 text-slate-300">{employee.bloodGroup || 'N/A'}</td>
                          <td className="p-4 text-slate-300">{employee.phone}</td>
                          <td className="p-4 text-slate-300">{employee.location}</td>
                          <td className="p-4 text-slate-300">{employee.joiningDate}</td>
                          <td className="p-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-slate-800 border-slate-700" align="end">
                                <DropdownMenuItem
                                  className="text-slate-300 hover:bg-slate-700"
                                  onClick={() => handleViewDetails(employee.id)}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-slate-300 hover:bg-slate-700"
                                  onClick={() => handleOpenEdit(employee.id)}
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-400 hover:bg-slate-700"
                                  onClick={() => {
                                    setEmployeeToDelete(employee.id);
                                    setDeleteDialogOpen(true);
                                  }}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Cards View */}
          {viewMode === "cards" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <Card key={employee.id} className="bg-slate-800/50 backdrop-blur-xl border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-semibold">{employee.avatar}</span>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{employee.name}</h3>
                            <p className="text-slate-400 text-sm">{employee.role}</p>
                            <p className="text-slate-400 text-sm">{employee.department}</p>
                          </div>
                        </div>
                      </div>
                    
                      <div className="space-y-2 text-sm">
                        <p className="text-slate-300">{employee.email}</p>
                        <p className="text-slate-300">{employee.phone}</p>
                        <p className="text-slate-300">{employee.location}</p>
                        <p className="text-slate-300">Joined: {employee.joiningDate}</p>
                      </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Employee Documents Tab Content */}
        <TabsContent value="documents" className="space-y-6">
          {!activeDocumentView && (
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 border-slate-600 hover:bg-slate-700/50 text-slate-300"
                    onClick={() => setActiveDocumentView('bank')}
                  >
                    <Building className="w-6 h-6" />
                    <span>Bank Details</span>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 border-slate-600 hover:bg-slate-700/50 text-slate-300"
                    onClick={() => setActiveDocumentView('family')}
                  >
                    <Users className="w-6 h-6" />
                    <span>Family Information</span>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 border-slate-600 hover:bg-slate-700/50 text-slate-300"
                    onClick={() => setActiveDocumentView('employment')}
                  >
                    <Briefcase className="w-6 h-6" />
                    <span>Previous Employment</span>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 border-slate-600 hover:bg-slate-700/50 text-slate-300"
                    onClick={() => setActiveDocumentView('positions')}
                  >
                    <History className="w-6 h-6" />
                    <span>Position History</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Render the active document view */}
          {activeDocumentView && (
            <div>
              <Button 
                variant="outline" 
                onClick={() => setActiveDocumentView(null)}
                className="mb-4 border-slate-600 text-slate-300 hover:bg-slate-700/50"
              >
                ← Back to Documents
              </Button>
              {activeDocumentView === 'bank' && <EmployeeBankDetails />}
              {activeDocumentView === 'family' && <EmployeeFamilyInfo />}
              {activeDocumentView === 'employment' && <EmployeePreviousEmployment />}
              {activeDocumentView === 'positions' && <EmployeePositionHistory />}
            </div>
          )}
        </TabsContent>

        {/* Admin Tab Content */}
        <TabsContent value="admin" className="space-y-6">
          {!activeAdminView && (
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center gap-2 border-slate-600 hover:bg-slate-700/50 text-slate-300"
                    onClick={() => setActiveAdminView('letter')}
                  >
                    <FileText className="w-6 h-6" />
                    <span>Generate Letter</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Render the active admin view */}
          {activeAdminView && (
            <div>
              <Button 
                variant="outline" 
                onClick={() => setActiveAdminView(null)}
                className="mb-4 border-slate-600 text-slate-300 hover:bg-slate-700/50"
              >
                ← Back to Admin
              </Button>
              {activeAdminView === 'letter' && <GenerateLetterForm />}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Employees;
