"use client";

import { usePathname } from "next/navigation";
import {
  BarChart2,
  Users,
  Building2,
  ClipboardCheck,
  DollarSign,
  Briefcase,
  UserPlus,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../providers/toggleMode";

const montserrat = Montserrat({ subsets: ["latin"] });

const menuItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <BarChart2 className="h-4 w-4" strokeWidth={4} />,
  },
  {
    href: "/employees",
    label: "All Employees",
    icon: <Users className="h-4 w-4" />,
  },
  {
    href: "/departments",
    label: "Departments",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    href: "/attendance",
    label: "Attendance",
    icon: <ClipboardCheck className="h-4 w-4" />,
  },
  {
    href: "/payroll",
    label: "Payroll",
    icon: <DollarSign className="h-4 w-4" />,
  },
  { href: "/jobs", label: "Jobs", icon: <Briefcase className="h-4 w-4" /> },
  {
    href: "/candidates",
    label: "Candidates",
    icon: <UserPlus className="h-4 w-4" />,
  },
  {
    href: "/holidays",
    label: "Holidays",
    icon: <CalendarDays className="h-4 w-4" />,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <Sidebar>
        <SidebarContent className="flex flex-col h-full">
          <div className="px-4 py-2 flex items-center justify-between">
            <Link href={"/dashboard"}>
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 rounded-full bg-primary">
                  <Image src="/auth-images/icon.png" alt="icon" fill />
                </div>
                <h2 className="text-lg font-semibold">HRMS</h2>
              </div>
            </Link>
            <SidebarTrigger className="md:hidden" />
          </div>

          <SidebarGroup className="flex-grow">
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 w-full px-2 py-2 rounded-md text-sm",
                        (pathname === item.href ||
                          pathname.includes(item.href)) &&
                          "border-l-4 border-[#6745ff] bg-[#8D75F5] bg-opacity-30 text-[#6745ff] font-semibold hover:bg-[#8D75F5] hover:bg-opacity-35 hover:text-[#6745ff] dark:text-purple-400",
                        montserrat.className
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="mt-auto p-4">
            <ModeToggle />
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
