import React, { useEffect } from "react";
import useFolder from "../hooks/useFolder";
import { useNotifications } from "../hooks/useNotifications";

export default function ReminderNotification() {
  const { notification } = useNotifications();
  const { hasWrittenToday } = useFolder();
  const toMilliseconds = (hrs: number, min: number, sec: number) =>
    (hrs * 60 * 60 + min * 60 + sec) * 1000;

  useEffect(() => {
    if (!hasWrittenToday()) {
      notification(
        "Relflectionary: Hey!",
        "Your writing streak will end if you don't write anything today!",
      );
    }

    const interval = setInterval(() => {
      console.log("still in interval");

      if (hasWrittenToday()) {
        clearInterval(interval);
        return;
      }

      notification(
        "Relflectionary: Hey!",
        "Your writing streak will end if you don't write anything today!"
      );
    }, toMilliseconds(1, 0, 0));

    return () => clearInterval(interval);
  }, []);

  return <></>;
}
