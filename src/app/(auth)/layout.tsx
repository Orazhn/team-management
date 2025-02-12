import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Image Section */}
      <div className="hidden md:flex w-full md:w-1/2 bg-[#7152F3] bg-opacity-20 justify-end items-center">
        <Image
          src="/auth-images/05 Dashboard (2) 1.png"
          alt="HRMS Dashboard"
          width={700}
          height={700}
          className="object-contain"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-4 md:p-8">
        <div className="max-w-sm w-full">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Welcome 👋
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
