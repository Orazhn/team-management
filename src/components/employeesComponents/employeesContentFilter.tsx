"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { SlidersHorizontal } from "lucide-react";
import { Lexend } from "next/font/google";
import { cn } from "@/lib/utils";
import React, { useState, memo } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

const lexendFont = Lexend({
  subsets: ["latin"],
});

interface IFilter {
  department: string[];
  type: string;
}

const LazyDepartmentFilter = dynamic(() => import("./departmentFilter"), {
  loading: () => <p>Loading Departments</p>,
});

function EmployeesContentFilter({
  setFilter,
  clearFilter,
}: {
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  clearFilter: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) {
  const [filterData, setFilterData] = useState<IFilter>({
    department: [],
    type: "",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px] ", lexendFont.className)}>
        <DialogHeader className="border-b pb-4 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl">Filter</DialogTitle>
          <DialogClose>
            <X />
          </DialogClose>
        </DialogHeader>
        <div>
          <div className="space-y-4">
            <Label className="text-base">Department</Label>
            <LazyDepartmentFilter
              filterData={filterData}
              setFilterData={setFilterData}
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-medium">Select Type</h3>
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="office"
                id="office"
                onClick={() => setFilterData({ ...filterData, type: "Office" })}
                checked={filterData.type === "Office"}
              />
              <Label htmlFor="office">Office</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="remote"
                id="remote"
                onClick={() => setFilterData({ ...filterData, type: "Remote" })}
                checked={filterData.type === "Remote"}
              />
              <Label htmlFor="remote">Remote</Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter className="flex gap-2 w-full justify-center">
          <DialogClose asChild>
            <Button
              onClick={() => {
                clearFilter();
                setFilterData({ department: [], type: "" });
              }}
              variant="ghost"
              className="border w-full py-5 font-light"
            >
              Clear
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full py-5 font-light"
              onClick={() => setFilter(filterData)}
            >
              Apply
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default memo(EmployeesContentFilter);
