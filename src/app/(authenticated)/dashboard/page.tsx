import { AttendanceChart } from "@/components/dashboardComponents/attendance-chart";
import { AttendanceTable } from "@/components/dashboardComponents/attendance-table";
import { Schedule } from "@/components/dashboardComponents/schedule";
import StatsCardList from "@/components/dashboardComponents/statsCardList";
import { Circle } from "lucide-react";
import { attendanceStatus } from "@/types/mainEnums";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const colorMap: { [key in attendanceStatus]: string } = {
  [attendanceStatus.absent]: "#EFBE12",
  [attendanceStatus.late]: "#F45B69",
  [attendanceStatus.onTime]: "#3FC28A",
};

export default function DashboardPage() {
  return (
    <main className="p-4 md:p-6">
      <StatsCardList />
      <div className="mt-6 grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border p-4">
            <div className="flex items-center mb-4 justify-between">
              <Link href={"/attendance"}>
                <Button variant={"link"} className="text-lg font-semibold ">
                  Attendance Overview
                </Button>
              </Link>
              <div className="flex gap-4 flex-wrap">
                {Object.values(attendanceStatus).map((status) => (
                  <div key={status} className="flex items-center gap-1">
                    <Circle
                      className="h-3 w-3"
                      color={colorMap[status]}
                      fill={colorMap[status]}
                    />
                    <h1>{status}</h1>
                  </div>
                ))}
              </div>
            </div>
            <AttendanceChart />
          </div>
          <AttendanceTable />
        </div>
        <div className="h-full">
          <Schedule />
        </div>
      </div>
    </main>
  );
}
