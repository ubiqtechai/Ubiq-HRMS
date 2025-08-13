
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";

// Sample employee data
const EMPLOYEES = [
  { id: 1, name: "Manikandan", avatar: "/lovable-uploads/placeholder-avatar.jpg" },
  { id: 2, name: "Gokulakrishnan", avatar: "/lovable-uploads/placeholder-avatar.jpg" },
  { id: 3, name: "Praveen Kumar", avatar: "/lovable-uploads/placeholder-avatar.jpg" },
  { id: 4, name: "Sankar", avatar: "/lovable-uploads/placeholder-avatar.jpg" },
  { id: 5, name: "Faris", avatar: "/lovable-uploads/placeholder-avatar.jpg" },
  { id: 6, name: "Muthukrishnan", avatar: "/lovable-uploads/placeholder-avatar.jpg" },
  { id: 7, name: "Salman", avatar: "/lovable-uploads/placeholder-avatar.jpg" },
  { id: 8, name: "Steve Smith", avatar: "/lovable-uploads/placeholder-avatar.jpg" },
  { id: 9, name: "Emma Lamb", avatar: "/lovable-uploads/placeholder-avatar.jpg" },
  { id: 10, name: "Alexandra", avatar: "/lovable-uploads/placeholder-avatar.jpg" },
  { id: 11, name: "Patrick", avatar: "/lovable-uploads/placeholder-avatar.jpg" },
];

// Sample leave data
const LEAVE_DATA = [
  { date: 2, type: "casual", employee: "Gokulakrishnan" },
  { date: 5, type: "sick", employee: "Manikandan" },
  { date: 10, type: "paid", employee: "Praveen Kumar" },
  { date: 16, type: "sick", employee: "Sankar" },
  { date: 20, type: "casual", employee: "Faris" },
  { date: 25, type: "paid", employee: "Emma Lamb" },
  { date: 26, type: "paid", employee: "Alexandra" },
  { date: 30, type: "casual", employee: "Patrick" },
];

const LEAVE_COLORS = {
  casual: "bg-cyan-400 text-cyan-900",
  sick: "bg-purple-400 text-purple-900", 
  paid: "bg-red-400 text-red-900"
};

const LEAVE_LABELS = {
  casual: "Casual leave",
  sick: "Sick leave",
  paid: "Paid time off"
};

export default function LeaveCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5)); // June 2025
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("2025");

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

  const filteredEmployees = EMPLOYEES.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLeaveForDate = (date: number | null) => {
    if (!date) return [];
    return LEAVE_DATA.filter(leave => leave.date === date);
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
