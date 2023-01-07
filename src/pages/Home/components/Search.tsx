import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFolder from "../../../hooks/useFolder";
import Card from "./Card";

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  const { searchJournalEntries } = useFolder();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() === "") return;
    const results = searchJournalEntries(searchValue);
    setSearchResults(results);
  };

  return (
    <div className="flex flex-col max-w-2xl">
      <form className="flex flex-col space-y-2">
        <div className="flex space-x-2 items-center">
          <label className="text-xl">Search</label>
          <div className="bg-black p-1.5 rounded-lg">
            <MagnifyingGlassIcon className="h-6 w-6 fill-white" />
          </div>
        </div>
        <div className="flex space-x-3">
          <input
            placeholder="Search for keywords, title, or date (ex. January 01, 2000)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full input"
          />
          <button onClick={handleSearch} className="btn btn-cosmic px-4">
            Search
          </button>
        </div>
      </form>
      <div className="flex flex-col space-y-2 mt-4">
        {searchResults !== null &&
          searchResults.map((result) => {
            
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
