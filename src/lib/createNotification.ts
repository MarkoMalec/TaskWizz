import { NotificationRequest } from "./types";

export const createNotification = async (notification: NotificationRequest) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...notification,
          read: false,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create notification');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  };

