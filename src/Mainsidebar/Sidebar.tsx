import { ReactNode } from 'react';
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Navbar from "@/pages/Navbar";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const items = [
  { title: "Home", path: "/", icon: Home },
  { title: "Products", path: "/products", icon: Inbox },
  { title: "Feedback", path: "/feedback", icon: Calendar },
  { title: "Blogs", path: "/blogs", icon: Settings },
  { title: "Orders", path: "/orders", icon: Search },
  { title: "Users", path: "/users", icon: Settings },
  { title: "Categories", path: "/categories", icon: Settings },
  { title: "Login", path: "/login", icon: Settings },
  { title: "Register", path: "/register", icon: Settings },
  
];

type MainSidebarProps = {
  children: ReactNode;
};

const MainSidebar = ({ children }: MainSidebarProps) => {
  return (
    <SidebarProvider className="flex flex-col h-screen">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.path} className="flex gap-2">
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex flex-start  flex-col w-full">
          <div className="flex justify-between w-full">
            <SidebarTrigger>
              <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
                Toggle Sidebar
              </button>
            </SidebarTrigger>
            <div className="w-full flex justify-between">
              <Navbar />
            </div>
          </div>

         
          <div className="flex items-start flex-col pt-4 lg:pt-8  ">
            <p className='text-lg lg:text-2xl xl:text-3xl '>Welcome, Daniel!</p>
            <div className="border w-full"></div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainSidebar;
