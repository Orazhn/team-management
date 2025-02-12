"use client";

import { SignIn, SignUp } from "@clerk/nextjs";

const LoginForm = ({ variant }: { variant: "signin" | "signup" }) => {
  return (
    <div className="space-y-4">
      {variant == "signin" ? (
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-purple-600 hover:bg-purple-700 text-white rounded-md py-2",
              formFieldInput:
                "border-gray-300 focus:ring-purple-500 focus:border-purple-500 rounded-md",
            },
          }}
        />
      ) : (
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-purple-600 hover:bg-purple-700 text-white rounded-md py-2",
              formFieldInput:
                "border-gray-300 focus:ring-purple-500 focus:border-purple-500 rounded-md",
            },
          }}
        />
      )}
    </div>
  );
};

export default LoginForm;
