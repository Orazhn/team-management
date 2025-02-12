import React from "react";
import LoginForm from "@/app/(auth)/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <p className="text-gray-600 text-center mb-8">Please login here</p>
      <LoginForm variant="signin" />
    </div>
  );
};

export default LoginPage;
