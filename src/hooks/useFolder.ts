import fs from "fs";
import path from "path";
import { customAlphabet } from "nanoid";
import { format, isSameDay } from "date-fns";
import localforage from "localforage";
import { toast } from "react-hot-toast";

var store = localforage.createInstance({
  name: "store",
});

// const error = (error: string) => `Error! ${error}.`;

// TO:DO Use try-catch to catch errors for synchronous functions!!!!

const useFolder = () => {
  const folder = path.join(require("os").homedir(), "Reflectionary");
  const folderExists = () => fs.existsSync(folder);

  const fileExists = (fileName: string | undefined) =>
    fs.readdirSync(folder).includes(fileName || "");

  const fileEnding = "txt";
  const fileNameRegex = /\d\d\d\d-(\d)?\d-\d\d_[a-zA-Z0-9]*/;

  const createFolder = () => fs.mkdirSync(folder);

  const folderCheck = () => {
    console.log(fs.existsSync(folder));
    if (!fs.existsSync(folder)) {
      console.log("doesn't exist");
      createFolder();
    }
  };

  const createJournalEntry = (date: Date) => {
    folderCheck();
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
    folderCheck();
    if (fileName === undefined) return;

    fs.writeFileSync(`${folder}/${fileName}`, content);
  };

  const addToHistory = async (fileName: string | undefined) => {
    let history = await store.getItem<string[]>("openHistory");
    if (history) {
      if (history[0] === fileName) return;
      history.length < 10
        ? store.setItem("openHistory", [fileName, ...(history || [])])
        : store.setItem("openHistory", [fileName, history.slice(1)]);
    }
  };

  const getJournalEntry = (fileName: string | undefined) => {
    folderCheck();
    addToHistory(fileName).catch((e) => console.log(e));
    try {
      const data = fs.readFileSync(`${folder}/${fileName}`, "utf-8");
      console.log(data);
      return data;
    } catch {
      toast.error("Error showing journal entry. Could be deleted!");
    }
  };

  const getJournalEntries = (entries?: string[] | null) => {
    folderCheck();

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
    folderCheck();

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
    folderCheck();

    const files = fs.readdirSync(folder);
    if (files.length === 0) return;
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

  const getRecentEntries = async () => {
    folderCheck();

    const RECENT_ENTRIES_NUM = 3;
    const entries = fs.readdirSync(folder);
    const history = (await store.getItem<string[]>("openHistory"))?.filter(
      (entry) => entries.includes(entry)
    );
    return getJournalEntries([...new Set(history)]).slice(
      0,
      RECENT_ENTRIES_NUM
    );
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
    createFolder,
    folderCheck,
    fileExists,
    folder,
    fileNameRegex,
    fileEnding,
  };
};

export default useFolder;
