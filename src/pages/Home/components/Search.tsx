import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFolder from "../../../hooks/useFolder";
import Card from "../../../components/Card";
import { Dialog, Transition } from "@headlessui/react";

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { searchJournalEntries } = useFolder();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() === "") return;
    const results = searchJournalEntries(searchValue);
    setSearchResults(results);
  };

  return (
    <div className="flex flex-col max-w-2xl">
      <div className="flex items-center justify-center">
        <button type="button" onClick={openModal}>
          <div className="flex items-center p-1.5 btn space-x-2">
            <MagnifyingGlassIcon className="h-6 w-6" />
            <p>Find</p>
          </div>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900  bg-opacity-90" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all w-full font-satoshi">
                  <div className="flex justify-end">
                    <button type="button" onClick={closeModal}>
                      <XCircleIcon className="h-8 w-8" />
                    </button>
                  </div>
                  <form className="flex flex-col space-y-2">
                    <div className="flex space-x-2 items-center">
                      <label className="text-xl">Search</label>
                        <MagnifyingGlassIcon className="h-6 w-6 fill-black" />
                    </div>
                    <div className="flex flex-col space-y-2.5">
                      <input
                        placeholder="Search for keywords, title, or date (ex. January 01, 2000)"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full input text-sm"
                      />
                      <button
                        onClick={handleSearch}
                        className="btn btn-black"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                  <div className="flex flex-col space-y-2 mt-4">
                    {searchResults ? (
                      searchResults.map((result) => {
                        return (
                          <Link
                            key={result.id}
                            to={`/editor/${result.fileName}`}
                          >
                            <Card>
                              <label className="rounded-full text-md">
                                {result.readableDate}
                              </label>
                              <h1 className="text-2xl">
                                {result.title === ""
                                  ? "No title."
                                  : result.title}
                              </h1>
                              <label className="rounded-full py-0.5 px-4 bg-gray-600 text-xxs">
                                {result.id}
                              </label>
                            </Card>
                          </Link>
                        );
                      })
                    ) : (
                      <p className={`text-gray-300`}>No results</p>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
