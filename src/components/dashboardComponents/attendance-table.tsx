"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAttendances } from "@/hooks/database/Attendance/useGetAttendances";
import { attendanceStatus } from "@/types/mainEnums";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";

const statusMap: { [key in attendanceStatus]: string } = {
  [attendanceStatus.absent]: "late",
  [attendanceStatus.late]: "late",
  [attendanceStatus.onTime]: "on-time",
};
export function AttendanceTable() {
  const { attendances, isLoading } = useGetAttendances();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [attendanceContent, setAttendanceContent] = useState(
    attendances?.slice(0, 4)
  );

  useEffect(() => {
    setAttendanceContent(attendances?.slice(0, 4));
  }, [attendances]);

  const handleStatusChange = (newValue: string) => {
    if (newValue === "all") {
      setSelectedStatus("all");
      setAttendanceContent(attendances);
    } else {
      setSelectedStatus(newValue);
      setAttendanceContent(
        attendances?.filter(
          (employee) => employee.attendanceStatus === newValue
        )
      );
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border p-4">
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">
            Attendance Overview
          </h2>
          <Skeleton className="w-[180px] h-10 rounded-md" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee Name</TableHead>
              <TableHead className="hidden sm:table-cell">
                Designation
              </TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead>Check In Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <Link href={"/attendance"}>
          <Button
            variant={"link"}
            className="text-lg font-semibold mb-2 sm:mb-0 p-0"
          >
            Attendance Overview
          </Button>
        </Link>
        <Select onValueChange={handleStatusChange} value={selectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Remove Filter</SelectItem>
            {Object.values(attendanceStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee Name</TableHead>
              <TableHead className="hidden sm:table-cell">
                Designation
              </TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead>Check In Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceContent?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div>
                      <div>{item.employeeName}</div>
                      <div className="text-xs text-muted-foreground sm:hidden">
                        {item.designation}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {item.designation}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.employeeType}
                </TableCell>
                <TableCell>{item.checkIn}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      statusMap[item.attendanceStatus as attendanceStatus]
                    )}
                  >
                    {item.attendanceStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
