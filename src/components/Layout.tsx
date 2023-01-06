import React from "react";
import SideBar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="font-satoshi flex">
      <SideBar />
      {children}
    </div>
  );
}
