import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import NavigationBar from "~/components/elements/NavigationBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getServerSession(authOptions);

  // console.log(session?.user, "session.user: DashboardLayout");

  if (!session || !session.user) {
    redirect("/signin");
  }

  return (
    <div className="pt-[100px]">
      <main className="container">{children}</main>
    </div>
  );
};

export default DashboardLayout;
