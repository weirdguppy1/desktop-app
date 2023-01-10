import { ClockIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import useFolder from "../../../hooks/useFolder";

export default function Recent() {
  const { getRecentEntries } = useFolder();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    getRecentEntries().then((value) => setHistory(value));
  }, []);

  return (
    <div className="flex flex-col max-w-2xl">
      <div className="flex space-x-2 items-center">
        <label className="text-xl">Recents </label>
        <div className="bg-black p-1.5 rounded-lg">
          <ClockIcon className="h-6 w-6 fill-white" />
        </div>
      </div>

      <div className="flex flex-col space-y-2 mt-4 mb-4">
        <h2 className="text-gray-500">
          Browse your recently opened journal entries.
        </h2>
        {history.map((result, index) => {
          if (index >= 3) return;

          return (
            <Link key={result.id} to={`/editor/${result.fileName}`}>
              <Card>
                <label className="rounded-full text-md">
                  {result.readableDate}
                </label>
                <h1 className="text-2xl">
                  {result.title === "" ? "No title." : result.title}
                </h1>
                <label className="rounded-full py-0.5 px-4 bg-gray-600 text-xxs">
                  {result.id}
                </label>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
