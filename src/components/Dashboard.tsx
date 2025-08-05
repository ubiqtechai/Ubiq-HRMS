
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
      <div className="text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">Dashboard</h1>
        <p className="text-muted-foreground text-lg">Welcome back! Here's what's happening with your team today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card hover-lift group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm font-medium tracking-wide">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                    <p className="text-primary text-sm font-semibold">{stat.change} from last month</p>
                  </div>
                </div>
                <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="glass-card relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent/10 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-sm font-bold">
                    {activity.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-semibold">{activity.name}</p>
                  <p className="text-muted-foreground text-sm">{activity.action}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-xs">{activity.time}</p>
                  <div className={`w-3 h-3 rounded-full mt-1 ml-auto animate-pulse ${
                    activity.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                  }`}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass-card relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary" />
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { 
                title: "Add New Employee", 
                desc: "Onboard a new team member", 
                icon: Users, 
                onClick: () => setShowAddEmployee(true),
                gradient: "from-blue-500 to-purple-600"
              },
              { 
                title: "Generate Payroll", 
                desc: "Process monthly salaries", 
                icon: DollarSign,
                onClick: () => setShowGenPayroll(true),
                gradient: "from-green-500 to-emerald-600"
              },
              { 
                title: "Attendance Report", 
                desc: "View team attendance", 
                icon: Clock,
                onClick: () => navigate("/attendance"),
                gradient: "from-orange-500 to-red-600"
              },
              { 
                title: "Leave Approvals", 
                desc: "Review pending requests", 
                icon: Calendar,
                onClick: () => navigate("/leave"),
                gradient: "from-purple-500 to-pink-600"
              }
            ].map((action, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-accent/10 transition-all duration-300 hover:scale-105 hover:shadow-lg text-left group"
                onClick={action.onClick}
                type="button"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-foreground font-semibold">{action.title}</p>
                  <p className="text-muted-foreground text-sm">{action.desc}</p>
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
