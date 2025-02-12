"use client";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import JobsCard from "./JobsCard";
import { AddJob } from "@/components/jobsComponents/addJob";
import { useGetJobs } from "@/hooks/database/Jobs/useGetJobs";
import { IJob } from "@/types/job";
import { jobTypes } from "@/types/mainEnums";
import { useSearch } from "@/hooks/logic/useSearch";

const JobsContent = () => {
  const { jobs, isLoading } = useGetJobs();
  const search = useSearch(jobs, "title");

  return (
    <div className="border md:m-3 p-3 rounded-md sm:m-0">
      <header className="flex justify-between items-center sm:flex-col md:flex-row gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search"
            className="pl-10 w-[300px]"
            onChange={search.onChange}
            value={search.value}
          />
        </div>
        <AddJob />
      </header>
      <div className="flex gap-4 flex-wrap sm:justify-center md:justify-evenly lg:justify-start ">
        <JobsCard
          jobs={
            search.searchData?.filter(
              (job) => job.jobType === jobTypes.active
            ) as IJob[]
          }
          variant={jobTypes.active}
          loading={isLoading}
        />
        <JobsCard
          jobs={
            search.searchData?.filter(
              (job) => job.jobType === jobTypes.inactive
            ) as IJob[]
          }
          variant={jobTypes.inactive}
          loading={isLoading}
        />
        <JobsCard
          jobs={
            search.searchData?.filter(
              (job) => job.jobType === jobTypes.completed
            ) as IJob[]
          }
          variant={jobTypes.completed}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default JobsContent;
