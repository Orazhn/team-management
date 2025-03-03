"use client";
import React from "react";
import { useGetPayrolls } from "@/hooks/database/Payroll/useGetPayrolls";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "@/hooks/logic/useSearch";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableHead,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import AddPayrollModal from "./addPayroll";
import NoDataFound from "../noDataFound";
import PayrollsListLoading from "@/app/(authenticated)/payroll/loading";

const payrollHeads = [
  "Employee Name",
  "CTC",
  "Salary Per Month",
  "Deduction",
  "Status",
];

const PayrollsList = () => {
  const { payrolls, isLoading } = useGetPayrolls();
  const { searchData, value, onChange } = useSearch(payrolls, "employeeName");

  if (isLoading) {
    return <PayrollsListLoading />;
  }

  return (
    <div className="border md:m-3 p-3 rounded-md sm:m-0">
      <header className="flex justify-between items-center sm:flex-col md:flex-row gap-2">
        <div className="flex justify-between w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search"
              className="pl-10 w-[300px]"
              value={value}
              onChange={onChange}
            />
          </div>
          <AddPayrollModal />
        </div>
      </header>
      <div className="overflow-auto md:ml-0 sm:left-0 sm:mt-20 sm:absolute md:static md:mt-8 h-[700px] overflow-y-auto">
        {searchData?.length ? (
          <Table className="">
            <TableHeader>
              <TableRow>
                {payrollHeads.map((head) => (
                  <TableHead key={head} className="w-[120px] ">
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchData.map((payroll, index) => (
                <TableRow key={index}>
                  <TableCell>{payroll.employeeName}</TableCell>
                  <TableCell>{payroll.ctc}</TableCell>
                  <TableCell>{payroll.salary}</TableCell>
                  <TableCell>
                    {payroll.deduction !== 0 ? payroll.deduction : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-md bg-opacity-10 p-2 text-center",
                        payroll.payrollStatus === "Completed" && "completed",
                        payroll.payrollStatus === "Pending" && "pending"
                      )}
                    >
                      {payroll.payrollStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <NoDataFound name="Payrolls" />
        )}
      </div>
    </div>
  );
};

export default PayrollsList;
