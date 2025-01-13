"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import UserNotificationsList from "~/components/notifications/UserNotificationsList";
import ChartsDashboardGrid from "~/components/charts/ChartsDashboardGrid";
import ChartSkeleton from "~/components/skeletons/ChartSkeleton";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex w-full gap-6">
      <div className="w-4/12">
        <Suspense fallback={<ChartSkeleton />}>
          <UserNotificationsList />
        </Suspense>
      </div>
      <div className="w-8/12">
        {session.user.role === "admin" && (
          <Suspense fallback={<ChartSkeleton />}>
            <ChartsDashboardGrid />
          </Suspense>
        )}
      </div>
    </div>
  );
}
