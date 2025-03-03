import React, { Dispatch, FC, SetStateAction } from "react";
import { Checkbox } from "../ui/checkbox";
import { useGetDepartments } from "@/hooks/database/Department/useGetDepartments";
import { Label } from "../ui/label";

interface IFilter {
  department: string[];
  type: string;
}

interface IDepartmentFilter {
  filterData: IFilter;
  setFilterData: Dispatch<SetStateAction<IFilter>>;
}

const DepartmentFilter: FC<IDepartmentFilter> = ({
  filterData,
  setFilterData,
}) => {
  const { departments } = useGetDepartments();
  return (
    <div className="grid grid-cols-2 gap-y-3">
      {departments.map((department) => {
        const departmentId = String(department.id ?? "");
        return (
          <div key={departmentId} className="flex items-center space-x-2">
            <Checkbox
              id={department.name}
              checked={filterData.department.includes(department.name)}
              onCheckedChange={(checked) => {
                setFilterData((prev) => ({
                  ...prev,
                  department: checked
                    ? [...prev.department, department.name]
                    : prev.department.filter(
                        (name) => name !== department.name
                      ),
                }));
              }}
              className="rounded-md border-[#7152F3] data-[state=checked]:bg-[#7152F3] data-[state=checked]:text-white"
            />
            <Label htmlFor={department.name} className="text-sm font-normal">
              {department.name}
            </Label>
          </div>
        );
      })}
    </div>
  );
};

export default DepartmentFilter;
