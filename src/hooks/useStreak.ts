import { differenceInDays } from "date-fns";
import useFolder from "./useFolder";

// created faster algorithms for streaks!!

const useStreak = () => {
  const { getJournalEntries } = useFolder();

  const getCurrentStreak = () => {
    const dates: Date[] = getJournalEntries().map((a) => a.startDatetime);
    const sorted = dates
      .sort(function (a, b) {
        return a.getTime() - b.getTime();
      })
      .reverse();

    let streak = 0;

    for (let i = 1; i < sorted.length; i++) {
      if (Math.abs(differenceInDays(sorted[i], sorted[i - 1])) === 1) {
        streak++;
        if (i == 1) streak++;
      }
      return streak;
    }

    if (sorted.length == 1) return 1;
    return streak;
  };

  return {
    getCurrentStreak,
  };
};

export default useStreak;
