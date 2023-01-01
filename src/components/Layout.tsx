import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="font-satoshi">
      <div className="p-4">{children}</div>
    </div>
  );
}
