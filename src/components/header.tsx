"use client";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ReactNode } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

const montserrat = Montserrat({ subsets: ["latin"] });

const getTimeOfDay = (): string => {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 18) {
    return "day";
  } else if (hours >= 18 && hours < 21) {
    return "evening";
  } else {
    return "night";
  }
};

export function Header() {
  const path = usePathname();
  const { user, isLoaded } = useUser();

  const HeaderInfo: {
    path: string;
    title: () => string;
    description: string | ReactNode;
  }[] = [
    {
      path: "/dashboard",
      title: () => `Hello${user?.username ? `, ${user.username}` : ""} 👋`,
      description: "Good " + getTimeOfDay(),
    },
    {
      path: "/employees",
      title: () => "All Employees",
      description: "All Employee Information",
    },
    {
      path: "/departments",
      title: () => "All Departments",
      description: "All Departments Information",
    },
    {
      path: "/departments/[id]",
      title: () => `Department`,
      description: (
        <Breadcrumb className="text-black text-nowrap">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/departments">
                All Departments
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Department</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ),
    },
    {
      path: "/attendance",
      title: () => "Attendance",
      description: "All Employee Attendance",
    },
    {
      path: "/holidays",
      title: () => "Holidays",
      description: "All Holiday Lists",
    },
    {
      path: "/payroll",
      title: () => "Payroll",
      description: "All Employee Payroll",
    },
    {
      path: "/jobs",
      title: () => "Jobs",
      description: "Show All Jobs",
    },
    {
      path: "/candidates",
      title: () => "Candidates",
      description: "Show All Candidates",
    },
    {
      path: "/employees/addEmployee",
      title: () => "Add New Employee",
      description: (
        <Breadcrumb className="text-black text-nowrap">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/employees">All Employees</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Add New Employee</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ),
    },
  ];
  const currentHeaderInfo = HeaderInfo.find((info) =>
    info.path.includes("[id]")
      ? path.startsWith(info.path.replace("[id]", ""))
      : path === info.path
  ) || {
    title: () => "Employee",
    description: (
      <Breadcrumb className="text-black text-nowrap">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/employees">All Employees</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Employee</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
  };

  return (
    <header className="flex items-center justify-between md:justify-start w-screen ">
      <SidebarTrigger />
      <div className="flex w-full flex-col sm:flex-row items-center md:justify-between justify-end px-4 py-4 sm:py-0 sm:h-16 overflow-x-auto mt-2">
        <div
          className={cn(
            "mb-4 sm:mb-0 md:block hidden text-nowrap",
            montserrat.className
          )}
        >
          <h1 className="text-xl font-bold">{currentHeaderInfo.title()}</h1>
          {typeof currentHeaderInfo.description === "string" ? (
            <p className="text-sm text-muted-foreground">
              {currentHeaderInfo.description}
            </p>
          ) : (
            currentHeaderInfo.description
          )}
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="h-5 w-5" />
          </Button>
          {isLoaded ? (
            <UserButton />
          ) : (
            <Skeleton className="h-7 w-7 rounded-full" />
          )}
        </div>
      </div>
    </header>
  );
}
