
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BellDot, Calendar, CalendarClock } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="animate-fade-in">
      <Card className="bg-slate-800/70 backdrop-blur-xl border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-white">Reports</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-200">
          <div className="text-lg font-bold mb-2">Reports module placeholder</div>
          <div className="text-slate-400">Filterable list of reports will appear here.</div>
        </CardContent>
      </Card>

      {/* Notifications & Reminders Section */}
      <Card className="bg-slate-800/80 backdrop-blur-xl border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <BellDot className="w-5 h-5 text-yellow-400" />
            Notifications & Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Leave request approval alert */}
          <div className="flex items-center gap-3">
            <BellDot className="w-5 h-5 text-blue-400" />
            <div>
              <span className="font-medium text-white">3 pending leave requests</span> need approval.
            </div>
          </div>

          {/* Upcoming birthdays & work anniversaries */}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-pink-400" />
            <div>
              <span className="font-medium text-white">Sneha Patel</span> has a birthday coming up on 18 June.
              <br />
              <span className="font-medium text-white">Amit Shah</span> celebrates their 2-year work anniversary this week.
            </div>
          </div>

          {/* Payroll generation reminder */}
          <div className="flex items-center gap-3">
            <CalendarClock className="w-5 h-5 text-green-400" />
            <div>
              <span className="font-medium text-white">Payroll generation</span> due in 4 days for June 2024.
            </div>
          </div>

          {/* Daily attendance summary */}
          <div className="flex items-center gap-3">
            <BellDot className="w-5 h-5 text-violet-400" />
            <div>
              <span className="font-medium text-white">Daily attendance summary:</span> 13 present, 2 on leave, 0 absent.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
