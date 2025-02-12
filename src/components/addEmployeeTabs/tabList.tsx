import React from "react";
import { User, BriefcaseBusiness, LockKeyhole } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabList = () => {
  return (
    <TabsList className="mb-8 sm:mt-2 mt-0">
      <TabsTrigger
        value="personal"
        disabled
        className="flex items-center gap-2 text-black"
      >
        <User className="h-4 w-4" />
        <p className="md:block hidden">Personal Information</p>
      </TabsTrigger>
      <TabsTrigger
        value="professional"
        disabled
        className="flex items-center gap-2"
      >
        <BriefcaseBusiness className="h-4 w-4" />
        <p className="md:block hidden">Professional Information</p>
      </TabsTrigger>
      <TabsTrigger value="access" disabled className="flex items-center gap-2">
        <LockKeyhole className="h-4 w-4" />
        <p className="md:block hidden">Account Access</p>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabList;
