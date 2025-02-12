"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { Lexend } from "next/font/google";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React, { useState } from "react";
import { days } from "@/types/mainEnums";
import { Label } from "../ui/label";
import { usePostHoliday } from "@/hooks/database/Holidays/usePostHoliday";
import toast from "react-hot-toast";
import { useGetHolidays } from "@/hooks/database/Holidays/useGetHolidays";

const lexendFont = Lexend({
  subsets: ["latin"],
});

export function AddHoliday() {
  const [date, setDate] = useState<Date>();
  const [day, setDay] = useState<days>();
  const [name, setName] = useState("");
  const isPostEnable = date && name && day;

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      const weekDay = Object.values(days)[newDate.getDay() - 1] as days;
      setDay(weekDay);
    }
  };
  const { postHoliday, isPending, isSuccess } = usePostHoliday();
  const { refetch } = useGetHolidays();

  const handlePost = async () => {
    await toast.promise(
      postHoliday({
        holidayName: name,
        date: format(date as Date, "MMMM dd, yyyy"),
        day: day as days,
      }),
      {
        loading: "Adding...",
        success: <b>Holiday added!</b>,
        error: <b>Could not add</b>,
      }
    );
    if (isSuccess) {
      setDate(undefined);
      setDay(undefined);
      setName("");
      refetch();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add Holiday
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px] ", lexendFont.className)}>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Add New Holiday</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Name</Label>
          <Input
            placeholder="Holiday Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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

        <div>
          <Label>Day</Label>
          <Input disabled value={day ?? ""} />
        </div>
        <DialogFooter className="flex gap-2 w-full justify-center">
          <DialogTrigger asChild>
            <Button variant={"ghost"} className="border w-full py-5 font-light">
              Cancel
            </Button>
          </DialogTrigger>
          <DialogClose
            asChild
            disabled={!isPostEnable || isPending}
            onClick={handlePost}
          >
            <Button className="w-full py-5 font-light">Add</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
