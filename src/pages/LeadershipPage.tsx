
import { User } from "lucide-react";

const leaders = [
  { role: "Founder", name: "XYZ", icon: User },
  { role: "Co-Founder", name: "ABC", icon: User },
  { role: "CEO", name: "ABC", icon: User },
];

export default function LeadershipPage() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Leadership Team</h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {leaders.map(({ name, role, icon: Icon }) => (
          <div
            key={role}
            className="bg-slate-800/60 backdrop-blur-xl rounded-lg border border-slate-700 p-6 flex flex-col items-center text-center w-64"
          >
            <span className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-3">
              <Icon className="text-white w-8 h-8" />
            </span>
            <div className="text-lg font-bold text-white">{name}</div>
            <div className="text-slate-400 font-medium">{role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
