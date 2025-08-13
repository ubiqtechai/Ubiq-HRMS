
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List, Dot } from "lucide-react";

// Holiday data
const HOLIDAYS_2024 = [
  { name: "New Year Day", day: "Monday", date: "January 1", month: 0, dayOfMonth: 1, description: "Credit union branches will be closed from 09:00 AM to 05:00 PM" },
  { name: "Martin Luther King Jr Day", day: "Tuesday", date: "January 16", month: 0, dayOfMonth: 16, description: "Credit union branches will be closed from 09:00 AM to 05:00 PM" },
  { name: "Good Friday", day: "Friday", date: "April 7", month: 3, dayOfMonth: 7, description: "Credit union branches will be closed from 09:00 AM to 05:00 PM" },
  { name: "Memorial Day", day: "Monday", date: "May 29", month: 4, dayOfMonth: 29, description: "Credit union branches will be closed from 09:00 AM to 05:00 PM" },
  { name: "Independence Day", day: "Tuesday", date: "June 4", month: 5, dayOfMonth: 4, description: "Credit union branches will be closed from 09:00 AM to 05:00 PM" },
  { name: "Labor Day", day: "Monday", date: "September 4", month: 8, dayOfMonth: 4, description: "Credit union branches will be closed from 09:00 AM to 05:00 PM" },
  { name: "Thanksgiving Day", day: "Thursday", date: "November 23", month: 10, dayOfMonth: 23, description: "Credit union branches will be closed from 09:00 AM to 05:00 PM" },
  { name: "Day after Thanksgiving Day", day: "Friday", date: "November 24", month: 10, dayOfMonth: 24, description: "Credit union branches will be closed from 09:00 AM to 05:00 PM" },
  { name: "Christmas Holiday", day: "Monday", date: "December 25", month: 11, dayOfMonth: 25, description: "Credit union branches will be closed from 09:00 AM to 05:00 PM" },
  { name: "Christmas Holiday", day: "Monday", date: "December 26", month: 11, dayOfMonth: 26, description: "Credit union branches will be closed from 09:00 AM to 05:00 PM" },
];

const MONTH_NAMES = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const FULL_MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function HolidayCalendarPage() {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // Start with January 2024

  const getCurrentAndNextMonth = () => {
    const current = new Date(currentDate);
    const next = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    return { current, next };
  };

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

  const getHolidayForDate = (month: number, day: number) => {
    return HOLIDAYS_2024.find(holiday => holiday.month === month && holiday.dayOfMonth === day);
  };

  const getTodayHoliday = () => {
    const today = new Date();
    return HOLIDAYS_2024.find(holiday => {
      const holidayDate = new Date(2024, holiday.month, holiday.dayOfMonth);
      return holidayDate.toDateString() === today.toDateString();
    });
  };

  const getUpcomingHoliday = () => {
    const today = new Date();
    return HOLIDAYS_2024.find(holiday => {
      const holidayDate = new Date(2024, holiday.month, holiday.dayOfMonth);
      return holidayDate > today;
    });
  };

  const navigateCalendar = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarMonth = (date: Date) => {
    const days = getDaysInMonth(date);
    const month = date.getMonth();
    const year = date.getFullYear();

    return (
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-center mb-4 text-foreground">
          {MONTH_NAMES[month]} {year}
        </h3>
        <div className="grid grid-cols-7 gap-1">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            const holiday = day ? getHolidayForDate(month, day) : null;
            const isToday = day && new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
            
            return (
              <div
                key={index}
                className={`h-10 flex items-center justify-center text-sm relative ${
                  day 
                    ? holiday 
                      ? "bg-red-500 text-white rounded-full font-medium" 
                      : isToday
                      ? "bg-primary text-primary-foreground rounded-full font-medium"
                      : "text-foreground hover:bg-muted rounded-full cursor-pointer"
                    : ""
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const todayHoliday = getTodayHoliday();
  const upcomingHoliday = getUpcomingHoliday();
  const { current, next } = getCurrentAndNextMonth();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Holiday Calendar</h1>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              List
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className="flex items-center gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </Button>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Illustration and info */}
            <div className="space-y-6">
              {/* Decorative illustration placeholder */}
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏖️</div>
                  <p className="text-muted-foreground">Holiday Calendar</p>
                </div>
              </div>

              {/* Today's holiday */}
              {todayHoliday && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Dot className="h-6 w-6 text-green-500" />
                      <span className="font-medium text-foreground">Today</span>
                      <span className="text-sm text-muted-foreground">2024 {todayHoliday.date}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{todayHoliday.name}</h3>
                    <p className="text-sm text-muted-foreground">{todayHoliday.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Upcoming holiday */}
              {upcomingHoliday && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Dot className="h-6 w-6 text-orange-500" />
                      <span className="font-medium text-foreground">Upcoming</span>
                      <span className="text-sm text-muted-foreground">2024 {upcomingHoliday.date}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{upcomingHoliday.name}</h3>
                    <p className="text-sm text-muted-foreground">{upcomingHoliday.description}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right side - Holiday list */}
            <div>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 mb-4 font-medium text-muted-foreground text-sm">
                  <div>HOLIDAY</div>
                  <div>DAY</div>
                  <div>DATE</div>
                </div>
                <div className="space-y-3">
                  {HOLIDAYS_2024.map((holiday, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 py-2 border-l-4 border-primary pl-4">
                      <div className="font-medium text-foreground">{holiday.name}</div>
                      <div className="text-muted-foreground">{holiday.day}</div>
                      <div className="text-muted-foreground">{holiday.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Calendar view */}
            <div className="flex justify-center items-center mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateCalendar("prev")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="mx-4 text-sm text-muted-foreground">Navigate months</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateCalendar("next")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-8 mb-6">
              {renderCalendarMonth(current)}
              {renderCalendarMonth(next)}
            </div>

            {/* Bottom info for calendar view */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todayHoliday && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Dot className="h-6 w-6 text-green-500" />
                      <span className="font-medium text-foreground">Today</span>
                      <span className="text-sm text-muted-foreground">2024 {todayHoliday.date}</span>
                    </div>
                    <h3 className="font-semibold text-foreground">{todayHoliday.name}</h3>
                    <p className="text-sm text-muted-foreground">{todayHoliday.description}</p>
                  </CardContent>
                </Card>
              )}

              {upcomingHoliday && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Dot className="h-6 w-6 text-orange-500" />
                      <span className="font-medium text-foreground">Upcoming</span>
                      <span className="text-sm text-muted-foreground">2024 {upcomingHoliday.date}</span>
                    </div>
                    <h3 className="font-semibold text-foreground">{upcomingHoliday.name}</h3>
                    <p className="text-sm text-muted-foreground">{upcomingHoliday.description}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
