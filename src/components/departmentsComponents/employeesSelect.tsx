import React, { Dispatch, SetStateAction } from "react";
import { useGetEmployees } from "@/hooks/database/Employee/useGetEmployees";
import { useGetMode } from "@/providers/toggleMode";
import { Label } from "../ui/label";
import { default as Select } from "react-select";

interface IEmployeesSelect {
  chosenEmployees: { employeeName: string; employeeId: string }[];
  setChosenEmployees: Dispatch<
    SetStateAction<{ employeeName: string; employeeId: string }[]>
  >;
}

const EmployeesSelect = ({
  chosenEmployees,
  setChosenEmployees,
}: IEmployeesSelect) => {
  const theme = useGetMode();
  const { employees, isLoading } = useGetEmployees();
  return (
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
  );
};

export default EmployeesSelect;
