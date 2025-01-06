"use client";
import { Notification } from "@prisma/client";
import { NotificationCard } from "./notifications";
import { Card, CardContent, CardTitle } from "../ui/card";

const UserNotificationsList = ({
  notifications,
}: {
  notifications: Notification[];
}) => {
  return (
    <>
    <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
      <div className="space-y-2">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </>
  );
};

export default UserNotificationsList;
