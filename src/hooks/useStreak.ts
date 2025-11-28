import { useLocalStorage } from './useLocalStorage';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null; // ISO date string (YYYY-MM-DD)
}

/**
 * Hook to manage daily streak tracking for advent calendar
 * Streak only increases when completing on the correct calendar day
 */
export function useStreak() {
  const [streakData, setStreakData] = useLocalStorage<StreakData>(
    'christmas:advent:streak',
    {
      currentStreak: 0,
      longestStreak: 0,
      lastCompletedDate: null,
    }
  );

  /**
   * Update streak when a day is completed
   * @param unlockDate - The unlock date of the day being completed (YYYY-MM-DD format)
   * @returns The new streak count and whether streak was maintained/extended
   */
  const updateStreak = (unlockDate: string): { newStreak: number; maintained: boolean } => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD

    const completedDate = new Date(unlockDate);
    completedDate.setHours(0, 0, 0, 0);
    const completedDateStr = completedDate.toISOString().split('T')[0];

    // Only count streak if completing on the correct calendar day
    if (completedDateStr !== todayStr) {
      // Completing a past day doesn't affect streak
      return {
        newStreak: streakData.currentStreak,
        maintained: false,
      };
    }

    // Calculate new streak before updating state
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak: number;
    let maintained = false;

    if (streakData.lastCompletedDate === yesterdayStr) {
      // Consecutive day - extend streak
      newStreak = streakData.currentStreak + 1;
      maintained = true;
    } else if (streakData.lastCompletedDate === todayStr) {
      // Already completed today - don't change streak
      newStreak = streakData.currentStreak;
      maintained = true;
    } else {
      // Gap in streak or first completion - reset to 1
      newStreak = 1;
      maintained = false;
    }

    const newLongestStreak = Math.max(streakData.longestStreak, newStreak);

    setStreakData({
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastCompletedDate: todayStr,
    });

    return {
      newStreak,
      maintained,
    };
  };

  return {
    currentStreak: streakData.currentStreak,
    longestStreak: streakData.longestStreak,
    lastCompletedDate: streakData.lastCompletedDate,
    updateStreak,
  };
}

