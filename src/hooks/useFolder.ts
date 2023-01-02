import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

// const error = (error: string) => `Error! ${error}.`;

// TO:DO Use try-catch to catch errors for synchronous functions!!!!

const useFolder = () => {
  const folder = path.join(require("os").homedir(), "Reflectionary");
  const folderExists = () => fs.existsSync(folder);

  const createJournalEntry = (date: Date) => {
    if (!folderExists()) return;

    const id = nanoid();
    const formattedDate = date.toISOString().slice(0, 10);
    const fileName = `${folder}/${formattedDate}_${id}.json`;

    const defaultData = {
      blocks: [],
    };

    fs.writeFileSync(fileName, JSON.stringify(defaultData));
    return `${formattedDate}_${id}.json`;
  };

  const updateJournalEntry = (
    fileName: string | undefined,
    content: string
  ) => {
    if (!folderExists()) return;
    if (fileName === undefined) return;

    console.log(content)

    fs.writeFile(`${folder}/${fileName}`, content, (err) => {

    });
  };

  const getJournalEntry = (fileName: string | undefined) => {
    if (!folderExists()) return;
    if (fileName === undefined) return {};

    const data = fs.readFileSync(`${folder}/${fileName}`, "utf-8");
    console.log(data);
    return JSON.parse(data);
  };
  return {
    createJournalEntry,
    updateJournalEntry,
    getJournalEntry,
    folder,
  };
};

export default useFolder;
