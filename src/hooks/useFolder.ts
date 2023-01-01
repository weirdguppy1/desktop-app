import fs from "fs";
import path from "path";
import { useId } from "react";
import toast from "react-hot-toast";

const error = (error: string) => `Error! ${error}.`;

export const useFolder = () => {
  const folderExists = () => fs.existsSync("~/Reflectionary");
  const folder = path.join(require("os").homedir(), "Reflectionary");

  const createJournalEntry = (date: Date) => {
    if (!folderExists()) return;

    const id = useId();
    const formattedDate = date.toISOString().slice(0, 10);

    fs.writeFile(`${folder}/${formattedDate}-${id}.json`, "", (err) => {
      if (err) {
        toast.error(error("Cannot create a new file."));
        return console.log(err);
      }
    });
  };

  const updateJournalEntry = (fileName: string, content: string) => {
    if (!folderExists()) return;

    fs.writeFile(`${folder}/${fileName}`, content, (err) => {
      if (err) {
        toast.error(error("Cannot update a file."));
        return console.log(err);
      }
    });
  };

  const getJournalEntry = (fileName: string) => {
    if (!folderExists()) return;

    return fs.readFile(`${folder}/${fileName}`, (err, data) => {
      if (err) {
        toast.error(error("Unable to read file."));
        return data;
      }
    });
  };
  return {
    createJournalEntry,
    updateJournalEntry,
    getJournalEntry,
    folder,
  };
};