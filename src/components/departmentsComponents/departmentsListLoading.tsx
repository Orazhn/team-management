import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DepartmentListLoading = () => {
  return (
    <div className="p-4 border">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[220px]" />
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
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentListLoading;
