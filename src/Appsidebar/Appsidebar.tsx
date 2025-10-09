import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Home, Settings } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <Home size={18} />
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <Settings size={18} />
            <span>Settings</span>
          </a>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}

