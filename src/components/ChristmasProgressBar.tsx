import { useMemo } from 'react';
import { useAvatar } from '@/hooks/useAvatar';

interface ChristmasProgressBarProps {
  completed: number;
  total: number;
}

const MILESTONES = [
  { count: 6, message: "🎄 You're a Christmas Explorer! Keep going! 🎄" },
  { count: 12, message: "🌟 Halfway there! You're doing amazing! 🌟" },
  { count: 18, message: "🎁 Almost there! You're a Christmas Champion! 🎁" },
  { count: 24, message: "🏆 Perfect! You completed the entire calendar! 🏆" },
];

export function ChristmasProgressBar({ completed, total }: ChristmasProgressBarProps) {
  const percentage = Math.round((completed / total) * 100);
  const { avatar } = useAvatar();
  
  // Find the highest milestone reached
  const currentMilestone = useMemo(() => {
    return MILESTONES
      .filter(m => completed >= m.count)
      .sort((a, b) => b.count - a.count)[0];
  }, [completed]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 space-y-4">
      {/* Text Summary */}
      <div className="text-center">
        <p className="text-xl md:text-2xl font-bold text-white dark:text-white flex items-center justify-center gap-2">
          <span className="text-3xl">{avatar}</span>
          <span>You've completed <span className="text-green-400">{completed}</span> of <span className="text-yellow-400">{total}</span> days <span className="text-2xl">🎄</span></span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        {/* Background track */}
        <div 
          className="w-full h-8 md:h-10 rounded-full bg-gray-700 dark:bg-gray-800 border-2 border-gray-600 dark:border-gray-700 overflow-hidden shadow-inner"
          role="progressbar"
          aria-valuenow={completed}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`Progress: ${completed} of ${total} days completed`}
        >
          {/* Filled portion with festive gradient */}
          <div 
            className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${percentage}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            
            {/* Percentage text */}
            {completed > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs md:text-sm font-bold text-white drop-shadow-md">
                  {percentage}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Ornament markers at milestones */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {MILESTONES.map((milestone) => {
            const position = (milestone.count / total) * 100;
            const isReached = completed >= milestone.count;
            return (
              <div
                key={milestone.count}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${position}%` }}
              >
                <div
                  className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 transition-all duration-300 ${
                    isReached
                      ? 'bg-yellow-400 border-yellow-300 shadow-lg shadow-yellow-400/50 scale-110'
                      : 'bg-gray-600 border-gray-500 opacity-50'
                  }`}
                  title={`${milestone.count} days milestone`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestone Message */}
      {currentMilestone && (
        <div className="text-center animate-fade-in">
          <p className="text-base md:text-lg font-semibold text-yellow-300 dark:text-yellow-400">
            {currentMilestone.message}
          </p>
        </div>
      )}
    </div>
  );
}

