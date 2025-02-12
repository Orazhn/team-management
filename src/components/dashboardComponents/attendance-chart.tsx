"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useState, useEffect } from "react";
import { useGetAttendances } from "@/hooks/database/Attendance/useGetAttendances";
import { attendanceStatus, memberType } from "@/types/mainEnums";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const getDayOfWeekFromDate = (date: string): string => {
  const d = new Date(date);
  const options = { weekday: "short" as const };
  return d.toLocaleDateString("en-US", options);
};

export interface IAttendance {
  employeeId: string;
  employeeName: string;
  designation: string;
  employeeType: memberType;
  checkIn: string;
  checkOut: string;
  break: string;
  workingHours: string;
  attendanceStatus: attendanceStatus;
  date: string;
}

interface AttendanceCount {
  [day: string]: {
    [status in attendanceStatus]: number;
  };
}

export function AttendanceChart() {
  const { attendances } = useGetAttendances();

  const [attendanceCount, setAttendanceCount] = useState<AttendanceCount>({
    Mon: {
      [attendanceStatus.onTime]: 0,
      [attendanceStatus.late]: 0,
      [attendanceStatus.absent]: 0,
    },
    Tue: {
      [attendanceStatus.onTime]: 0,
      [attendanceStatus.late]: 0,
      [attendanceStatus.absent]: 0,
    },
    Wed: {
      [attendanceStatus.onTime]: 0,
      [attendanceStatus.late]: 0,
      [attendanceStatus.absent]: 0,
    },
    Thu: {
      [attendanceStatus.onTime]: 0,
      [attendanceStatus.late]: 0,
      [attendanceStatus.absent]: 0,
    },
    Fri: {
      [attendanceStatus.onTime]: 0,
      [attendanceStatus.late]: 0,
      [attendanceStatus.absent]: 0,
    },
    Sat: {
      [attendanceStatus.onTime]: 0,
      [attendanceStatus.late]: 0,
      [attendanceStatus.absent]: 0,
    },
    Sun: {
      [attendanceStatus.onTime]: 0,
      [attendanceStatus.late]: 0,
      [attendanceStatus.absent]: 0,
    },
  });

  useEffect(() => {
    if (attendances) {
      const newAttendanceCount = { ...attendanceCount };

      attendances.forEach((attendance) => {
        const dayOfWeek = getDayOfWeekFromDate(
          attendance.date
        ) as keyof AttendanceCount;
        if (dayOfWeek in newAttendanceCount) {
          newAttendanceCount[dayOfWeek][
            attendance.attendanceStatus as "On Time" | "Late" | "Absent"
          ]++;
        }
      });

      setAttendanceCount(newAttendanceCount);
    }
  }, [attendances]);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "On Time",
        data: [
          attendanceCount.Mon[attendanceStatus.onTime],
          attendanceCount.Tue[attendanceStatus.onTime],
          attendanceCount.Wed[attendanceStatus.onTime],
          attendanceCount.Thu[attendanceStatus.onTime],
          attendanceCount.Fri[attendanceStatus.onTime],
          attendanceCount.Sat[attendanceStatus.onTime],
          attendanceCount.Sun[attendanceStatus.onTime],
        ],
        backgroundColor: "#3FC28A",
      },
      {
        label: "Late",
        data: [
          attendanceCount.Mon[attendanceStatus.late],
          attendanceCount.Tue[attendanceStatus.late],
          attendanceCount.Wed[attendanceStatus.late],
          attendanceCount.Thu[attendanceStatus.late],
          attendanceCount.Fri[attendanceStatus.late],
          attendanceCount.Sat[attendanceStatus.late],
          attendanceCount.Sun[attendanceStatus.late],
        ],
        backgroundColor: "#F45B69",
      },
      {
        label: "Absent",
        data: [
          attendanceCount.Mon[attendanceStatus.absent],
          attendanceCount.Tue[attendanceStatus.absent],
          attendanceCount.Wed[attendanceStatus.absent],
          attendanceCount.Thu[attendanceStatus.absent],
          attendanceCount.Fri[attendanceStatus.absent],
          attendanceCount.Sat[attendanceStatus.absent],
          attendanceCount.Sun[attendanceStatus.absent],
        ],
        backgroundColor: "#EFBE12",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        max: attendances?.length,
      },
    },
  };

  return (
    <div className="h-[300px] w-full">
      <Bar data={data} options={options} />
    </div>
  );
}
