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
  const fonts: { [key: string]: string } = {
    satoshi: "font-satoshi",
    mono: "font-mono",
    serif: "font-serif",
    dancing: "font-dancing",
    sans: "font-sans",
  };

  useEffect(() => {
    const setupData = async () => {
      const font = await store.getItem<string>("font");
      setFont(font);
      console.log(font, "yo");
    };

    setupData();
  }, []);

  if (!font) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={clsx("flex", fonts[font])}>
      <ReminderNotification />
      <SideBar />
      {children}
    </div>
  );
}
