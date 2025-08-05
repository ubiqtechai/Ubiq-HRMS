import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import Employees from "@/components/Employees";
import Attendance from "@/components/Attendance";
import Leave from "@/components/Leave";
import Payroll from "@/components/Payroll";
import Reports from "@/components/Reports";
import { Toaster } from "@/components/ui/toaster";
import SettingsPage from "./SettingsPage";
import LeaveCalendarPage from "./LeaveCalendarPage";
import HolidayCalendarPage from "./HolidayCalendarPage";
import LeadershipPage from "./LeadershipPage";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to sync currentPage with route path for breadcrumb/active features
  function getCurrentPageName(pathname: string): string {
    if (!pathname || pathname === "/") return "Dashboard";
    if (pathname.startsWith("/employees")) return "Employees";
    if (pathname.startsWith("/attendance")) return "Attendance";
    if (pathname.startsWith("/leave")) return "Leave";
    if (pathname.startsWith("/payroll")) return "Payroll";
    if (pathname.startsWith("/reports")) return "Reports";
    if (pathname.startsWith("/settings")) return "Settings";
    if (pathname.startsWith("/leadership")) return "Leadership";
    return "Dashboard";
  }
  const currentPage = getCurrentPageName(location.pathname);

  // Route mapping for main content area
  const renderPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <Dashboard />;
      case "Employees":
        return <Employees />;
      case "Attendance":
        return <Attendance />;
      case "Leave":
        return <Leave />;
      case "Payroll":
        return <Payroll />;
      case "Reports":
        return <Reports />;
      case "Settings":
        return <SettingsPage />;
      case "Leadership":
        return <LeadershipPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          currentPage={currentPage}
          onPageChange={(pageName: string) => {
            const routeMap: Record<string, string> = {
              Dashboard: "/",
              Employees: "/employees",
              Attendance: "/attendance",
              Leave: "/leave",
              Payroll: "/payroll",
              Reports: "/reports",
              Settings: "/settings",
              Leadership: "/leadership",
            };
            const path = routeMap[pageName] || "/";
            navigate(path);
          }}
        />
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <Header
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            currentPage={currentPage}
          />
          <main className="p-6">
            {/* Route switching for subpages */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/leave" element={<Leave />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/leadership" element={<LeadershipPage />} />
              <Route path="/leave/calendar" element={<LeaveCalendarPage />} />
              <Route path="/leave/holiday-calendar" element={<HolidayCalendarPage />} />
              {/* fallback: unknown pages */}
              <Route path="*" element={
                <div className="text-center pt-20 text-slate-400 text-2xl">
                  404 – Page Not Found
                </div>
              } />
            </Routes>
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
