import React from "react";
import { Skeleton } from "../ui/skeleton";
import { CardContent } from "../ui/card";

const DepartmentCardLoading = () => {
  return (
    <CardContent className="mt-5 flex flex-col gap-2">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-5 w-5 rounded-full" />{" "}
        </div>
      ))}
    </CardContent>
  );
};

export default DepartmentCardLoading;
