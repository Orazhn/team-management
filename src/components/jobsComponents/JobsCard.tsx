import React from "react";
import { Circle } from "lucide-react";
import { IJob } from "@/types/job";
import JobsList from "./jobsList";
import { Lexend } from "next/font/google";
import { cn } from "@/lib/utils";
import { jobTypes } from "@/types/mainEnums";
import { Skeleton } from "../ui/skeleton";

const lexendFont = Lexend({
  subsets: ["latin"],
});

const JobsCard = ({
  jobs,
  variant,
  loading,
}: {
  jobs: IJob[];
  variant: jobTypes;
  loading: boolean;
}) => {
  const colorMap: { [key in jobTypes]: string } = {
    [jobTypes.active]: "#EFBE12",
    [jobTypes.inactive]: "#F45B69",
    [jobTypes.completed]: "#3FC28A",
  };
  if (loading) {
    return (
      <div className="border rounded-xl w-fit p-3 mt-5">
        <div className="flex gap-2 items-center">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-24 h-6 rounded-md" />
        </div>
        <Skeleton className="h-[200px] w-[300px] rounded-lg mt-3" />
      </div>
    );
  }

  return (
    <div className="border rounded-xl lg:w-1/4 p-3 mt-5 ">
      <div className="flex gap-2 items-center">
        <Circle
          className="w-4 h-4"
          color={colorMap[variant]}
          fill={colorMap[variant]}
        />
        <h1 className={cn("font-semibold", lexendFont.className)}>
          {variant} Jobs
        </h1>
      </div>
      <JobsList jobs={jobs} />
    </div>
  );
};

export default JobsCard;
