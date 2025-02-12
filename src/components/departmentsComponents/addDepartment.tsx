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
import { Input } from "@/components/ui/input";
import { Building2 } from "lucide-react";
import { Lexend } from "next/font/google";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { usePostDepartment } from "@/hooks/database/Department/usePostDepartment";
import toast from "react-hot-toast";
import { default as Select } from "react-select";
import { Label } from "../ui/label";
import { useGetEmployees } from "@/hooks/database/Employee/useGetEmployees";
import { useGetMode } from "@/providers/toggleMode";

const lexendFont = Lexend({
  subsets: ["latin"],
});

export function AddDepartmentModal() {
  const theme = useGetMode();
  const [departmentName, setDepartmentName] = useState("");
  const [chosenEmployees, setChosenEmployees] = useState<
    { employeeName: string; employeeId: string }[]
  >([]);

  const { employees, isLoading } = useGetEmployees();
  const { mutateAsync: postDepartmentAsync, isPending } = usePostDepartment();

  const addDepartment = async () => {
    if (departmentName.trim()) {
      try {
        await toast.promise(
          postDepartmentAsync({
            name: departmentName,
            membersId: chosenEmployees.map((e) => e.employeeId),
          }),
          {
            loading: "Saving...",
            success: <b>Department added!</b>,
            error: <b>Could not add</b>,
          }
        );
        setDepartmentName("");
        setChosenEmployees([]);
      } catch (error) {
        console.error("Error adding department:", error);
      }
    } else {
      toast.error("Department name is empty");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Building2 /> Add New Department
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px]", lexendFont.className)}>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Add New Department</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              placeholder="Department Name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="employees">Employees</Label>
            <Select
              isMulti
              options={
                employees
                  ? employees.map((employee) => ({
                      label: employee.employeeName,
                      value: employee.employeeId,
                    }))
                  : []
              }
              styles={{
                menu: (styles) => ({
                  ...styles,
                  backgroundColor: theme == "dark" ? "black" : "",
                }),
                control: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: theme == "dark" ? "black" : "white",
                }),
                option: (styles) => {
                  return {
                    ...styles,
                    backgroundColor: theme == "dark" ? "#09090b" : "white",
                    color: theme == "dark" ? "white" : "black",
                    ":hover": {
                      backgroundColor: theme == "dark" ? "#27272a" : "#f1f5f9",
                    },
                  };
                },
              }}
              placeholder="Select Employees"
              value={chosenEmployees.map((e) => ({
                label: e.employeeName,
                value: e.employeeId,
              }))}
              onChange={(selected) =>
                setChosenEmployees(
                  selected.map((s) => ({
                    employeeName: s.label,
                    employeeId: s.value,
                  }))
                )
              }
              isLoading={isLoading}
            />
          </div>
        </div>
        <DialogFooter className="flex gap-2 w-full justify-center">
          <DialogClose asChild>
            <Button variant="ghost" className="border w-full py-5 font-light">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={addDepartment}
              className="w-full py-5 font-light"
              disabled={isPending}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
