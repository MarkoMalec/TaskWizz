"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { redirect } from "next/navigation";

import { prisma } from "~/lib/prisma";

import UserNotificationsList from "~/components/notifications/UserNotificationsList";
import ChartsDashboardGrid from "~/components/charts/ChartsDashboardGrid";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const tasks = await prisma.task.findMany();
  const notifications = await prisma.notification.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="flex w-full gap-6">
      <div className="w-4/12">
        <UserNotificationsList notifications={notifications} />
      </div>
      <div className="w-8/12">
        {session.user.role === "admin" && <ChartsDashboardGrid tasks={tasks} />}
      </div>
    </div>
  );
}
