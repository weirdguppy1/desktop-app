import fs from "fs";
import path from "path";
import { customAlphabet } from "nanoid";
import { format } from "date-fns";

// const error = (error: string) => `Error! ${error}.`;

// TO:DO Use try-catch to catch errors for synchronous functions!!!!

const useFolder = () => {
  const folder = path.join(require("os").homedir(), "Reflectionary");
  const folderExists = () => fs.existsSync(folder);
  const fileEnding = "txt";

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

    const defaultData = ""

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

    const data = fs.readFileSync(`${folder}/${fileName}`, "utf-8");
    console.log(data);
    return data;
  };

  const getJournalEntries = () => {
    if (!folderExists()) return [];

    const files = fs.readdirSync(folder);
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

    files.forEach((value, index) => {
      const parsed = value.split("_");
      const dateParsed = parsed[0].split("-");
      const doc = new DOMParser().parseFromString(fs.readFileSync(`${folder}/${value}`, "utf-8"), 'text/html')
      const h1s = doc.getElementsByTagName("h1")
    
      const formatted = {
        date: parsed[0],
        startDatetime: new Date(
          Number(dateParsed[0]),
          Number(dateParsed[1]) - 1,
          Number(dateParsed[2])
        ),
        id: parsed[1].replace(`.${fileEnding}`, ""),
        fileName: value,
        readableDate: `${months[Number(dateParsed[1]) - 1]} ${dateParsed[2]}, ${
          dateParsed[0]
        }`,
        title: h1s.length > 0 ? h1s[0].textContent : ""
      };
      res[index] = formatted;
    });
    console.log(res);
    return res;
  };

  return {
    createJournalEntry,
    updateJournalEntry,
    getJournalEntry,
    getJournalEntries,
    folder,
  };
};

export default useFolder;
