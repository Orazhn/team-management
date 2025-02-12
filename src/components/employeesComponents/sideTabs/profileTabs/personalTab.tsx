import React from "react";
import FormField from "@/components/formComponents/formField";
import { IPersonalInformation } from "@/types/employee";
import { Skeleton } from "@/components/ui/skeleton";

const PersonalTab = ({
  personalInformation,
}: {
  personalInformation: IPersonalInformation;
}) => {
  if (!personalInformation) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {[...Array(12)].map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <FormField label="First Name" value={personalInformation.firstName} />
      <FormField label="Last Name" value={personalInformation.lastName} />
      <FormField
        label="Mobile Number"
        value={personalInformation.mobileNumber}
      />
      <FormField label="Email Address" value={personalInformation.email} />
      <FormField
        label="Date of Birth"
        value={personalInformation.dateOfBirth}
      />
      <FormField
        label="Marital Status"
        value={personalInformation.maritalStatus}
      />
      <FormField label="Gender" value={personalInformation.gender as string} />
      <FormField label="Nationality" value={personalInformation.nationality} />
      <FormField label="Address" value={personalInformation.address} />
      <FormField label="City" value={personalInformation.city} />
      <FormField label="State" value={personalInformation.state} />
      <FormField label="Zip Code" value={personalInformation.zipCode} />
    </div>
  );
};

export default PersonalTab;
