import React, { FC } from "react";
import { Briefcase, Mail } from "lucide-react";

interface employeeData {
  name: string;
  designation: string;
  email: string;
}

const EmployeeHeader: FC<employeeData> = ({ name, designation, email }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-start p-4 px-12 rounded-xl border-2 border-main">
      <div className="flex flex-col sm:flex-row gap-4 items-start w-full sm:w-auto">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span>{designation}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHeader;
