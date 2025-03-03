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
import { Lexend } from "next/font/google";
import { cn } from "@/lib/utils";
import React, { memo, useState } from "react";
import toast from "react-hot-toast";
import { Label } from "../ui/label";
import { useGetEmployees } from "@/hooks/database/Employee/useGetEmployees";
import { useGetPayrolls } from "@/hooks/database/Payroll/useGetPayrolls";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NumberInput } from "../ui/number-input";
import { payrollStatus } from "@/types/mainEnums";
import { DollarSign } from "lucide-react";
import { usePostPayroll } from "@/hooks/database/Payroll/usePostPayroll";

const lexendFont = Lexend({
  subsets: ["latin"],
});

function AddPayrollModal() {
  const [salary, setSalary] = useState("");
  const [deduction, setDeduction] = useState("");
  const [status, setStatus] = useState<payrollStatus>();
  const [employee, setEmployee] = useState<{
    employeeName: string;
    employeeId: string;
  }>();
  const handleSalaryChange = (newValue: string) => {
    setSalary(newValue);
  };
  const handleDeductionChange = (val: string) => {
    setDeduction(val);
  };

  const { employees } = useGetEmployees();
  const { postPayroll, isPending } = usePostPayroll();
  const { payrolls } = useGetPayrolls();

  const isPostEnable = status && employee;
  const postData = async () => {
    toast.promise(
      postPayroll({
        employeeId: employee?.employeeId as string,
        employeeName: employee?.employeeName as string,
        ctc: +salary * 12,
        deduction: +deduction,
        status: status as payrollStatus,
        salary: +salary,
      }),
      {
        loading: "Saving...",
        success: <b>Payroll saved!</b>,
        error: <b>Could not save</b>,
      }
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <DollarSign /> Add Payroll
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px]", lexendFont.className)}>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Add Payroll Record</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="employees">Employees</Label>
            <Select
              onValueChange={(value) =>
                setEmployee(employees?.find((emp) => emp.employeeId === value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an Employee" />
              </SelectTrigger>
              <SelectContent>
                {employees
                  ?.filter(
                    (employee) =>
                      !payrolls?.some(
                        (payroll) => payroll.employeeId === employee.employeeId
                      )
                  )
                  .map((employee) => (
                    <SelectItem
                      key={employee.employeeId}
                      value={employee.employeeId}
                    >
                      {employee.employeeName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Salary Per Month</Label>
            <div className="flex items-center gap-2">
              $<NumberInput value={salary} onChange={handleSalaryChange} />
            </div>
          </div>
          <div>
            <Label>Deduction</Label>
            <div className="flex items-center gap-2">
              $
              <NumberInput value={deduction} onChange={handleDeductionChange} />
            </div>
          </div>
          <div>
            <Label>CTC</Label>
            <Input disabled value={+salary * 12} />
          </div>
          <div>
            <Label>Status</Label>
            <Select
              onValueChange={(value) => setStatus(value as payrollStatus)}
            >
              <SelectTrigger
                className={cn(
                  status === "Completed" && "completed",
                  status === "Pending" && "pending"
                )}
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="Completed"
                  className="on-time mb-1 focus:bg-[#3fc28a] focus:bg-opacity-20 focus:text-[#3fc28a]"
                >
                  On Time
                </SelectItem>
                <SelectItem
                  value="Pending"
                  className="pending mb-1 focus:bg-[#efbf1241] focus:text-[#efbe12] focus:bg-opacity-20"
                >
                  Pending
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex gap-2 w-full justify-center">
          <DialogClose asChild>
            <Button variant="ghost" className="border w-full py-5 font-light">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose
            asChild
            disabled={!isPostEnable || isPending}
            onClick={postData}
          >
            <Button className="w-full py-5 font-light">Add</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default memo(AddPayrollModal);
