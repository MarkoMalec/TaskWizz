import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import LoginCard from "~/components/elements/LoginCard";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="px-4 sm:container bg-background text-foreground flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">Sign in</span> to{" "}
            <span className="text-[hsl(280,100%,70%)]">TaskWizz</span> App
          </h1>
          <LoginCard />
        </div>
      </main>
    );
  }
  redirect("/");
};

export default SignInPage;
