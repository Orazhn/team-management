import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useGetHolidays } from "@/hooks/database/Holidays/useGetHolidays";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { Lexend } from "next/font/google";
import Link from "next/link";
import { Button } from "../ui/button";

const lexendFont = Lexend({
  subsets: ["latin"],
});

export function Schedule() {
  const { holidays, isLoading } = useGetHolidays();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const today = new Date();

  const handleMeetingClick = (meetingDate: string) => {
    const newDate = new Date(meetingDate);
    setDate(newDate);
    setMonth(newDate);
  };

  return (
    <Card className="col-span-1 h-full">
      <CardHeader>
        <CardTitle className="text-center">
          <Link href={"/holidays"}>
            <Button variant={"link"} className="p-0 text-xl font-semibold">
              Holidays
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 flex items-center flex-col">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-fit"
          month={month}
          onMonthChange={setMonth}
        />
        <div className="space-y-2">
          <div className="font-semibold">
            {date?.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          {!isLoading ? (
            holidays
              ?.sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .map((holiday) => {
                const holidayDate = new Date(holiday.date);
                const isPast = holidayDate < today;
                const borderColor = isPast
                  ? "border-gray-300"
                  : "border-purple-500";

                return (
                  <div
                    key={holiday.id}
                    className={cn(
                      `flex gap-4 cursor-pointer items-center bg-gray-100 dark:bg-zinc-900 px-4 py-2 rounded-lg border`,
                      lexendFont.className,
                      borderColor
                    )}
                    onClick={() => handleMeetingClick(holiday.date)}
                  >
                    <div className="w-18 text-sm flex flex-col font-light">
                      <h1>{holiday.date}</h1>
                      <h1>{holiday.day}</h1>
                    </div>
                    <div className={cn(borderColor, "border-l-2 pl-3 ")}>
                      <div className="font-medium">{holiday.holidayName}</div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="flex gap-2 flex-col">
              {[...Array(4)].map((_, index) => (
                <div
                  className="flex gap-4 cursor-pointer items-center bg-gray-100 px-4 py-2 rounded-lg"
                  key={index}
                >
                  <div className="w-18 text-sm flex flex-col gap-1 font-light">
                    <Skeleton className="w-24 h-2" />
                    <Skeleton className="w-24 h-2" />
                  </div>

                  <div className="border-l-2 pl-3 ">
                    <Skeleton className="w-24 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
