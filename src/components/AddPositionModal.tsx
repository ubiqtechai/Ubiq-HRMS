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
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

type AddPositionModalProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAddPosition?: (position: {
    position: string;
    department: string;
    startDate: string;
    salary: string;
    manager: string;
  }) => void;
  editingPosition?: any;
};

export default function AddPositionModal({
  open,
  onOpenChange,
  onAddPosition,
  editingPosition,
}: AddPositionModalProps) {
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [salary, setSalary] = useState("");
  const [manager, setManager] = useState("");

  // Update form data when editing position changes
  useEffect(() => {
    if (editingPosition) {
      setPosition(editingPosition.position);
      setDepartment(editingPosition.department);
      setStartDate(editingPosition.startDate);
      setSalary(editingPosition.salary);
      setManager(editingPosition.manager);
    } else {
      setPosition("");
      setDepartment("");
      setStartDate("");
      setSalary("");
      setManager("");
    }
  }, [editingPosition]);

  const handleSave = () => {
    if (onAddPosition) {
      onAddPosition({
        position,
        department,
        startDate,
        salary,
        manager,
      });
    }
    onOpenChange(false);
    setPosition("");
    setDepartment("");
    setStartDate("");
    setSalary("");
    setManager("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 w-full max-w-md">
        <DialogHeader>
          <DialogTitle>{editingPosition ? 'Edit Position' : 'Add New Position'}</DialogTitle>
          <DialogDescription>
            {editingPosition ? 'Edit the position details.' : 'Add a new position to employee history.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="position" className="text-slate-300 mb-1 block">
              Position Title
            </Label>
            <Input
              id="position"
              placeholder="e.g. Senior Developer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="bg-slate-800 text-white border-slate-700"
              autoFocus
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
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-slate-800 text-white border-slate-700"
            />
          </div>
          <div>
            <Label htmlFor="startDate" className="text-slate-300 mb-1 block">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-slate-800 text-white border-slate-700"
            />
          </div>
          <div>
            <Label htmlFor="salary" className="text-slate-300 mb-1 block">
              Salary
            </Label>
            <Input
              id="salary"
              placeholder="e.g. $85,000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="bg-slate-800 text-white border-slate-700"
            />
          </div>
          <div>
            <Label htmlFor="manager" className="text-slate-300 mb-1 block">
              Manager
            </Label>
            <Input
              id="manager"
              placeholder="e.g. John Smith"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="bg-slate-800 text-white border-slate-700"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="ghost" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleSave}
          >
            {editingPosition ? 'Update Position' : 'Add Position'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}