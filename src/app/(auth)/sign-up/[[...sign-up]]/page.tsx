import React from "react";
import LoginForm from "@/app/(auth)/LoginForm";

const page = () => {
  return (
    <div>
      <p className="text-gray-600 text-center mb-8">Please register here</p>
      <LoginForm variant="signup" />
    </div>
  );
};

export default page;
