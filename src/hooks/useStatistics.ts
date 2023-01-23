import { differenceInDays, isSameDay } from "date-fns";
import useFolder from "./useFolder";
import fs from "fs";

// created faster algorithms for streaks!!

const useStatistics = () => {
  const {
    getJournalEntries,
    folderExists,
    folderCheck,
    folder,
    fileEnding,
    fileNameRegex,
  } = useFolder();

  const getCurrentStreak = () => {
    folderCheck();

    const dates: Date[] = getJournalEntries().map((a) => a.startDatetime);
    if (dates.length === 0) return 0;

    const sorted = dates
      .sort(function (a, b) {
        return a.getTime() - b.getTime();
      })
      .reverse();
    console.log(sorted);
    let streak = 1;
    const today = new Date();
    if (Math.abs(differenceInDays(sorted[0], today)) >= 2) return 0;

    for (let i = 0; i < sorted.length - 1; i++) {
      if (Math.abs(differenceInDays(sorted[i], sorted[i + 1])) === 1) {
        streak++;
        continue;
      }
      return streak;
    }
    return streak;
  };

  const getJournalEntryCount = () => {
    folderCheck();

    if (!folderExists()) return;
    const files = fs.readdirSync(folder).filter((item) => {
      const replaced = item.replace(`.${fileEnding}`, "");
      console.log();
      return fileNameRegex.exec(replaced);
    });
    return files.length;
  };

  return {
    getCurrentStreak,
    getJournalEntryCount,
  };
};

export default useStatistics;
