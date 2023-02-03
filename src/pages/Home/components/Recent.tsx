import { ClockIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import EntryCard from "../../../components/EntryCard";
import useFolder from "../../../hooks/useFolder";
import Search from "./Search";
import chokidar from "chokidar";

export default function Recent() {
  const { getRecentEntries, folder } = useFolder();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    getRecentEntries().then((value) => setHistory(value));

    chokidar.watch(folder).on("unlink", () => {
      getRecentEntries().then((value) => setHistory(value));
    });
  }, []);

  return (
    <div className="flex flex-col max-w-2xl">
      <div className="flex space-x-2 items-center">
        <label className="text-xl">Recents </label>
        <div className="bg-gray-900 p-1.5 rounded-lg">
          <ClockIcon className="h-6 w-6 fill-white" />
        </div>
        <Search />
      </div>

      <div className="flex flex-col space-y-2 mt-4 mb-4">
        <h2 className="text-gray-500">
          Browse your recently opened journal entries.
        </h2>
        {history.map((result, index) => {
          if (index >= 3) return;
          console.log(result.date);
          return (
            <EntryCard
              key={result.id}
              id={result.id}
              fileName={result.fileName}
              title={result.title}
              date={result.readableDate}
            />
          );
        })}
      </div>
    </div>
  );
}
