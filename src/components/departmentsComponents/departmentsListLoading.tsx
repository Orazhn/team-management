import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DepartmentCardLoading from "./departmentCardLoading";

const DepartmentListLoading = () => {
  return (
    <div className="p-4 border rounded-md flex flex-col lg:p-4 lg:m-4 md:items-center lg:items-start pt-4">
      <div className="flex justify-between w-full">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[190px]" />
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        {[...Array(4)].map((_, index) => (
          <Card className="md:w-[300px] sm:w-full" key={index}>
            <CardHeader className="border-b flex justify-between w-full flex-row pr-2">
              <div className="flex flex-col">
                <Skeleton className="h-6 w-32 mb-1" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-5 w-16" />
            </CardHeader>
            <DepartmentCardLoading />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentListLoading;
