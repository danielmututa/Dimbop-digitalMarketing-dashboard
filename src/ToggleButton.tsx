// src/components/ui/sidebar-toggle.tsx
import { useSidebar } from "../src/components/ui/sidebarcontext"; // Adjust the import path as necessary
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export function SidebarTrigger() {
  const { isOpen, toggleSidebar } = useSidebar();
  
  return (
    <button
      onClick={toggleSidebar}
      className="p-2 hover:bg-gray-100 rounded-lg"
    >
      {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
    </button>
  );
}