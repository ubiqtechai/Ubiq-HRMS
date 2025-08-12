import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Eye, Copy, Trash2 } from "lucide-react";

const GenerateLetterHistory = () => {
  const letterHistory = [
    {
      id: 1,
      template: "Address Proof Letter",
      serialNo: "LETTER00052#",
      employee: "adarsh(UB001)",
      preparedOn: "05 Aug 2025",
      preparedBy: "adarshkumarsharma0...",
      status: "Generated",
      remarks: "",
      employeeRemarks: ""
    },
    {
      id: 2,
      template: "Appointment Order",
      serialNo: "LETTER00051#",
      employee: "adarsh(UB001)",
      preparedOn: "05 Aug 2025",
      preparedBy: "adarshkumarsharma0...",
      status: "Generated",
      remarks: "",
      employeeRemarks: ""
    },
    {
      id: 3,
      template: "Address Proof Letter",
      serialNo: "LETTER00050#",
      employee: "adarsh(UB001)",
      preparedOn: "04 Aug 2025",
      preparedBy: "adarshkumarsharma0...",
      status: "Generated",
      remarks: "",
      employeeRemarks: ""
    },
    {
      id: 4,
      template: "Address Proof Letter",
      serialNo: "LETTER00049#",
      employee: "adarsh(UB001)",
      preparedOn: "04 Aug 2025",
      preparedBy: "adarshkumarsharma0...",
      status: "Generated",
      remarks: "chch",
      employeeRemarks: ""
    },
    {
      id: 5,
      template: "Address Proof Letter",
      serialNo: "LETTER00048#",
      employee: "Dinesh Babu(T0046)",
      preparedOn: "04 Jun 2025",
      preparedBy: "Majordomo",
      status: "Generated",
      remarks: "",
      employeeRemarks: ""
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm">📄</span>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">
              Using greyHR, efficiently generate and publish employee letters in just a few minutes—streamlining your process and saving time.
            </p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Prepare Letter
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search"
            className="bg-muted border-border text-foreground placeholder-muted-foreground pl-10"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Letters Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Letter Template</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Serial No</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Employee</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Prepared On</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Prepared By</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Remarks</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Employee Remarks</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {letterHistory.map((letter) => (
                  <tr key={letter.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4 text-sm text-foreground">{letter.template}</td>
                    <td className="p-4 text-sm text-primary">{letter.serialNo}</td>
                    <td className="p-4 text-sm text-primary">{letter.employee}</td>
                    <td className="p-4 text-sm text-foreground">{letter.preparedOn}</td>
                    <td className="p-4 text-sm text-primary">{letter.preparedBy}</td>
                    <td className="p-4 text-sm text-foreground">{letter.status}</td>
                    <td className="p-4 text-sm text-foreground">{letter.remarks || "-"}</td>
                    <td className="p-4 text-sm text-foreground">{letter.employeeRemarks || "-"}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                          <Download className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                          <Trash2 className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateLetterHistory;