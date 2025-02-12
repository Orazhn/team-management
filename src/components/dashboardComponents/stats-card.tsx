import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { ReactElement } from "react";
import { Montserrat } from "next/font/google";

interface StatsCardProps {
  title: string;
  value: string | number;
  date?: string;
  className?: string;
  icon: ReactElement;
}
const montserrat = Montserrat({ subsets: ["latin"] });

export function StatsCard({
  title,
  value,
  date,
  className,
  icon,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          className={`text-sm font-medium flex items-center gap-2 text-wrap flex-wrap ${montserrat.className}`}
        >
          <div className="p-1 bg-[#7152F3]  bg-opacity-10 text-[#7152F3] rounded-md">
            {icon}
          </div>{" "}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className={`text-2xl font-bold `}>{value}</div>
        </div>
        {date && (
          <p className="text-xs text-muted-foreground">Updated: {date}</p>
        )}
      </CardContent>
    </Card>
  );
}
