
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
              {employee.avatar}
            </span>
            <span>{employee.name}</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {employee.department} - {employee.role}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 mt-4 text-sm">
          <div><span className="font-semibold text-gray-200">Email:</span> <span className="text-slate-300">{employee.email}</span></div>
          <div><span className="font-semibold text-gray-200">Phone:</span> <span className="text-slate-300">{employee.phone}</span></div>
          <div><span className="font-semibold text-gray-200">Location:</span> <span className="text-slate-300">{employee.location}</span></div>
          <div><span className="font-semibold text-gray-200">Joining Date:</span> <span className="text-slate-300">{employee.joiningDate}</span></div>
          <div><span className="font-semibold text-gray-200">ID:</span> <span className="text-slate-300">{employee.id}</span></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailsModal;
