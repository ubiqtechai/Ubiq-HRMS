
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
import { useState } from "react";
import { Label } from "@/components/ui/label";

type AddEmployeeModalProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAddEmployee?: (employee: {
    employeeId: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    role: string;
    location: string;
    joiningDate: string;
    dateOfBirth: string;
    bloodGroup: string;
    avatar: string;
  }) => void;
};

export default function AddEmployeeModal({
  open,
  onOpenChange,
  onAddEmployee,
}: AddEmployeeModalProps) {
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const handleSave = () => {
    // Add employee to list on parent component
    if (onAddEmployee) {
      onAddEmployee({
        employeeId,
        name,
        email,
        phone,
        department,
        role,
        location,
        joiningDate,
        dateOfBirth,
        bloodGroup,
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(),
      });
    }
    onOpenChange(false);
    setEmployeeId("");
    setName("");
    setEmail("");
    setPhone("");
    setDepartment("");
    setRole("");
    setLocation("");
    setJoiningDate("");
    setDateOfBirth("");
    setBloodGroup("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 w-full max-w-md p-0 max-h-screen overflow-y-auto">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Enter employee information. (This is a placeholder form.)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="employeeId" className="text-slate-300 mb-1 block">
                Employee ID
              </Label>
              <Input
                id="employeeId"
                placeholder="e.g. EMP001"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="name" className="text-slate-300 mb-1 block">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-slate-300 mb-1 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-slate-300 mb-1 block">
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="e.g. +91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="department" className="text-slate-300 mb-1 block">
                Department
              </Label>
              <Input
                id="department"
                placeholder="e.g. Engineering"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-slate-300 mb-1 block">
                Role
              </Label>
              <Input
                id="role"
                placeholder="e.g. Software Engineer"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-slate-300 mb-1 block">
                Location
              </Label>
              <Input
                id="location"
                placeholder="e.g. Mumbai, MH"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="joiningDate" className="text-slate-300 mb-1 block">
                Joining Date
              </Label>
              <Input
                id="joiningDate"
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth" className="text-slate-300 mb-1 block">
                Date of Birth
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="bg-slate-800 text-white border-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="bloodGroup" className="text-slate-300 mb-1 block">
                Blood Group
              </Label>
              <Input
                id="bloodGroup"
                placeholder="e.g. A+, B-, O+, AB-"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
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
              Save Employee
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
