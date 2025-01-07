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
      <h2 className="mb-2 text-2xl font-semibold">Notifications</h2>
      <div className="space-y-2">
        {notifications.map((notification, index) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </>
  );
};

export default UserNotificationsList;
