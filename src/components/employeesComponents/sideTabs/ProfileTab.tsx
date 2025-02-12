"use client";
import React, { useState, FC } from "react";
import { TabButton } from "./profileTabs/tabButton";
import { Briefcase, User, Lock } from "lucide-react";
import PersonalTab from "./profileTabs/personalTab";
import ProfessionalTab from "./profileTabs/professionalTab";
import AccountAccessTab from "./profileTabs/accountAccessTab";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  IProfessionalInformation,
  IAccountAccess,
  IPersonalInformation,
} from "@/types/employee";

const montserrat = Montserrat({ subsets: ["latin"] });
interface IEmployeeData {
  professionalInformation: IProfessionalInformation;
  personalInformation: IPersonalInformation;
  accountAccessInformation: IAccountAccess;
}

export const ProfileTab: FC<IEmployeeData> = ({
  professionalInformation,
  personalInformation,
  accountAccessInformation,
}) => {
  const [activeTab, setActiveTab] = useState("personal");
  const TabContents = [
    {
      content: <PersonalTab personalInformation={personalInformation} />,
      name: "personal",
    },
    {
      content: (
        <ProfessionalTab professionalInformation={professionalInformation} />
      ),
      name: "professional",
    },
    {
      content: (
        <AccountAccessTab accountAccessInformation={accountAccessInformation} />
      ),
      name: "account-access",
    },
  ];
  return (
    <div className="space-y-6">
      <div
        className={cn(
          "flex gap-6 border-b overflow-x-auto pb-px",
          montserrat.className
        )}
      >
        <TabButton
          active={activeTab === "personal"}
          onClick={() => setActiveTab("personal")}
          icon={<User className="w-4 h-4 mr-2" />}
          label="Personal Information"
        />
        <TabButton
          active={activeTab === "professional"}
          onClick={() => setActiveTab("professional")}
          icon={<Briefcase className="w-4 h-4 mr-2" />}
          label="Professional Information"
        />
        <TabButton
          active={activeTab === "account-access"}
          onClick={() => setActiveTab("account-access")}
          icon={<Lock className="w-4 h-4 mr-2" />}
          label="Account Access"
        />
      </div>
      {TabContents.map(
        (tab) =>
          tab.name == activeTab && <div key={tab.name}>{tab.content}</div>
      )}
    </div>
  );
};
