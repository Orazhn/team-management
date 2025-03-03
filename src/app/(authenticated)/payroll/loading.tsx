import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import {
  Table,
  TableHead,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
} from "@/components/ui/table";

const Loading = () => {
  return (
    <div className="border md:m-3 p-3 rounded-md sm:m-0">
      <header className="flex justify-between items-center sm:flex-col md:flex-row gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Skeleton className="h-10 w-[300px] rounded-md" />
        </div>
        <Skeleton className="h-10 w-[150px] rounded-md" />
      </header>
      <div className="overflow-auto md:ml-0 sm:left-0 sm:mt-20 sm:absolute md:static md:mt-8 h-[700px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableHead key={index} className="w-[120px]">
                  <Skeleton className="h-4 w-full" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-md" />
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
