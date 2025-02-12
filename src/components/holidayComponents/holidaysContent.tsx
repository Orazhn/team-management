"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Circle } from "lucide-react";
import { AddHoliday } from "@/components/holidayComponents/addHoliday";
import { useGetHolidays } from "@/hooks/database/Holidays/useGetHolidays";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useSearch } from "@/hooks/logic/useSearch";
import NoDataFound from "../noDataFound";

const HolidaysContent = () => {
  const { holidays, isLoading } = useGetHolidays();
  const search = useSearch(holidays, "holidayName");
  const holidayHeads = ["Date", "Day", "Holiday Name"];

  if (isLoading) {
    return (
      <div>
        <header className="flex justify-between items-center sm:flex-col md:flex-row gap-2">
          <div className="relative">
            <Skeleton className="absolute left-3 top-3 h-4 w-4" />
            <Skeleton className="pl-10 w-[300px] h-10" />
          </div>
          <Skeleton className="w-32 h-10" />
        </header>
        <div className="flex gap-4 mt-5">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-24 h-6" />
        </div>
        <div className="overflow-auto md:ml-0 sm:left-0 sm:mt-20 sm:absolute md:static md:mt-8 h-[700px] overflow-y-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                {holidayHeads.map((head, index) => (
                  <TableHead key={index} className="w-[60px]">
                    <Skeleton className="w-full h-6" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index} className="border-l-4 h-14">
                  <TableCell>
                    <Skeleton className="w-24 h-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-24 h-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-40 h-6" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  return (
    <div>
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
        <AddHoliday />
      </header>
      <div className="flex gap-4 mt-5">
        <div className="flex gap-1 font-semibold text-sm items-center">
          <Circle width={12} fill="#7152F3" color="#7152F3" />
          Upcoming
        </div>
        <div className="flex gap-1 font-semibold text-sm items-center">
          <Circle width={12} fill="#A2A1A8" color="#A2A1A8" />
          Past Holidays
        </div>
      </div>
      <div className="overflow-auto md:ml-0 sm:left-0 sm:mt-20 sm:absolute md:static md:mt-8 h-[700px] overflow-y-auto w-full">
        {search.searchData?.length ? (
          <Table className="">
            <TableHeader>
              <TableRow>
                {holidayHeads.map((head) => (
                  <TableHead key={head} className="w-[60px]">
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {search.searchData.map((holiday) => {
                const isPast = new Date(holiday.date) <= new Date();
                const borderColor = isPast
                  ? "border-l-gray-500"
                  : "border-l-purple-500";

                return (
                  <TableRow
                    key={holiday.id}
                    className={cn("border-l-4 h-14 ", borderColor)}
                  >
                    <TableCell>{holiday.date}</TableCell>
                    <TableCell>{holiday.day}</TableCell>
                    <TableCell>{holiday.holidayName}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <NoDataFound name="Holidays" />
        )}
      </div>
    </div>
  );
};

export default HolidaysContent;
