
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
import { Label } from "@/components/ui/label";

type EditEmployeeModalProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  employee: {
    name: string;
    email: string;
    phone: string;
    department: string;
    role: string;
    location: string;
    joiningDate: string;
  } | null;
  onSave: (data: {
    name: string;
    email: string;
    phone: string;
    department: string;
    role: string;
    location: string;
    joiningDate: string;
  }) => void;
};

export default function EditEmployeeModal({
  open,
  onOpenChange,
  employee,
  onSave,
}: EditEmployeeModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  useEffect(() => {
    if (employee) {
      setName(employee.name || "");
      setEmail(employee.email || "");
      setPhone(employee.phone || "");
      setDepartment(employee.department || "");
      setRole(employee.role || "");
      setLocation(employee.location || "");
      setJoiningDate(employee.joiningDate || "");
    }
  }, [employee, open]);

  if (!employee) return null;

  const handleSave = () => {
    onSave({
      name,
      email,
      phone,
      department,
      role,
      location,
      joiningDate,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 w-full max-w-md p-0 max-h-screen overflow-y-auto">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Update employee information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="edit-name" className="text-slate-300 mb-1 block">
                Full Name
              </Label>
              <Input
                id="edit-name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="edit-email" className="text-slate-300 mb-1 block">
                Email
              </Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="edit-phone" className="text-slate-300 mb-1 block">
                Phone Number
              </Label>
              <Input
                id="edit-phone"
                placeholder="e.g. +91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="edit-department" className="text-slate-300 mb-1 block">
                Department
              </Label>
              <Input
                id="edit-department"
                placeholder="e.g. Engineering"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="edit-role" className="text-slate-300 mb-1 block">
                Role
              </Label>
              <Input
                id="edit-role"
                placeholder="e.g. Software Engineer"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="edit-location" className="text-slate-300 mb-1 block">
                Location
              </Label>
              <Input
                id="edit-location"
                placeholder="e.g. Mumbai, MH"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="edit-joiningDate" className="text-slate-300 mb-1 block">
                Joining Date
              </Label>
              <Input
                id="edit-joiningDate"
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" className="w-full mt-2" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSave}
              type="button"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
