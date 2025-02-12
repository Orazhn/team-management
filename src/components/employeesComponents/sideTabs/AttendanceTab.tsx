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
import { Badge } from "@/components/ui/badge";
import { useGetEmployeeAttendance } from "@/hooks/database/Attendance/useGetEmployeeAttendance";

const tableHeads = [
  "Date",
  "Check In",
  "Check Out",
  "Break",
  "Working Hours",
  "Status",
];

export function AttendanceTab({ id }: { id: string }) {
  const { attendances, isPending } = useGetEmployeeAttendance(id);
  if (isPending) {
    <div>Loading...</div>;
  }
  return (
    <div className="overflow-auto md:in md:ml-0 sm:left-0 sm:mt-20 sm:absolute md:static md:mt-0">
      <div className="max-h-[500px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeads.map((head) => (
                <TableHead key={head} className="w-[120px] ">
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendances?.map((attendance, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{attendance.date}</TableCell>
                <TableCell>{attendance.checkIn}</TableCell>
                <TableCell>{attendance.checkOut}</TableCell>
                <TableCell>{attendance.break}</TableCell>
                <TableCell>{attendance.workingHours}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "rounded-md text-center",
                      attendance.attendanceStatus == "On Time"
                        ? "on-time"
                        : "late"
                    )}
                  >
                    {attendance.attendanceStatus}
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
