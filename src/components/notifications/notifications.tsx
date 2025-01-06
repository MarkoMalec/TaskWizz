import { Notification } from "@prisma/client";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import subDays from "date-fns/subDays";

export function NotificationCard({
  notification,
}: {
  notification: Notification;
}) {
  const createdAtDate = format(new Date(notification.createdAt), "d MMM yyyy");
  const createdAtTime = format(new Date(notification.createdAt), "h:mm a");
  const ago = formatDistance(subDays(notification.createdAt, 0), new Date(), {
    addSuffix: true,
  });
  return (
    <div className="relative overflow-hidden bg-[#131927] shadow-lg sm:rounded-lg">
      <div className="px-4 py-3 sm:px-6">
        <small className="text-xs text-foreground">{ago}</small>
        <div className="absolute right-2 top-2 text-xs text-foreground">
          {createdAtDate} {createdAtTime}
        </div>
        <p className="text-sm text-foreground">{notification.message}</p>
      </div>
    </div>
  );
}
