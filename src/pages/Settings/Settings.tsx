import React from "react";

export default function Settings() {
  const appearanceSettings = [
    {
      name: "Font",
      selected: "satoshi",
      selections: ["satoshi", "mono", "serif", "dancing"],
    },
  ];

  return (
    <div className="w-full p-10 item flex flex-col items-center">
      <div className="flex flex-col space-y-16">
        <div id="introduction" className="space-y-4 flex flex-col items-center">
          <h1 className="text-6xl font-bold">
            Settings<span className="text-cyan-500">.</span>
          </h1>
          <h2 className="text-xl">Customize your journaling experience.</h2>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Appearance</h2>
        </div>
      </div>
    </div>
  );
}
