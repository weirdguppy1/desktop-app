import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFolder from "../../hooks/useFolder";
import RichEditor from "./components/RichEditor";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import useSettings from "../../hooks/useSettings";
import clsx from "clsx";

export default function Editor() {
  const { fileName } = useParams();
  const { fileExists } = useFolder();
  const exists = fileExists(fileName);
  
  if (fileName === undefined || !exists) {
    return (
      <div className="flex flex-col space-y-4">
        <ExclamationTriangleIcon className="fill-black h-24 w-24" />
        <h1 className="text-2xl">
          Entry not found. Something odd happened or entry was deleted.
        </h1>
      </div>
    );
  }

  return (
    <div className={"flex flex-col items-center w-full mt-8 p-4"}>
      <h1 className="text-4xl font-bold items-center">
        {format(new Date(fileName?.split("_")[0]), "MMMM dd, Y")}
      </h1>
      <label className="text-white bg-black px-4 text-xs mt-2 rounded-full">
        {fileName?.split("_")[1]}
      </label>
      <RichEditor fileName={fileName} />
    </div>
  );
}
