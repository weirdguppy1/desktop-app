import { differenceInDays, isSameDay } from "date-fns";
import useFolder from "./useFolder";
import path from "path";
import fs from "fs";

// created faster algorithms for streaks!!

const useStatistics = () => {
  const { getJournalEntries, folderExists, folder, fileEnding, fileNameRegex } =
    useFolder();

  const getCurrentStreak = () => {
    const dates: Date[] = getJournalEntries().map((a) => a.startDatetime);
    const sorted = dates
      .sort(function (a, b) {
        return a.getTime() - b.getTime();
      })
      .reverse();
    let streak = 1;

    const today = new Date();
    if (!isSameDay(sorted[0], today)) return 0;
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
    if (!folderExists()) return;
    const files = fs.readdirSync(folder).filter((item) => {
      const replaced = item.replace(`.${fileEnding}`, "")
      console.log()
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
