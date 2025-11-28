import { useLocalStorage } from './useLocalStorage';

/**
 * Hook to track which advent calendar days have been completed
 * (distinct from opened - completion requires passing the quiz/interaction)
 */
export function useCompletedDays() {
  const [completedDays, setCompletedDays] = useLocalStorage<number[]>(
    'christmas:advent:completed-days',
    []
  );

  const markDayAsCompleted = (day: number) => {
    setCompletedDays((prev) => {
      if (!prev.includes(day)) {
        return [...prev, day].sort((a, b) => a - b);
      }
      return prev;
    });
  };

  const isDayCompleted = (day: number): boolean => {
    return completedDays.includes(day);
  };

  const completedCount = completedDays.length;

  return {
    completedDays,
    markDayAsCompleted,
    isDayCompleted,
    completedCount,
  };
}

