import React from "react";
import CandidatesContent from "@/components/candidatesComponents/candidatesContent";
import { Lexend } from "next/font/google";

const lexendFont = Lexend({
  subsets: ["latin"],
});

const CandidatesPage = () => {
  return (
    <div className={lexendFont.className}>
      <CandidatesContent />
    </div>
  );
};

export default CandidatesPage;
