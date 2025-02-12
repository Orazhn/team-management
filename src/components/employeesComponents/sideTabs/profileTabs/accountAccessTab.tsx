import React from "react";
import FormField from "@/components/formComponents/formField";
import { IAccountAccess } from "@/types/employee";
import { Skeleton } from "@/components/ui/skeleton";

const AccountAccessTab = ({
  accountAccessInformation,
}: {
  accountAccessInformation: IAccountAccess;
}) => {
  if (!accountAccessInformation) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <FormField label="Email Address" value={accountAccessInformation.email} />
      <FormField label="Slack ID" value={accountAccessInformation.slackID} />
      <FormField label="Skype ID" value={accountAccessInformation.skypeID} />
      <FormField label="Github ID" value={accountAccessInformation.githubID} />
    </div>
  );
};

export default AccountAccessTab;
