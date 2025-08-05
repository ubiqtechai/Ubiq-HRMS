
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Employee Details</TabsTrigger>
            <TabsTrigger value="documents">Employee Document</TabsTrigger>
            <TabsTrigger value="employee-documents">Employee Documents</TabsTrigger>
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
          
          <TabsContent value="employee-documents" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-medium">Document Management</h3>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        id="document-upload"
                        className="hidden"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <label
                        htmlFor="document-upload"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 text-sm"
                      >
                        Upload Document
                      </label>
                    </div>
                  </div>
                  
                  <div className="border border-slate-600 rounded-lg">
                    <div className="grid grid-cols-5 gap-4 p-3 bg-slate-700/50 text-sm font-medium text-slate-300 border-b border-slate-600">
                      <div>Document Name</div>
                      <div>Type</div>
                      <div>Upload Date</div>
                      <div>Size</div>
                      <div>Actions</div>
                    </div>
                    
                    <div className="p-8 text-center text-slate-400">
                      <p>No documents uploaded yet</p>
                      <p className="text-sm mt-1">Upload documents using the button above</p>
                    </div>
                  </div>
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
