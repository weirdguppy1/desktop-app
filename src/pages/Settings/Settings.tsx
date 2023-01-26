import React, { Fragment, useEffect, useState } from "react";
import localforage from "localforage";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const store = localforage.createInstance({
  name: "Settings",
});

export default function Settings() {
  const appearanceSettings = [
    {
      name: "Font",
      selected: "satoshi",
      selections: ["satoshi", "mono", "serif", "dancing", "sans"],
    },
  ];

  const [selectedFont, setSelectedFont] = useState<string>("satoshi");

  const handleFontChange = (value: string) => {
    setSelectedFont(value);
    store.setItem<string>("font", value).then(() => toast.success("Reload the app to see changes!"));
  };

  useEffect(() => {
    const setupData = async () => {
      const font = await store.getItem<string>("font");
      setSelectedFont(font || "satoshi");
    };

    setupData();
  }, []);

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
          <hr className="mb-8 mt-2" />
          <div className="flex flex-col">
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl">Font</h3>
              {/* <select className="bg-gray-800 text-white px-4 py-2 rounded-xl">
                  {appearanceSettings[0].selections.map((option) => (
                    <option>{option}</option>
                  ))}
              </select> */}
              <Listbox value={selectedFont} onChange={handleFontChange}>
                <div className="relative mt-1">
                  <Listbox.Button className="border-2 border-gray-100 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selectedFont}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {appearanceSettings[0].selections.map(
                        (fontName, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={fontName}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {fontName}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        )
                      )}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
