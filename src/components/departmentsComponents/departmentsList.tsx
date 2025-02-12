"use client";
import React from "react";
import { useGetDepartments } from "@/hooks/database/Department/useGetDepartments";
import DepartmentListLoading from "./departmentsListLoading";
import { useSearch } from "@/hooks/logic/useSearch";
import DepartmentCard from "./departmentCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AddDepartmentModal } from "@/components/departmentsComponents/addDepartment";
import NoDataFound from "../noDataFound";

const DepartmentsList = () => {
  const { departments, isLoading } = useGetDepartments();
  const search = useSearch(departments, "name");
  if (isLoading) {
    return <DepartmentListLoading />;
  }
  return (
    <div className="border rounded-md flex flex-col lg:p-4 lg:m-4 md:items-center lg:items-start pt-4">
      <div className="flex justify-between w-full">
        <div className="relative ">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search"
            className="pl-10 w-[300px]"
            value={search.value}
            onChange={search.onChange}
          />
        </div>
        <AddDepartmentModal />
      </div>

      <div className="flex gap-5 mt-8 sm:flex-col md:flex-row lg:flex-wrap md:flex-wrap w-full ">
        {search.searchData?.length ? (
          search.searchData.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))
        ) : (
          <NoDataFound name="Departments" />
        )}
      </div>
    </div>
  );
};

export default DepartmentsList;
