import { useState } from "react";
import { Calendar, Clock, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const attendanceData = [
    { id: "EMP001", name: "Amit Shah", checkIn: "09:10 AM", checkOut: "06:15 PM", workHours: "9h 05m", status: "Present", avatar: "AS" },
    { id: "EMP002", name: "Sneha Patel", checkIn: "09:30 AM", checkOut: "06:45 PM", workHours: "9h 15m", status: "Present", avatar: "SP" },
    { id: "EMP003", name: "Priya Verma", checkIn: "09:05 AM", checkOut: "06:00 PM", workHours: "8h 55m", status: "Present", avatar: "PV" },
    { id: "EMP004", name: "Vikram Kapoor", checkIn: "10:00 AM", checkOut: "07:00 PM", workHours: "9h 00m", status: "Present", avatar: "VK" },
    { id: "EMP005", name: "Ankit Singh", checkIn: "-", checkOut: "-", workHours: "-", status: "Absent", avatar: "AS" },
    { id: "EMP006", name: "Neha Reddy", checkIn: "09:20 AM", checkOut: "06:25 PM", workHours: "9h 05m", status: "Present", avatar: "NR" },
    { id: "EMP007", name: "Rohan Kumar", checkIn: "09:35 AM", checkOut: "06:30 PM", workHours: "8h 55m", status: "Present", avatar: "RK" },
    { id: "EMP008", name: "Meera Mishra", checkIn: "09:25 AM", checkOut: "06:10 PM", workHours: "8h 45m", status: "Present", avatar: "MM" },
    { id: "EMP009", name: "Farhan Ali", checkIn: "10:10 AM", checkOut: "07:05 PM", workHours: "8h 55m", status: "Present", avatar: "FA" },
    { id: "EMP010", name: "Lakshmi Nair", checkIn: "-", checkOut: "-", workHours: "-", status: "Absent", avatar: "LN" },
    { id: "EMP011", name: "Kunal Joshi", checkIn: "09:40 AM", checkOut: "06:20 PM", workHours: "8h 40m", status: "Present", avatar: "KJ" },
    { id: "EMP012", name: "Harshita Dutt", checkIn: "09:10 AM", checkOut: "06:00 PM", workHours: "8h 50m", status: "Present", avatar: "HD" },
    { id: "EMP013", name: "Divya Shukla", checkIn: "08:55 AM", checkOut: "05:45 PM", workHours: "8h 50m", status: "Present", avatar: "DS" },
    { id: "EMP014", name: "Rahul Mehta", checkIn: "09:45 AM", checkOut: "06:30 PM", workHours: "8h 45m", status: "Present", avatar: "RM" },
    { id: "EMP015", name: "Tanvi Desai", checkIn: "-", checkOut: "-", workHours: "-", status: "Absent", avatar: "TD" },
  ];

  const stats = [
    { title: "Total Present", value: "12", color: "text-green-400" },
    { title: "Total Absent", value: "3", color: "text-red-400" },
    { title: "On Leave", value: "2", color: "text-yellow-400" },
    { title: "Average Hours", value: "8.8h", color: "text-blue-400" }
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Attendance</h1>
          <p className="text-slate-400">Track employee attendance and working hours</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-600 text-slate-400">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Clock className="w-4 h-4 mr-2" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
            <CardContent className="p-6 text-center">
              <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
              <p className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <Button variant="outline" className="border-slate-600 text-slate-400">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-slate-700">
                <tr className="text-left">
                  <th className="p-4 text-slate-400 font-medium">EMPLOYEE</th>
                  <th className="p-4 text-slate-400 font-medium">CHECK IN</th>
                  <th className="p-4 text-slate-400 font-medium">CHECK OUT</th>
                  <th className="p-4 text-slate-400 font-medium">WORK HOURS</th>
                  <th className="p-4 text-slate-400 font-medium">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record) => (
                  <tr key={record.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">{record.avatar}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{record.name}</div>
                          <div className="text-slate-400 text-sm">{record.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`${record.checkIn === '-' ? 'text-slate-500' : 'text-green-400'}`}>
                        {record.checkIn}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`${record.checkOut === '-' ? 'text-slate-500' : 'text-red-400'}`}>
                        {record.checkOut}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">{record.workHours}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.status === 'Present' 
                          ? 'bg-green-400/20 text-green-400' 
                          : 'bg-red-400/20 text-red-400'
                      }`}>
                        {record.status}
                      </span>
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

export default Attendance;
