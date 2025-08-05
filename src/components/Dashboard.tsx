
import { Users, Clock, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import AddEmployeeModal from "./AddEmployeeModal";
import GeneratePayrollModal from "./GeneratePayrollModal";
import { initialPayrollData } from "@/data/payrollData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Dynamically calculate total payroll and employee count
  const totalPayroll = initialPayrollData.reduce((acc, item) => acc + item.netSalary, 0);
  const totalEmployees = initialPayrollData.length;
  
  // Updated stats for 15 employees startup, now using real values
  const stats = [
    {
      title: "Total Employees",
      value: `${totalEmployees}`,
      change: "+1",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Present Today",
      value: "13",
      change: "+1",
      icon: Clock,
      color: "bg-green-500"
    },
    {
      title: "On Leave",
      value: "2",
      change: "0",
      icon: Calendar,
      color: "bg-yellow-500"
    },
    {
      title: "Total Payroll",
      value: `₹${totalPayroll.toLocaleString("en-IN")}`,
      change: "+₹50,000",
      icon: DollarSign,
      color: "bg-purple-500"
    }
  ];

  // Updated recent activities with Indian names
  const recentActivities = [
    { name: "Amit Shah", action: "marked attendance", time: "1 hour ago", status: "online" },
    { name: "Sneha Patel", action: "submitted leave request", time: "2 hours ago", status: "away" },
    { name: "Priya Verma", action: "updated profile", time: "4 hours ago", status: "online" },
    { name: "Vikram Kapoor", action: "applied for reimbursement", time: "6 hours ago", status: "online" },
    { name: "Ankit Singh", action: "added salary slip", time: "6 hours ago", status: "away" },
  ];

  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showGenPayroll, setShowGenPayroll] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back! Here's what's happening with your team today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 backdrop-blur-xl border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-green-400 text-sm font-medium mt-1">{stat.change} from last month</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {activity.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.name}</p>
                  <p className="text-slate-400 text-sm">{activity.action}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs">{activity.time}</p>
                  <div className={`w-2 h-2 rounded-full mt-1 ml-auto ${
                    activity.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                  }`}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { 
                title: "Add New Employee", 
                desc: "Onboard a new team member", 
                icon: Users, 
                onClick: () => setShowAddEmployee(true)
              },
              { 
                title: "Generate Payroll", 
                desc: "Process monthly salaries", 
                icon: DollarSign,
                onClick: () => setShowGenPayroll(true)
              },
              { 
                title: "Attendance Report", 
                desc: "View team attendance", 
                icon: Clock,
                onClick: () => navigate("/attendance")
              },
              { 
                title: "Leave Approvals", 
                desc: "Review pending requests", 
                icon: Calendar,
                onClick: () => navigate("/leave")
              }
            ].map((action, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-all duration-200 hover:scale-105 text-left"
                onClick={action.onClick}
                type="button"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{action.title}</p>
                  <p className="text-slate-400 text-sm">{action.desc}</p>
                </div>
              </button>
            ))}
          </CardContent>
          <AddEmployeeModal open={showAddEmployee} onOpenChange={setShowAddEmployee} />
          <GeneratePayrollModal open={showGenPayroll} onOpenChange={setShowGenPayroll} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
