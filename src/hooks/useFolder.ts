import fs from "fs";
import path from "path";
import { customAlphabet } from "nanoid";
import { format, isSameDay } from "date-fns";
import toast from "react-hot-toast";
import Store from "electron-store";

type StoreType = {
  openHistory: string[];
};

const store = new Store<StoreType>({
  defaults: {
    openHistory: [],
  },
});

// const error = (error: string) => `Error! ${error}.`;

// TO:DO Use try-catch to catch errors for synchronous functions!!!!

const useFolder = () => {
  const folder = path.join(require("os").homedir(), "Reflectionary");
  const folderExists = () => fs.existsSync(folder);
  const fileEnding = "txt";
  const fileNameRegex = /\d\d\d\d-(\d)?\d-\d\d_[a-zA-Z0-9]*/;

  const createJournalEntry = (date: Date) => {
    if (!folderExists()) return;

    const nanoid = customAlphabet(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz",
      8
    );
    const id = nanoid();
    const formattedDate = format(date, "yyyy-M-dd");

    console.log(formattedDate);

    const fileName = `${folder}/${formattedDate}_${id}.${fileEnding}`;

    const defaultData = "";

    fs.writeFileSync(fileName, defaultData);
    return `${formattedDate}_${id}.${fileEnding}`;
  };

  const updateJournalEntry = (
    fileName: string | undefined,
    content: string
  ) => {
    if (!folderExists()) return;
    if (fileName === undefined) return;

    console.log(content);

    fs.writeFile(`${folder}/${fileName}`, content, (err) => {});
  };

  const getJournalEntry = (fileName: string | undefined) => {
    if (!folderExists() && fileName === undefined) return;

    store.set("openHistory", [fileName, ...store.get("openHistory")]);

    const data = fs.readFileSync(`${folder}/${fileName}`, "utf-8");
    return data;
  };

  const getJournalEntries = (entries?: string[]) => {
    if (!folderExists()) return [];

    const files = entries ? entries : fs.readdirSync(folder);
    const res: any[] = [];

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

    files.forEach((fileName, index) => {
      const parsed = fileName.split("_");
      const dateParsed = parsed[0].split("-");
      const content = fs.readFileSync(`${folder}/${fileName}`);
      const doc = new DOMParser().parseFromString(
        fs.readFileSync(`${folder}/${fileName}`, "utf-8"),
        "text/html"
      );
      const h1s = doc.getElementsByTagName("h1");

      const formatted = {
        date: parsed[0],
        startDatetime: new Date(
          Number(dateParsed[0]),
          Number(dateParsed[1]) - 1,
          Number(dateParsed[2])
        ),
        id: parsed[1].replace(`.${fileEnding}`, ""),
        fileName: fileName,
        readableDate: `${months[Number(dateParsed[1]) - 1]} ${dateParsed[2]}, ${
          dateParsed[0]
        }`,
        title: h1s.length > 0 ? h1s[0].textContent : "",
        content: content,
      };
      res[index] = formatted;
    });
    return res;
  };

  const searchJournalEntries = (search: string) => {
    const entries = getJournalEntries();
    const results = entries.filter((entry) =>
      entry.content
        ?.toString()
        .concat(entry.readableDate)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    return results;
  };

  const hasWrittenToday = () => {
    const files = fs.readdirSync(folder);
    files.sort((a, b) => a.localeCompare(b));

    const parsed = files[files.length - 1].split("_");
    const dateParsed = parsed[0].split("-");
    return isSameDay(
      new Date(
        Number(dateParsed[0]),
        Number(dateParsed[1]) - 1,
        Number(dateParsed[2])
      ),
      new Date()
    );
  };

  const getRecentEntries = () => {
    return getJournalEntries(store.get("openHistory"));
  };

  return {
    createJournalEntry,
    updateJournalEntry,
    getJournalEntry,
    getJournalEntries,
    folderExists,
    searchJournalEntries,
    getRecentEntries,
    hasWrittenToday,
    folder,
    fileNameRegex,
    fileEnding,
  };
};

export default useFolder;
