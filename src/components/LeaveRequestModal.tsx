import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

type LeaveRequestModalProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialReason?: string;
  initialType?: string;
  initialStartDate?: string;
  initialEndDate?: string;
  initialStatus?: string;
  initialEmployee?: string;
  onSubmit?: (data: {
    reason: string;
    type: string;
    startDate: string;
    endDate: string;
    status?: string;
    employee?: string;
  }) => void;
  isEdit?: boolean;
};

export default function LeaveRequestModal({
  open,
  onOpenChange,
  initialReason = "",
  initialType = "",
  initialStartDate = "",
  initialEndDate = "",
  initialStatus = "Pending",
  initialEmployee = "",
  onSubmit,
  isEdit = false,
}: LeaveRequestModalProps) {
  const [reason, setReason] = useState(initialReason);
  const [type, setType] = useState(initialType);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [status, setStatus] = useState(initialStatus);
  const [employee, setEmployee] = useState(initialEmployee);

  useEffect(() => {
    if (open) {
      setReason(initialReason);
      setType(initialType);
      setStartDate(initialStartDate);
      setEndDate(initialEndDate);
      setStatus(initialStatus);
      setEmployee(initialEmployee);
    }
  }, [open, initialReason, initialType, initialStartDate, initialEndDate, initialStatus, initialEmployee]);

  const handleSubmit = () => {
    if (!reason || !type || !startDate || !endDate || (!isEdit && !employee)) return;
    onSubmit?.({ reason, type, startDate, endDate, status: isEdit ? status : undefined, employee: !isEdit ? employee : undefined });
    onOpenChange(false);
  };

  // Show employee name input only if creating (not editing)
  const showEmployeeInput = !isEdit;

  // Show status dropdown only if edit mode
  const showStatusDropdown = isEdit;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 w-full max-w-md z-[100]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Leave Request" : "New Leave Request"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modify your leave information below."
              : "Fill out your leave information."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {showEmployeeInput && (
            <Input
              placeholder="Employee Name"
              value={employee}
              onChange={e => setEmployee(e.target.value)}
              className="bg-slate-800 text-white border-slate-700"
            />
          )}
          <div>
            <label className="block text-slate-400 text-sm mb-1">Leave Type</label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full bg-slate-800 text-white border border-slate-700 rounded px-3 py-2 z-50"
              style={{ backgroundColor: '#1e293b', zIndex: 50 }}
            >
              <option value="">Select Leave Type</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
              <option value="Study Leave">Study Leave</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Start Date (YYYY-MM-DD)"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="bg-slate-800 text-white border-slate-700"
              type="date"
            />
            <Input
              placeholder="End Date (YYYY-MM-DD)"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="bg-slate-800 text-white border-slate-700"
              type="date"
            />
          </div>
          <Input
            placeholder="Reason for leave"
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="bg-slate-800 text-white border-slate-700"
          />
          {showStatusDropdown && (
            <div>
              <label className="block text-slate-400 text-sm mb-1">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full bg-slate-800 text-white border border-slate-700 rounded px-3 py-2 z-50"
                style={{ backgroundColor: '#1e293b', zIndex: 50 }}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="w-full mt-2" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
            type="button"
            onClick={handleSubmit}
          >
            {isEdit ? "Save Changes" : "Submit Leave"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
