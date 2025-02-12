import React from "react";
import { ChevronRight } from "lucide-react";
import { IEmployee } from "@/types/employee";
import Link from "next/link";

interface Member extends Omit<IEmployee, "employeeType" | "status"> {
  employeeType: string;
  status: string;
}

const CardMembers = ({ member }: { member: Member }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <h2>{member.employeeName}</h2>
          <p className="font-light text-sm text-gray-400">
            {member.designation}
          </p>
        </div>
      </div>
      <Link href={`/employees/${member.employeeId}`}>
        <ChevronRight width={18} />
      </Link>
    </div>
  );
};

export default CardMembers;
