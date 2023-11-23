import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { EdgeStoreProvider } from "~/lib/edgestore";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "admin") {
    redirect("/dashboard");
  }

  return <EdgeStoreProvider>{children}</EdgeStoreProvider>;
};

export default DashboardLayout;
