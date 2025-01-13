"use client";

import { Notification } from "@prisma/client";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import subDays from "date-fns/subDays";

export function NotificationCard({
  notification,
  style,
}: {
  notification: Notification;
  style: any;
}) {
  const createdAtDate = format(new Date(notification.createdAt), "EEEE");
  const createdAtTime = format(new Date(notification.createdAt), "h:mmaaa");
  const ago = formatDistance(subDays(notification.createdAt, 0), new Date(), {
    addSuffix: true,
  });
  return (
    <div
      className="slide-in relative overflow-hidden border bg-card sm:rounded-lg"
      style={style}
    >
      <div className="px-4 pb-6 pt-5 sm:px-6 md:pb-4 md:pt-3">
        <div className="notification-indicator absolute right-2 top-2 h-2 w-2 rounded-full bg-[#28a745]"></div>
        <p className="mb-2 text-sm text-foreground">{notification.message}</p>
        <div className="text-xs text-foreground">
          {createdAtDate} {createdAtTime}
          <small className="block text-[10px] text-foreground">{ago}</small>
        </div>
      </div>
    </div>
  );
}
