import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import { NotificationRequest } from "~/lib/types";

export const useCreateNotification = () => {
  const { doFetch } = useMutatingFetch();

  const createNotification = async ({ notifyWhoId, type, message }: NotificationRequest) => {
    try {
      await doFetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notifyWhoId,
          type,
          message,
          read: false,
        }),
      });

    } catch (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
  };

  return { createNotification };
};