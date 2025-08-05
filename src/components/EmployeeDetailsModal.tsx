
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Employee } from "@/lib/firebase";

interface EmployeeDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
}

const EmployeeDetailsModal = ({ open, onOpenChange, employee }: EmployeeDetailsModalProps) => {
  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
              {employee.avatar}
            </span>
            <div>
              <div className="text-xs text-slate-500">{employee.employeeId}</div>
              <span>{employee.name}</span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {employee.department} - {employee.role}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Employee Details</TabsTrigger>
            <TabsTrigger value="documents">Employee Document</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="font-semibold text-gray-200">Employee ID:</span> <span className="text-slate-300">{employee.employeeId}</span></div>
                  <div><span className="font-semibold text-gray-200">Email:</span> <span className="text-slate-300">{employee.email}</span></div>
                  <div><span className="font-semibold text-gray-200">Phone:</span> <span className="text-slate-300">{employee.phone}</span></div>
                  <div><span className="font-semibold text-gray-200">Location:</span> <span className="text-slate-300">{employee.location}</span></div>
                  <div><span className="font-semibold text-gray-200">Joining Date:</span> <span className="text-slate-300">{employee.joiningDate}</span></div>
                  <div><span className="font-semibold text-gray-200">Date of Birth:</span> <span className="text-slate-300">{employee.dateOfBirth}</span></div>
                  <div><span className="font-semibold text-gray-200">Blood Group:</span> <span className="text-slate-300">{employee.bloodGroup}</span></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center text-slate-400">
                  <p>No documents uploaded yet</p>
                  <p className="text-sm mt-2">Employee documents will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailsModal;
