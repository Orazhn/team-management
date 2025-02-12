"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EmployeesContentLoading = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input placeholder="Search" className="pl-10 w-[300px]" disabled />
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#7950F2] hover:bg-[#7950F2]/90" disabled>
            <Plus className="mr-2 h-4 w-4" />
            Add New Employee
          </Button>
          <Button variant="outline" disabled>
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>
      <div className="rounded-lg border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              {[...Array(7)].map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-5 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                {[...Array(7)].map((_, i) => (
                  <TableCell key={i}>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeesContentLoading;
