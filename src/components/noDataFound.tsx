import { PackageOpen } from "lucide-react";
import React from "react";

const NoDataFound = ({ name }: { name: string }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 pt-10">
      <h1 className="font-bold text-xl">No {name} found</h1>
      <PackageOpen size={70} className="text-gray-700" />
    </div>
  );
};

export default NoDataFound;
