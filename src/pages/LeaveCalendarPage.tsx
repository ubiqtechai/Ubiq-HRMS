
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { subscribeToLeaveRequests, LeaveRequest, getEmployees, Employee } from "@/lib/firebase";


const LEAVE_COLORS = {
  "Sick Leave": "bg-purple-400 text-purple-900",
  "Annual Leave": "bg-cyan-400 text-cyan-900", 
  "Personal Leave": "bg-red-400 text-red-900",
  "Casual Leave": "bg-green-400 text-green-900"
};

const LEAVE_LABELS = {
  "Sick Leave": "Sick leave",
  "Annual Leave": "Annual leave",
  "Personal Leave": "Personal leave", 
  "Casual Leave": "Casual leave"
};

export default function LeaveCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5)); // June 2025
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  // Load employees and subscribe to leave requests
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const employeeData = await getEmployees();
        setEmployees(employeeData);
      } catch (error) {
        console.error("Error loading employees:", error);
      }
    };

    const unsubscribe = subscribeToLeaveRequests((requests) => {
      setLeaveRequests(requests);
    });

    loadEmployees();
    return () => unsubscribe();
  }, []);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLeaveForDate = (date: number | null) => {
    if (!date) return [];
    const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date);
    const dateString = currentDate.toISOString().split('T')[0];
    
    return leaveRequests.filter(leave => {
      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
      return currentDate >= startDate && currentDate <= endDate && leave.status === "Approved";
    });
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="flex h-screen bg-background">
      {/* Employee Sidebar */}
      <div className="w-80 bg-card border-r border-border p-4">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Employees</h3>
        <div className="space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto">
        {filteredEmployees.map((employee) => (
            <div key={employee.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-foreground">{employee.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Calendar Area */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search employee"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          {/* Days of week header */}
          <div className="grid grid-cols-7 border-b border-border">
            {daysOfWeek.map((day) => (
              <div key={day} className="p-4 text-center text-sm font-medium text-muted-foreground bg-muted">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => (
              <div
                key={index}
                className="h-24 border-r border-b border-border p-2 relative bg-background"
              >
                {day && (
                  <>
                    <div className="text-sm text-foreground mb-1">{day}</div>
                    <div className="space-y-1">
                      {getLeaveForDate(day).map((leave, idx) => (
                        <div
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-full ${LEAVE_COLORS[leave.type as keyof typeof LEAVE_COLORS]} font-medium`}
                        >
                          {LEAVE_LABELS[leave.type as keyof typeof LEAVE_LABELS]}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
