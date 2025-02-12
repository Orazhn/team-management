import React from "react";
import { IJob } from "@/types/job";
import { Lexend } from "next/font/google";
import { cn } from "@/lib/utils";
import { BriefcaseIcon, MapPinIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useDeleteJob } from "@/hooks/database/Jobs/useDeleteJob";
import { useGetJobs } from "@/hooks/database/Jobs/useGetJobs";

const lexendFont = Lexend({
  subsets: ["latin"],
});

const JobsList = ({ jobs }: { jobs: IJob[] }) => {
  const { deleteJob, isDeleting, isSuccess } = useDeleteJob();
  const { refetch } = useGetJobs();
  if (!jobs.length) {
    return <div>Empty</div>;
  }
  const handleDeleteJob = (id: number) => {
    deleteJob(id);
    if (isSuccess) refetch();
  };

  return (
    <div className="space-y-3 mt-3">
      {jobs.map((job, index) => (
        <div
          key={index}
          className={cn(
            "p-4 rounded-lg bg-[#A2A1A8] bg-opacity-5 space-y-3 flex flex-col flex-wrap",
            lexendFont.className,
            isDeleting && "opacity-60"
          )}
        >
          <div className="flex items-start gap-3 justify-between">
            <div className="flex gap-2">
              <BriefcaseIcon className="w-5 h-5 mt-1" />
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold ">{job.title}</h3>

                <p className="text-sm font-light text-gray-500">
                  {job.description.length > 20
                    ? `${job.description.slice(0, 20)}...`
                    : job.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.categories.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="bg-violet-600 hover:bg-violet-600/90 text-white font-extralight"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Button
              variant={"outline"}
              onClick={() => handleDeleteJob(job.id as number)}
            >
              <Trash />
            </Button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <p className="text-black font-light dark:text-white">
              <span className="font-semibold ">${job.salary}</span>
              /Month
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsList;
