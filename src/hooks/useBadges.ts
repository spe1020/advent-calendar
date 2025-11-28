import { useLocalStorage } from './useLocalStorage';

export interface Badge {
  day: number;
  earnedAt: number; // timestamp
  title: string;
  emoji: string;
}

/**
 * Hook to manage badge system for completed advent days
 */
export function useBadges() {
  const [badges, setBadges] = useLocalStorage<Badge[]>(
    'christmas:advent:badges',
    []
  );

  const earnBadge = (day: number, title: string, emoji: string) => {
    setBadges((prev) => {
      // Don't add duplicate badges
      if (prev.some(b => b.day === day)) {
        return prev;
      }
      return [...prev, {
        day,
        earnedAt: Date.now(),
        title,
        emoji,
      }].sort((a, b) => a.day - b.day);
    });
  };

  const hasBadge = (day: number): boolean => {
    return badges.some(b => b.day === day);
  };

  const getBadge = (day: number): Badge | undefined => {
    return badges.find(b => b.day === day);
  };

  const totalBadges = badges.length;

  return {
    badges,
    earnBadge,
    hasBadge,
    getBadge,
    totalBadges,
  };
}

