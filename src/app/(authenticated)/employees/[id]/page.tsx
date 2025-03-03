"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import EmployeeHeader from "@/components/employeesComponents/header";
import { ProfileTab } from "@/components/employeesComponents/sideTabs/ProfileTab";
import { Menu } from "lucide-react";
import NavItems from "@/components/employeesComponents/sideTabs/navItems";
import { AttendanceTab } from "@/components/employeesComponents/sideTabs/AttendanceTab";
import { useGetEmployee } from "@/hooks/database/Employee/useGetEmployee";
import { useParams } from "next/navigation";
import {
  IAccountAccess,
  IPersonalInformation,
  IProfessionalInformation,
} from "@/types/employee";
export type activeSides = "profile" | "attendance";

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const { employee } = useGetEmployee(id);
  const [activeSide, setActiveSide] = useState<activeSides>("profile");
  const sideTabs = [
    {
      content: (
        <ProfileTab
          professionalInformation={
            employee?.professionalInformation as IProfessionalInformation
          }
          personalInformation={
            employee?.personalInformation as IPersonalInformation
          }
          accountAccessInformation={
            employee?.accountAccessInformation as IAccountAccess
          }
        />
      ),
      title: "profile",
    },
    {
      content: <AttendanceTab id={employee?.employee.employeeId as string} />,
      title: "attendance",
    },
  ];

  return (
    <div className="flex w-screen justify-center">
      <div className="flex flex-col items-center border rounded-lg gap-4 p-4 lg:p-8 space-y-6 lg:space-y-8 m-3 sm:w-screen">
        {employee && (
          <EmployeeHeader
            name={employee.employee.employeeName}
            designation={employee.professionalInformation.designation}
            email={employee.professionalInformation.email}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-6 justify-center ">
          {/* Mobile Sidebar Trigger */}
          <div className="lg:hidden flex justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Menu className="w-4 h-4 mr-2" />
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <NavItems
                  activeSide={activeSide}
                  setActiveSide={setActiveSide}
                />
              </SheetContent>
            </Sheet>
          </div>

          <Card className="hidden lg:block w-64 shrink-0 h-fit">
            <NavItems activeSide={activeSide} setActiveSide={setActiveSide} />
          </Card>

          {sideTabs.map(
            (tab) =>
              tab.title === activeSide && (
                <Card className="flex p-4 lg:p-6 " key={tab.title}>
                  {tab.content}
                </Card>
              )
          )}
        </div>
      </div>
    </div>
  );
}
