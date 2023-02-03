import { Dialog, Transition } from "@headlessui/react";
import {
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import useFolder from "../hooks/useFolder";

interface EntryProps {
  id: string;
  fileName: string;
  title: string | null;
  date?: string;
}

const EntryCard = ({ id, fileName, title, date }: EntryProps) => {
  const navigate = useNavigate();
  const { deleteJournalEntry } = useFolder();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Card>
        {/* {date && <h1 className="font-semibold mb-3 text-lg">{date}</h1>} */}
        <div className="flex items-start space-x-4">
          <div className="flex flex-col">
            <button
              onClick={openModal}
              className="p-1.5 rounded-lg  hover:bg-gray-700"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate(`/editor/${fileName}`)}
              className="p-1.5 rounded-lg  hover:bg-gray-700"
            >
              <PencilSquareIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl">{title === "" ? "No title." : title}</h1>
            {date && (
              <label className="rounded-full py-0.5 px-4 bg-blue-600 text-xs font-bold">
                {date}
              </label>
            )}
            <label className="rounded-full py-0.5 px-4 bg-gray-600 text-xs">
              {id}
            </label>
          </div>
        </div>
      </Card>
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
            <div className="fixed inset-0 bg-gray-900  bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className=" max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all w-full font-satoshi">
                  <div className="flex justify-end">
                    <button type="button" onClick={closeModal}>
                      <XCircleIcon className="h-8 w-8" />
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-xl">
                      Are you sure you want to delete{" "}
                      <span className="font-bold underline decoration-pink-500">
                        {title ? title : "No Title."}
                      </span>{" "}
                      "
                      <span className="font-bold underline decoration-cyan-500">
                        {fileName}
                      </span>
                      "?
                    </h1>
                    <p className="mt-4 text-sm">
                      Anthing you write in your journal should be considered and
                      not put into the waste bin!{" "}
                      <span className="animate-pulse">❤️</span>
                    </p>
                    <p className="mt-4 text-sm">
                      Notice: You can still retreive this file in your Trash
                      bin, if you regretted the decision.
                    </p>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        deleteJournalEntry(fileName);
                      }}
                      className="btn bg-red-500 text-white mt-10"
                    >
                      Delete anyway.
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EntryCard;
