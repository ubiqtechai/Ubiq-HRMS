
import { BellDot, Calendar, CalendarClock } from "lucide-react";

export default function NotificationsDropdown() {
  return (
    <div className="w-80 max-w-full p-4 rounded-xl bg-slate-800/50 backdrop-blur-xl border border-slate-700 shadow-lg space-y-4 text-sm z-50">
      <div className="font-semibold text-white text-base flex gap-2 items-center mb-1">
        <BellDot className="w-5 h-5 text-yellow-400" /> Notifications & Reminders
      </div>
      {/* Leave request approval */}
      <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
        <BellDot className="w-5 h-5 text-blue-400 mt-0.5" />
        <div className="text-slate-300">
          <span className="font-medium text-white">3 pending leave requests</span> need approval.
        </div>
      </div>
      {/* Birthdays, work anniversaries */}
      <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
        <Calendar className="w-5 h-5 text-pink-400 mt-0.5" />
        <div className="text-slate-300">
          <span className="font-medium text-white">Sneha Patel</span> has a birthday coming up on 18 June.<br />
          <span className="font-medium text-white">Amit Shah</span> celebrates their 2-year work anniversary this week.
        </div>
      </div>
      {/* Payroll generation reminder */}
      <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
        <CalendarClock className="w-5 h-5 text-green-400 mt-0.5" />
        <div className="text-slate-300">
          <span className="font-medium text-white">Payroll generation</span> due in 4 days for June 2024.
        </div>
      </div>
      {/* Daily attendance summary */}
      <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
        <BellDot className="w-5 h-5 text-violet-400 mt-0.5" />
        <div className="text-slate-300">
          <span className="font-medium text-white">Daily attendance summary:</span> 13 present, 2 on leave, 0 absent.
        </div>
      </div>
    </div>
  );
}
