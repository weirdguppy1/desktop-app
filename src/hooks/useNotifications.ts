import React from "react";

export const useNotifications = () => {
  const notification = (title: string, body: string) => {
    // new Notification({ title: title, body: body }).show();
    Notification.requestPermission().then((result) => {
      new Notification(title, {
        body: body,
      });
    });
  };

  return {
    notification,
  };
};
