import React from "react";
import FormField from "@/components/formComponents/formField";
import { IProfessionalInformation } from "@/types/employee";
import { Skeleton } from "@/components/ui/skeleton";

const ProfessionalTab = ({
  professionalInformation,
}: {
  professionalInformation: IProfessionalInformation;
}) => {
  if (!professionalInformation) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {[...Array(9)].map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <FormField
        label="Employee ID"
        value={professionalInformation.employeeId}
      />
      <FormField label="User Name" value={professionalInformation.userName} />
      <FormField
        label="Employee Type"
        value={professionalInformation.employeeType}
      />
      <FormField label="Email Address" value={professionalInformation.email} />
      <FormField
        label="Department"
        value={professionalInformation.joiningDate}
      />
      <FormField
        label="Designation"
        value={professionalInformation.designation}
      />
      <FormField
        label="Working Days"
        value={professionalInformation.workingDays.join(", ")}
      />
      <FormField
        label="Joining Date"
        value={professionalInformation.joiningDate}
      />
      <FormField
        label="Official Location"
        value={professionalInformation.officeLocation}
      />
    </div>
  );
};

export default ProfessionalTab;
