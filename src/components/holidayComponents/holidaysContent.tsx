"use client";
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
import AddHoliday from "@/components/holidayComponents/addHoliday";
import { useGetHolidays } from "@/hooks/database/Holidays/useGetHolidays";
import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks/logic/useSearch";
import NoDataFound from "../noDataFound";
import HolidaysContentLoading from "@/app/(authenticated)/holidays/loading";

const HolidaysContent = () => {
  const { holidays, isLoading } = useGetHolidays();
  const search = useSearch(holidays, "holidayName");
  const holidayHeads = ["Date", "Day", "Holiday Name"];

  if (isLoading) return <HolidaysContentLoading />;

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
          <Table>
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
