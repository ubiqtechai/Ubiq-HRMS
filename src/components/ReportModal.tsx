
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

export default function ReportModal({ open, onOpenChange }: { open: boolean, onOpenChange: (v: boolean) => void }) {
  const [reportName, setReportName] = useState("");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Create Report</DialogTitle>
          <DialogDescription>
            Fill out report details. (Placeholder form — extend as needed)
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input 
            placeholder="Report Name" 
            value={reportName}
            onChange={e => setReportName(e.target.value)}
            className="bg-slate-800 text-white border-slate-700"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="w-full mt-2" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Create Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
