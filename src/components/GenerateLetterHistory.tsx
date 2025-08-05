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
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white text-sm">📄</span>
          </div>
          <div>
            <p className="text-slate-400 text-sm">
              Using greyHR, efficiently generate and publish employee letters in just a few minutes—streamlining your process and saving time.
            </p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Prepare Letter
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search"
            className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 pl-10"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Letters Table */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Letter Template</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Serial No</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Employee</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Prepared On</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Prepared By</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Remarks</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Employee Remarks</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {letterHistory.map((letter) => (
                  <tr key={letter.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                    <td className="p-4 text-sm text-slate-300">{letter.template}</td>
                    <td className="p-4 text-sm text-blue-400">{letter.serialNo}</td>
                    <td className="p-4 text-sm text-blue-400">{letter.employee}</td>
                    <td className="p-4 text-sm text-slate-300">{letter.preparedOn}</td>
                    <td className="p-4 text-sm text-blue-400">{letter.preparedBy}</td>
                    <td className="p-4 text-sm text-slate-300">{letter.status}</td>
                    <td className="p-4 text-sm text-slate-300">{letter.remarks || "-"}</td>
                    <td className="p-4 text-sm text-slate-300">{letter.employeeRemarks || "-"}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-600">
                          <Download className="w-4 h-4 text-slate-400" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-600">
                          <Eye className="w-4 h-4 text-slate-400" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-600">
                          <Copy className="w-4 h-4 text-slate-400" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-600">
                          <Trash2 className="w-4 h-4 text-slate-400" />
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