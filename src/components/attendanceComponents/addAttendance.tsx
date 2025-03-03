"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ClipboardCheck } from "lucide-react";
import { Lexend } from "next/font/google";
import { cn } from "@/lib/utils";
import React, { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { useGetEmployees } from "@/hooks/database/Employee/useGetEmployees";
import { attendanceStatus } from "@/types/mainEnums";
import { IEmployee } from "@/types/employee";
import { usePostAttendance } from "@/hooks/database/Attendance/usePostAttendance";
import { format } from "date-fns";
import { Dayjs } from "dayjs";
import { BreakTime } from "./breakTime";
import TimePickerValue from "./timePicker";

const lexendFont = Lexend({
  subsets: ["latin"],
});

function AddAttendance() {
  const [date, setDate] = useState<Date>();
  const { postAttendance, isPending } = usePostAttendance();
  const [status, setStatus] = useState<attendanceStatus | undefined>();
  const [breakTime, setBreakTime] = useState({ hours: "0", minutes: "0" });
  const [workingHours, setWorkingHours] = useState<string>("8:00");
  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);

  const { employees } = useGetEmployees();
  const [chosenEmployee, setChosenEmployee] = useState<IEmployee>();
  const isPostEnable =
    chosenEmployee &&
    date &&
    status &&
    breakTime &&
    workingHours &&
    checkIn &&
    checkOut;

  const postData = async () => {
    if (isPostEnable) {
      toast.promise(
        postAttendance({
          employeeId: chosenEmployee.employeeId,
          employeeName: chosenEmployee.employeeName,
          designation: chosenEmployee.designation,
          employeeType: chosenEmployee.employeeType,
          checkIn: checkIn.format("hh:mm A"),
          checkOut: checkOut.format("hh:mm A"),
          break: `${breakTime.hours}:${breakTime.minutes}`,
          workingHours: workingHours,
          attendanceStatus: status,
          date: format(date, "MMMM dd, yyyy"),
        }),
        {
          loading: "Creating Attendance",
          success: <b>Attendance created!</b>,
          error: <b>Could not create</b>,
        }
      );
    }
  };

  useEffect(() => {
    if (checkIn?.minute() && checkOut?.minute()) {
      const duration = checkOut.diff(checkIn, "minute");
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      setWorkingHours(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`
      );
    } else {
      setWorkingHours("00:00");
    }
  }, [checkIn, checkOut]);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const handleBreakTimeChange = (hours: number, minutes: number) => {
    setBreakTime({
      hours: hours < 10 ? `0${hours}` : `${hours}`,
      minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <ClipboardCheck /> Add Attendance
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px]", lexendFont.className)}>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Add Attendance</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Label>Date</Label>
            <Input
              id="date"
              type="date"
              value={date ? format(date, "yyyy-MM-dd") : ""}
              onChange={(e) =>
                handleDateChange(e.target.valueAsDate || undefined)
              }
              className="w-full"
            />
          </div>
          <TimePickerValue
            variant="Check In"
            value={checkIn}
            setValue={setCheckIn}
          />
          <TimePickerValue
            variant="Check Out"
            value={checkOut}
            setValue={setCheckOut}
          />
          <div>
            <Label>Working Hours</Label>
            <Input
              value={workingHours}
              disabled
              className="w-full bg-gray-100 dark:text-black"
            />
          </div>
          <div className="dark:bg-zinc-500 bg-slate-100 rounded-md p-2">
            <Label>Break Time</Label>
            <BreakTime onBreakTimeChange={handleBreakTimeChange} />
          </div>

          <div>
            <Label htmlFor="employees">Employees</Label>
            <Select
              onValueChange={(value) =>
                setChosenEmployee(
                  employees?.find((emp) => emp.employeeId === value)
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an Employee" />
              </SelectTrigger>
              <SelectContent>
                {employees?.map((employee) => (
                  <SelectItem
                    key={employee.employeeId}
                    value={employee.employeeId}
                  >
                    {employee.employeeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select
              onValueChange={(value) => setStatus(value as attendanceStatus)}
            >
              <SelectTrigger
                className={cn(
                  status === "On Time" && "on-time",
                  status === "Late" && "late",
                  status === "Absent" && "absent"
                )}
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="On Time"
                  className="on-time mb-1 focus:bg-[#3fc28a] focus:bg-opacity-20 focus:text-[#3fc28a]"
                >
                  On Time
                </SelectItem>
                <SelectItem
                  value="Late"
                  className="late mb-1 focus:bg-[#f45b69] focus:text-[#f45b69] focus:bg-opacity-20"
                >
                  Late
                </SelectItem>
                <SelectItem
                  value="Absent"
                  className="absent focus:bg-[#f45b69] focus:text-[#f45b69] focus:bg-opacity-20"
                >
                  Absent
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex gap-2 w-full justify-center">
          <DialogClose asChild>
            <Button variant="ghost" className="border w-full py-5 font-light">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild disabled={!isPostEnable || isPending}>
            <Button className="w-full py-5 font-light" onClick={postData}>
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default memo(AddAttendance);
