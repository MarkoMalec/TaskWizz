import { ScrollArea } from "../ui/scroll-area";
import { NotificationCard } from "./notifications";
import { BellRing } from "lucide-react";
import { fetchNotifications } from "~/lib/fetchNotifications";

const UserNotificationsList = async () => {
  const notifications = await fetchNotifications();
  return (
    <>
      <h2 className="mb-2 flex items-center gap-2 text-2xl font-semibold">
        <BellRing />
        Notifications
      </h2>
      <ScrollArea className="h-[822px]">
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default UserNotificationsList;
