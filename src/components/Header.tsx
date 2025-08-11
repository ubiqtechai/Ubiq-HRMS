
import { Search, Bell, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "./ReportModal";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import NotificationsDropdown from "./NotificationsDropdown";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  onToggleSidebar: () => void;
  currentPage: string;
}

const Header = ({ onToggleSidebar, currentPage }: HeaderProps) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  function getBreadcrumbPage(page: string) {
    return page;
  }

  // Removed handleNotifyClick

  // New: handle profile click
  function handleProfileClick() {
    toast({
      title: "Profile",
      description: "Profile section coming soon.",
    });
  }

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{getBreadcrumbPage(currentPage)}</span>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <ThemeToggle />
          
          {/* Notifications dropdown */}
          <Popover open={notifOpen} onOpenChange={setNotifOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground hover:bg-accent relative"
                aria-label="Open notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="end" className="p-0 border-0 bg-transparent w-auto shadow-none" sideOffset={8}>
              <NotificationsDropdown />
            </PopoverContent>
          </Popover>
          <div
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer"
            onClick={handleProfileClick}
            title="Profile"
            tabIndex={0}
            role="button"
          >
            <span className="text-primary-foreground text-sm font-semibold">A</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default Header;
