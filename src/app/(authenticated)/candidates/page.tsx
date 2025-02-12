import React from "react";
import CandidatesContent from "@/components/candidatesComponents/candidatesContent";
import { Lexend } from "next/font/google";
import { cn } from "@/lib/utils";

const lexendFont = Lexend({
  subsets: ["latin"],
});

const CandidatesPage = () => {
  return (
    <div
      className={cn(
        "border md:m-3 p-3 rounded-md sm:m-0",
        lexendFont.className
      )}
    >
      <CandidatesContent />
    </div>
  );
};

export default CandidatesPage;
