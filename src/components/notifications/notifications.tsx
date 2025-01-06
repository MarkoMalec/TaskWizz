import { Notification } from "@prisma/client";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import subDays from "date-fns/subDays";

export function NotificationCard({
  notification,
}: {
  notification: Notification;
}) {
  const createdAtDate = format(new Date(notification.createdAt), "EEEE");
  const createdAtTime = format(new Date(notification.createdAt), "h:mmaaa");
  const ago = formatDistance(subDays(notification.createdAt, 0), new Date(), {
    addSuffix: true,
  });
  return (
    <div className="relative overflow-hidden bg-[#131927] shadow-lg sm:rounded-lg">
      <div className="px-4 pb-6 pt-5 sm:px-6 md:pb-4 md:pt-3">
        <small className="text-xs text-foreground">{ago}</small>
        <div className="absolute top-2 right-2 text-xs text-foreground">
          {createdAtDate} {createdAtTime}
        </div>
        <p className="text-sm text-foreground">{notification.message}</p>
      </div>
    </div>
  );
}
