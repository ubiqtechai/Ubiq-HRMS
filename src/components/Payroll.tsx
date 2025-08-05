
import { useState } from "react";
import { Download, Plus, Filter, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { initialPayrollData } from "@/data/payrollData";

// Simple dot icon as a placeholder instead of DollarSign
const DotIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
    <circle cx="12" cy="12" r="6" fill="currentColor" />
  </svg>
);

const salaryStats = [
  { title: "Total Payroll", value: "₹9.8L", change: "+6%", color: "text-green-400" },
  { title: "Processed", value: "6", change: "+2%", color: "text-blue-400" },
  { title: "Pending", value: "2", change: "-1%", color: "text-yellow-400" },
  { title: "Average Salary", value: "₹67,638", change: "+2.5%", color: "text-purple-400" }
];

const CURRENT_MONTH = "June 2024";

const Payroll = () => {
  const [activeTab, setActiveTab] = useState("payroll");
  const [payrollData, setPayrollData] = useState(initialPayrollData);

  const processPayroll = (id: string) => {
    console.log("Processing payroll for ID:", id);
    setPayrollData((prev) => {
      const updated = prev.map((item) =>
        item.id === id
          ? { ...item, status: "Processed" }
          : item
      );
      console.log("Payroll data after processing:", updated);
      return updated;
    });
    toast({
      title: "Payroll Processed",
      description: "Payroll status updated to 'Processed'.",
    });
  };

  // Filter data depending on tab
  const filteredPayrollData = payrollData.filter((item) =>
    activeTab === "payroll"
      ? item.month === CURRENT_MONTH
      : item.month !== CURRENT_MONTH
  );

  const totalAmount = filteredPayrollData.reduce((acc, item) => acc + item.netSalary, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Payroll Management</h1>
          <p className="text-slate-400">Manage employee salaries and payroll processing</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-600 text-slate-400">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {salaryStats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 backdrop-blur-xl border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                  <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                  <p className="text-green-400 text-sm font-medium mt-1">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    {stat.change} from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <DotIcon />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tab Navigation & Table */}
      <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg backdrop-blur-xl border border-slate-700">
        {[
          { id: "payroll", label: "Monthly Payroll", icon: DotIcon },
          { id: "history", label: "Payment History", icon: Calendar }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Payroll Table */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">
            {activeTab === "payroll" ? `${CURRENT_MONTH} Payroll` : "Payment History"}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-slate-600 text-slate-400">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-slate-700">
                <tr className="text-left">
                  <th className="p-4 text-slate-400 font-medium">EMPLOYEE</th>
                  <th className="p-4 text-slate-400 font-medium">BASIC SALARY</th>
                  <th className="p-4 text-slate-400 font-medium">ALLOWANCES</th>
                  <th className="p-4 text-slate-400 font-medium">DEDUCTIONS</th>
                  <th className="p-4 text-slate-400 font-medium">NET SALARY</th>
                  <th className="p-4 text-slate-400 font-medium">STATUS</th>
                  <th className="p-4 text-slate-400 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayrollData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      {activeTab === "payroll"
                        ? "No payroll data found for this month."
                        : "No payment history available."}
                    </td>
                  </tr>
                ) : (
                  filteredPayrollData.map((record) => (
                    <tr key={record.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">{record.avatar}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{record.employee}</div>
                            <div className="text-slate-400 text-sm">{record.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-300">₹{record.basicSalary.toLocaleString("en-IN")}</td>
                      <td className="p-4 text-green-400">₹{record.allowances.toLocaleString("en-IN")}</td>
                      <td className="p-4 text-red-400">₹{record.deductions.toLocaleString("en-IN")}</td>
                      <td className="p-4 text-white font-semibold">₹{record.netSalary.toLocaleString("en-IN")}</td>
                      <td className="p-4">
                        <Badge 
                          variant="outline" 
                          className={`${
                            record.status === 'Processed' 
                              ? 'border-green-400 text-green-400' 
                              : 'border-yellow-400 text-yellow-400'
                          }`}
                        >
                          {record.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-400">
                            View Slip
                          </Button>
                          {record.status === "Pending" && (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => processPayroll(record.id)}
                            >
                              Process
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Payroll Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm">Total Employees</p>
              <p className="text-2xl font-bold text-white mt-1">{filteredPayrollData.length}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm">Total Amount</p>
              <p className="text-2xl font-bold text-green-400 mt-1">
                ₹{totalAmount.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm">Processing Fee</p>
              <p className="text-2xl font-bold text-red-400 mt-1">₹19,800</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payroll;
