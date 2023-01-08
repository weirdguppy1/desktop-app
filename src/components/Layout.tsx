import React from "react";
import ReminderNotification from "./ReminderNotification";
import SideBar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="font-satoshi flex">
      <ReminderNotification />
      <SideBar />
      {children}
    </div>
  );
}
