"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Eye, Trash2 } from "lucide-react";
import { useGetEmployees } from "@/hooks/database/Employee/useGetEmployees";
import EmployeesContentLoading from "./employeesContentLoading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmployeesContentFilter } from "./employeesContentFilter";
import { useDeleteEmployee } from "@/hooks/database/Employee/useDeleteEmployee";
import { useSearch } from "@/hooks/logic/useSearch";
import { useFilter } from "@/hooks/logic/useFilter";
import NoDataFound from "../noDataFound";
const EmployeesContent = () => {
  const { employees = [], isLoading } = useGetEmployees();
  const { deleteEmployee, isDeleting } = useDeleteEmployee();
  const search = useSearch(employees, "employeeName");
  const { filter, setFilter, applyFilter, clearFilter } = useFilter({
    department: [],
    type: "",
  });

  const filteredEmployees = applyFilter(employees);
  const finalEmployees = search.searchData
    ? applyFilter(search.searchData)
    : filteredEmployees;

  if (isLoading) {
    return <EmployeesContentLoading />;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-light">
            {JSON.stringify(filter) !==
              JSON.stringify({ department: [], type: "" }) && "Filters Applied"}
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search"
              className="pl-10 w-[300px]"
              value={search.value}
              onChange={search.onChange}
            />
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Link href={"/employees/addEmployee"}>
            <Button className="bg-[#7950F2] hover:bg-[#7950F2]/90">
              <Plus className="mr-2 h-4 w-4" />
              Add New Employee
            </Button>
          </Link>
          <EmployeesContentFilter
            setFilter={setFilter}
            clearFilter={clearFilter}
            applyFilter={applyFilter}
          />
        </div>
      </div>

      {finalEmployees.length ? (
        <div className="rounded-lg border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400 font-normal">
                  Employee Name
                </TableHead>
                <TableHead className="text-gray-400 font-normal">
                  Employee ID
                </TableHead>
                <TableHead className="text-gray-400 font-normal">
                  Department
                </TableHead>
                <TableHead className="text-gray-400 font-normal">
                  Designation
                </TableHead>
                <TableHead className="text-gray-400 font-normal">
                  Type
                </TableHead>
                <TableHead className="text-gray-400 font-normal">
                  Status
                </TableHead>
                <TableHead className="text-gray-400 font-normal">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {finalEmployees.map((employee) => (
                <TableRow
                  key={employee.employeeId}
                  className={isDeleting ? "opacity-50 pointer-events-none" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {employee.employeeName}
                    </div>
                  </TableCell>
                  <TableCell>{employee.employeeId}</TableCell>
                  <TableCell>{employee.departmentName ?? "-"}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.employeeType}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-[#7950F2]/10 text-[#7950F2] hover:bg-[#7950F2]/20"
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/employees/${employee.employeeId}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => deleteEmployee(employee.employeeId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <NoDataFound name="Employees" />
      )}
    </div>
  );
};

export default EmployeesContent;
