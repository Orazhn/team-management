import React from "react";

import { Lexend } from "next/font/google";
import { cn } from "@/lib/utils";
import HolidaysContent from "@/components/holidayComponents/holidaysContent";

const lexendFont = Lexend({
  subsets: ["latin"],
});

const HolidaysPage = () => {
  return (
    <div
      className={cn(
        "border md:m-3 p-3 rounded-md sm:m-0",
        lexendFont.className
      )}
    >
      <HolidaysContent />
    </div>
  );
};

export default HolidaysPage;
