import React from "react";

import { Lexend } from "next/font/google";
import HolidaysContent from "@/components/holidayComponents/holidaysContent";

const lexendFont = Lexend({
  subsets: ["latin"],
});

const HolidaysPage = () => {
  return (
    <div className={lexendFont.className}>
      <HolidaysContent />
    </div>
  );
};

export default HolidaysPage;
