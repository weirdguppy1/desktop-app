import React, { useEffect } from "react";
import RichEditor from "./components/RichEditor";
import fs from 'fs'
import path from "path";
import toast from "react-hot-toast";

export default function Home() {
  const todayDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (!fs.existsSync("~/Reflectionary")) {
      const homedir = require("os").homedir();
      fs.mkdir(path.join(homedir, "Reflectionary"), (err) => {
        if (err) {
          console.log(err);
          toast.error(
            "Error creating a folder in your system, we create this folder to store your journal entries locally. In this error continues to happen, email mark.fang.mo@gmail.com"
          );
        } else {
          toast.success("Set up complete!")
        }
      });
    }
  }, []);

  return (
    <div className="flex flex-col px-96">
      <h1>{todayDate}</h1>
      {/* <textarea className="text-xl w-full resize-none focus:outline-none border-2" /> */}
      <RichEditor />
    </div>
  );
}
