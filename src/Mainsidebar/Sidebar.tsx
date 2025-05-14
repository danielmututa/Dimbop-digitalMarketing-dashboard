import { ReactNode } from 'react';
import { Home  } from "lucide-react";
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
import { FiFileText } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { CiBoxes } from "react-icons/ci";
import { MdOutlineViewComfy } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegNewspaper } from "react-icons/fa6";
import { useAuthStore } from "@/context/userContext";





const items = [
  { title: "Home", path: "/", icon: Home },
  { title: "Products", path: "/products", icon: AiOutlineProduct  },
  { title: "Feedback", path: "/feedback", icon: VscFeedback },
  { title: "Blogs", path: "/blogs", icon: FiFileText },
  { title: "Orders", path: "/orders", icon: CiBoxes },
  { title: "Users", path: "/users", icon: LuUsers},
  { title: "BlogShowcase", path: "/blogshowcase", icon: FaRegNewspaper },
  { title: "ProductShowcase", path: "/prodt", icon: MdOutlineViewComfy  },
 
  
];

type MainSidebarProps = {
  children: ReactNode;
};

const MainSidebar = ({ children }: MainSidebarProps) => {
  const { user } = useAuthStore();

  return (
    <SidebarProvider className="flex flex-col h-screen">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className='pt-10'> 
                <p className='text-2xl'>Dimbo P</p></SidebarGroupLabel>
              <SidebarGroupContent className="pt-10 flex gap-2">
                <SidebarMenu className="flex gap-2">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title} className='flex gap-4'>
                      <SidebarMenuButton asChild>
                        <Link to={item.path} className="flex gap-2">
                          <item.icon className="w-4 h-4" />
                          <span className="text-[16px]">{item.title}</span>
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
        <main className="flex flex-start mt-10 md:px-8 lg:px-10  flex-col w-full">
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
            <p className='text-lg lg:text-2xl xl:text-3xl '>Welcome,{user?.username}!</p>
            <div className="border w-full"></div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainSidebar;
