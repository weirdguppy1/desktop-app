import clsx from "clsx";
import localforage from "localforage";
import React, { useEffect, useState } from "react";
import ReminderNotification from "./ReminderNotification";
import SideBar from "./Sidebar";

const store = localforage.createInstance({
  name: "Settings",
});

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [font, setFont] = useState<string | null>(null);

  useEffect(() => {
    const setupData = async () => {
      const font = await store.getItem<string>("font");
      setFont(font);
    };

    setupData();
  }, []);

  if (!font) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="font-satoshi flex">
      <ReminderNotification />
      <SideBar />
      {children}
    </div>
  );
}
