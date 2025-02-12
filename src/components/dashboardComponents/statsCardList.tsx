"use client";
import React from "react";
import { Building2, ScrollText, UsersRound, Briefcase } from "lucide-react";
import { StatsCard } from "@/components/dashboardComponents/stats-card";
import { useGetEmployees } from "@/hooks/database/Employee/useGetEmployees";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { useGetDepartments } from "@/hooks/database/Department/useGetDepartments";
import { IEmployee } from "@/types/employee";
import { department } from "@/types/departments";
import { useGetJobs } from "@/hooks/database/Jobs/useGetJobs";
import { IJob } from "@/types/job";
import { useGetCandidates } from "@/hooks/database/Candidate/useGetCandidates";
import { ICandidate } from "@/types/candidate";
interface IEmployeeDate extends IEmployee {
  updated_at: Date;
}
interface IDepartmentDate extends department {
  updated_at: Date;
}
interface IJobsDate extends IJob {
  updated_at: Date;
}
interface ICandidatesDate extends ICandidate {
  updated_at: Date;
}
const StatsCardList = () => {
  const { employees, isLoading: isEmployeesLoading } = useGetEmployees();
  const { departments, isLoading: isDepartmentsLoading } = useGetDepartments();
  const { jobs, isLoading: isJobsLoading } = useGetJobs();
  const { candidates, isPending: isCandidatesLoading } = useGetCandidates();
  if (
    isEmployeesLoading ||
    isDepartmentsLoading ||
    isJobsLoading ||
    isCandidatesLoading
  ) {
    return (
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-wrap flex-wrap">
                <Skeleton className="w-7 h-7 rounded-md" />
                <Skeleton className="w-24 h-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Skeleton className="w-16 h-6" />
              </div>
              <Skeleton className="w-32 h-3 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getLatestDate = <T extends { updated_at: Date }>(data: T[]) => {
    if (!data) return "No data available";
    if (data.length === 0) return "No data available";
    const latestDate = data.reduce((latest, current) => {
      const latestDate = new Date(latest.updated_at);
      const currentDate = new Date(current.updated_at);
      return currentDate > latestDate ? current : latest;
    }).updated_at;
    return format(new Date(latestDate), "MMMM dd, yyyy");
  };
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Employee"
        value={employees?.length}
        date={getLatestDate(employees as IEmployeeDate[])}
        icon={<UsersRound size={20} />}
      />
      <StatsCard
        title="Total Departments"
        value={departments?.length}
        date={getLatestDate(departments as IDepartmentDate[])}
        icon={<Building2 size={20} />}
      />
      <StatsCard
        title="Total Jobs"
        value={jobs?.length as number}
        date={getLatestDate(jobs as IJobsDate[])}
        icon={<Briefcase size={20} />}
      />
      <StatsCard
        title="Total Candidates"
        value={candidates?.length as number}
        date={getLatestDate(candidates as ICandidatesDate[])}
        icon={<ScrollText size={20} />}
      />
    </div>
  );
};

export default StatsCardList;
