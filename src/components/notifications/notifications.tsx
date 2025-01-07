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
      className="slide-in relative overflow-hidden bg-secondary shadow-md sm:rounded-lg"
      style={style}
    >
      <div className="px-4 pb-6 pt-5 sm:px-6 md:pb-4 md:pt-3">
        <small className="text-xs text-foreground">{ago}</small>
        <div className="absolute right-2 top-2 text-xs text-foreground">
          {createdAtDate} {createdAtTime}
        </div>
        <p className="text-sm text-foreground">{notification.message}</p>
      </div>
    </div>
  );
}
