import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IEmployee } from "@/types/employee";

const SkeletonTableRow = () => (
  <TableBody>
    {Array.from({ length: 6 }).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton className="h-4 w-16" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-32" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-20" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-6 w-16 rounded-md" />
        </TableCell>
        <TableCell>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);

const MembersList = ({
  searchData,
  isLoading,
}: {
  searchData: IEmployee[] | undefined;
  isLoading: boolean;
}) => {
  if (isLoading) return <SkeletonTableRow />;

  return (
    <TableBody>
      {searchData?.map((member, index) => (
        <TableRow key={index}>
          <TableCell className="font-medium">{member.employeeId}</TableCell>
          <TableCell>{member.employeeName}</TableCell>
          <TableCell>{member.designation}</TableCell>
          <TableCell>{member.employeeType}</TableCell>
          <TableCell>
            <Badge
              className={cn(
                "rounded-md  bg-opacity-10 p-2 text-center",
                "text-[#7152F3] bg-[#7152F3] hover:bg-transparent p-1"
              )}
            >
              {member.status}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Link href={`/employees/${member.employeeId}`}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default MembersList;
