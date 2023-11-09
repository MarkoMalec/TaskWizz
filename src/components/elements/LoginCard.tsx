"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import CredentialLoginForm from "../forms/CredentialLoginForm";

const LoginCard = () => {
  return (
    <Card className="w-full max-w-[400px] text-center">
      <CardHeader className="mb-6">
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>
          Enter your email and password to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CredentialLoginForm />
      </CardContent>
      <CardFooter>
        <span className="w-full text-center text-[.8em] opacity-[.5]">
          Dont share your password with anyone.
        </span>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
