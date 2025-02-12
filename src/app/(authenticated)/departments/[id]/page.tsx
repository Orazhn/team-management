"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetDepartment } from "@/hooks/database/Department/useGetDepartment";
import { useParams } from "next/navigation";
import MembersList from "@/components/departmentsComponents/membersList";
import Link from "next/link";
import { useSearch } from "@/hooks/logic/useSearch";
import { useGetDepartmentMembers } from "@/hooks/database/Department/useGetDepartmentMembers";
import { IEmployee } from "@/types/employee";

const Department = () => {
  const { id } = useParams();
  const { department } = useGetDepartment(id as string);
  const { members, isLoading } = useGetDepartmentMembers(
    department?.id as number
  );
  const search = useSearch(members, "employeeName");

  const departmentHeads = [
    "Employee ID",
    "Employee Name",
    "Designation",
    "Type",
    "Status",
    "Action",
  ];

  return (
    <div className="border md:m-3 p-3 rounded-md sm:m-0">
      <header className="flex justify-between items-center sm:flex-col md:flex-row gap-2">
        <div className="relative ">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search"
            className="pl-10 w-[300px]"
            value={search.value}
            onChange={search.onChange}
          />
        </div>
        <div className="flex gap-2">
          <Link href={"/employees/addEmployee"}>
            <Button>
              <PlusCircle />
              <p>Add New Employee</p>
            </Button>
          </Link>
        </div>
      </header>
      <div className="overflow-auto md:ml-0 sm:left-0 sm:mt-20 sm:absolute md:static md:mt-8 h-[700px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {departmentHeads.map((head) => (
                <TableHead
                  key={head}
                  className={cn(
                    "w-[120px] ",
                    head == "Employee ID" && "w-[60px]"
                  )}
                >
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <MembersList
            isLoading={isLoading}
            searchData={search.searchData as IEmployee[]}
          />
        </Table>
      </div>
    </div>
  );
};

export default Department;
