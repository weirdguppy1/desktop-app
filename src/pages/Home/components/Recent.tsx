import { ClockIcon } from "@heroicons/react/24/solid";
import React from "react";
import useFolder from "../../../hooks/useFolder";

export default function Recent() {
  const { getRecentEntries } = useFolder();
  console.log(getRecentEntries())

  return (
    <div className="flex flex-col max-w-2xl">
      <div className="flex space-x-2 items-center">
        <label className="text-xl">Recents </label>
        <div className="bg-black p-1.5 rounded-lg">
          <ClockIcon className="h-6 w-6 fill-white" />
        </div>
      </div>

      <div className="flex flex-col space-y-2 mt-4">
        <h2 className="text-gray-500">
          Browse your recently opened journal entries.
        </h2>
      </div>
    </div>
  );
}
