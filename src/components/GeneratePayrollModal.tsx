
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
import { useState } from "react";

export default function GeneratePayrollModal({ open, onOpenChange }: { open: boolean, onOpenChange: (v: boolean) => void }) {
  const [processing, setProcessing] = useState(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Payroll</DialogTitle>
          <DialogDescription>
            This is a placeholder for bulk payroll generation.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-slate-400">
          Processing payroll for all eligible employees.
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
              setProcessing(true);
              setTimeout(() => {
                setProcessing(false);
                onOpenChange(false);
              }, 1200);
            }}
            disabled={processing}
          >
            {processing ? "Processing..." : "Generate Payroll"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
