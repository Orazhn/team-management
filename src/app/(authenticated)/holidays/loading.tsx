import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Loading = () => {
  const holidayHeads = ["Date", "Day", "Holiday Name"];
  return (
    <div className="border md:m-3 p-3 rounded-md sm:m-0">
      <header className="flex justify-between items-center sm:flex-col md:flex-row gap-2">
        <div className="relative">
          <Skeleton className="absolute left-3 top-3 h-4 w-4" />
          <Skeleton className="pl-10 w-[300px] h-10" />
        </div>
        <Skeleton className="w-32 h-10" />
      </header>
      <div className="flex gap-4 mt-5">
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-24 h-6" />
      </div>
      <div className="overflow-auto md:ml-0 sm:left-0 sm:mt-20 sm:absolute md:static md:mt-8 h-[700px] overflow-y-auto w-full">
        <Table>
          <TableHeader>
            <TableRow>
              {holidayHeads.map((head) => (
                <TableHead key={head} className="w-[60px]">
                  <Skeleton className="w-full h-6" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index} className="border-l-4 h-14">
                <TableCell>
                  <Skeleton className="w-24 h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-24 h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-40 h-6" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Loading;
