
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  Settings,
  Layout,
  ChevronRight,
  Clock,
  DollarSign,
  User // <-- Import User icon
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar = ({ isOpen, onToggle, currentPage, onPageChange }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: Layout, href: "/", children: [] },
    { name: "Employees", icon: Users, href: "/employees", children: [] },
    { name: "Attendance", icon: Clock, href: "/attendance", children: [] },
    { 
      name: "Leave", 
      icon: Calendar, 
      href: "/leave", 
      children: [
        { title: "Leave Requests", href: "/leave" },
        { title: "Leave Balance", href: "/leave/balance" },
        { title: "Leave Calender", href: "/leave/calendar" },
        { title: "Holiday Calender", href: "/leave/holiday-calendar" },
      ] 
    },
    { name: "Payroll", icon: DollarSign, href: "/payroll", children: [] },
    { name: "Reports", icon: FileText, href: "/reports", children: [] },
    { name: "Leadership", icon: User, href: "/leadership", children: [] }, // <-- Added Leadership
    { name: "Settings", icon: Settings, href: "/settings", children: [] },
  ];

  // Detect active page from location
  function isMenuActive(item: { name: string, href: string }): boolean {
    return location.pathname === item.href ||
      (item.href !== "/" && location.pathname.startsWith(item.href));
  }

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-slate-900 border-r border-slate-800 transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">HR</span>
          </div>
          {isOpen && (
            <div>
              <h1 className="text-xl font-bold text-white">UBIQ</h1>
              <p className="text-xs text-slate-400">Human Resource</p>
            </div>
          )}
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => {
                  onPageChange(item.name);
                  if (item.children.length > 0) {
                    toggleExpanded(item.name);
                  } else {
                    navigate(item.href);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-slate-800 group ${
                  isMenuActive(item)
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
                type="button"
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && (
                  <>
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.children.length > 0 && (
                      <ChevronRight 
                        className={`w-4 h-4 transition-transform ${
                          expandedItems.includes(item.name) ? 'rotate-90' : ''
                        }`} 
                      />
                    )}
                  </>
                )}
              </button>
              
              {isOpen && expandedItems.includes(item.name) && item.children.length > 0 && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child.title}
                      className="w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                      type="button"
                      onClick={() => navigate(child.href)}
                    >
                      {child.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
