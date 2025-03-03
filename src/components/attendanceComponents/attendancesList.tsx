"use client";
import React from "react";
import { useGetAttendances } from "@/hooks/database/Attendance/useGetAttendances";
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
import AddAttendance from "@/components/attendanceComponents/addAttendance";
import { attendanceStatus } from "@/types/mainEnums";
import NoDataFound from "../noDataFound";
import AttendancesListLoading from "@/app/(authenticated)/attendance/loading";

const AttendancesList = () => {
  const { attendances, isLoading } = useGetAttendances();
  const { searchData, value, onChange } = useSearch(
    attendances,
    "employeeName"
  );

  if (isLoading) {
    return <AttendancesListLoading />;
  }

  const attendanceHeads = [
    "Employee Name",
    "Designation",
    "Type",
    "Check In Time",
    "Status",
  ];

  const statusMap: { [key in attendanceStatus]: string } = {
    [attendanceStatus.absent]: "absent",
    [attendanceStatus.late]: "late",
    [attendanceStatus.onTime]: "on-time",
  };

  return (
    <div className="border md:m-3 p-3 rounded-md sm:m-0">
      <header className="flex justify-between items-center sm:flex-col md:flex-row gap-2">
        <div className="relative ">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search"
            className="pl-10 w-[300px]"
            value={value}
            onChange={onChange}
          />
        </div>
        <AddAttendance />
      </header>
      <div className="overflow-auto md:ml-0 sm:left-0 sm:mt-20 sm:absolute md:static md:mt-8 h-[700px] overflow-y-auto">
        {searchData?.length ? (
          <Table className="">
            <TableHeader>
              <TableRow>
                {attendanceHeads.map((head) => (
                  <TableHead key={head} className="w-[120px] ">
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchData?.map((attendance, index) => (
                <TableRow key={index}>
                  <TableCell>{attendance.employeeName}</TableCell>
                  <TableCell>{attendance.designation}</TableCell>
                  <TableCell>{attendance.employeeType}</TableCell>
                  <TableCell>{attendance.checkIn}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-md bg-opacity-10 p-2 text-center",
                        statusMap[
                          attendance.attendanceStatus as attendanceStatus
                        ]
                      )}
                    >
                      {attendance.attendanceStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <NoDataFound name="Attendances" />
        )}
      </div>
    </div>
  );
};

export default AttendancesList;
