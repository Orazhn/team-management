import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="border md:m-3 p-3 rounded-md sm:m-0">
      <header className="flex justify-between items-center sm:flex-col md:flex-row gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Skeleton className="h-10 w-[300px] rounded-md" />
        </div>
        <Skeleton className="h-10 w-[150px] rounded-md" />
      </header>
      <div className="flex gap-4 flex-wrap sm:justify-center md:justify-evenly lg:justify-start ">
        <div className="border rounded-xl w-fit p-3 mt-5">
          <div className="flex gap-2 items-center">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-24 h-6 rounded-md" />
          </div>
          <Skeleton className="h-[200px] w-[300px] rounded-lg mt-3" />
        </div>
        <div className="border rounded-xl w-fit p-3 mt-5">
          <div className="flex gap-2 items-center">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-24 h-6 rounded-md" />
          </div>
          <Skeleton className="h-[200px] w-[300px] rounded-lg mt-3" />
        </div>
        <div className="border rounded-xl w-fit p-3 mt-5">
          <div className="flex gap-2 items-center">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-24 h-6 rounded-md" />
          </div>
          <Skeleton className="h-[200px] w-[300px] rounded-lg mt-3" />
        </div>
      </div>
    </div>
  );
};

export default loading;
