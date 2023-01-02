import React, { useEffect } from "react";
import RichEditor from "./components/RichEditor";
import { useParams } from "react-router-dom";

export default function Editor() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const formattedDate = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
  const { fileName } = useParams();
  console.log(fileName)
  // useEffect(() => {
  //   const homedir = require("os").homedir();

  //   if (!fs.existsSync(path.join(homedir, "Reflectionary"))) {
  //     fs.mkdir(path.join(homedir, "Reflectionary"), (err) => {
  //       if (err) {
  //         console.log(err);
  //         toast.error(
  //           "Error creating a folder in your system, we create this folder to store your journal entries locally. In this error continues to happen, email mark.fang.mo@gmail.com"
  //         );
  //       } else {
  //         toast.success("Set up complete!")
  //       }
  //     });
  //   }
  // }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold items-center">{formattedDate}</h1>
      <label className="text-white bg-black px-4 text-xs mt-2 rounded-full">{fileName?.replace(".json", "").split("_")[1]}</label>
      {/* <button className="">Exit</button> */}
      {/* <textarea className="text-xl w-full resize-none focus:outline-none border-2" /> */}
      <RichEditor fileName={fileName} />
    </div>
  );
}
