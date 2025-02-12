import { department } from "@/types/departments";
import React from "react";
import { useGetDepartmentMembers } from "@/hooks/database/Department/useGetDepartmentMembers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DepartmentCardLoading from "./departmentCardLoading";
import CardMembers from "./cardMembers";
import { UserRoundX } from "lucide-react";

const DepartmentCard = ({ department }: { department: department }) => {
  const { members, isLoading } = useGetDepartmentMembers(
    department.id as number
  );
  return (
    <Card key={department.name} className="md:w-[300px] sm:w-full ">
      <CardHeader className="border-b flex justify-between w-full flex-row i pr-2">
        <div className="flex flex-col">
          <h1 className="font-semibold ">{department.name}</h1>
          <span className="text-gray-400 text-sm font-thin">
            {department.membersId.length} members
          </span>
        </div>
        <Link href={`/departments/${department.id}`}>
          <Button
            variant={"link"}
            className="text-[#7152F3] font-thin p-0 pr-1 items-start"
          >
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="mt-5 flex flex-col gap-2">
        {!isLoading ? (
          members?.map((member) => (
            <CardMembers key={member.employeeId} member={member} />
          ))
        ) : (
          <DepartmentCardLoading />
        )}
        {!members?.length && !isLoading && (
          <div className="flex items-center flex-col w-full">
            <h1 className="font-semibold">No members</h1>
            <UserRoundX />
            <Link href={"/employees/addEmployee"}>
              <Button variant={"link"}>Add some</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DepartmentCard;
