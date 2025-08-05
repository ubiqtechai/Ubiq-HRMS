
import { User } from "lucide-react";

const leaders = [
  { role: "Founder", name: "XYZ", icon: User },
  { role: "Co-Founder", name: "ABC", icon: User },
  { role: "CEO", name: "ABC", icon: User },
];

const TeamLeadersCard = () => (
  <div className="mb-6">
    <div className="bg-slate-800/60 backdrop-blur-xl rounded-lg border border-slate-700 p-6 flex flex-col md:flex-row items-center md:items-stretch gap-6">
      {leaders.map(({ role, name, icon: Icon }, idx) => (
        <div
          key={role}
          className="flex items-center md:flex-col gap-4 md:gap-2 text-center flex-1"
        >
          <div className="flex-shrink-0 flex justify-center">
            <span className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Icon className="text-white w-6 h-6" />
            </span>
          </div>
          <div>
            <div className="text-lg font-bold text-white">{name}</div>
            <div className="text-slate-400 font-medium">{role}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TeamLeadersCard;
