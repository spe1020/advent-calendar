import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WorkshopStage {
  id: number;
  name: string;
  emoji: string;
  description: string;
  minDays: number;
  maxDays: number;
}

const WORKSHOP_STAGES: WorkshopStage[] = [
  {
    id: 0,
    name: 'The Quiet Workshop',
    emoji: '🌙',
    description: 'The workshop is quiet and dark. Santa\'s helpers are getting ready for the big night!',
    minDays: 0,
    maxDays: 1,
  },
  {
    id: 1,
    name: 'Lights Turn On!',
    emoji: '💡',
    description: 'The workshop lights up! The magic of Christmas is beginning to sparkle.',
    minDays: 2,
    maxDays: 5,
  },
  {
    id: 2,
    name: 'The Elves Arrive!',
    emoji: '🧝',
    description: 'Santa\'s helpful elves have arrived! They\'re busy preparing for Christmas.',
    minDays: 6,
    maxDays: 9,
  },
  {
    id: 3,
    name: 'Reindeer Arrive!',
    emoji: '🦌',
    description: 'The reindeer have arrived at the workshop! They\'re getting ready to fly.',
    minDays: 10,
    maxDays: 13,
  },
  {
    id: 4,
    name: 'The Sleigh Appears!',
    emoji: '🛷',
    description: 'Santa\'s magical sleigh is ready! It\'s almost time for the big journey.',
    minDays: 14,
    maxDays: 17,
  },
  {
    id: 5,
    name: 'Gifts Stack Up!',
    emoji: '🎁',
    description: 'The workshop is filling with beautiful gifts! Christmas is getting closer!',
    minDays: 18,
    maxDays: 21,
  },
  {
    id: 6,
    name: 'Santa Gets Ready!',
    emoji: '🎅',
    description: 'Santa is putting on his suit and checking his list! The big night is almost here!',
    minDays: 22,
    maxDays: 23,
  },
  {
    id: 7,
    name: 'Santa Takes Off!',
    emoji: '🚀',
    description: 'Merry Christmas! Santa has taken off on his journey around the world! You completed all 24 days!',
    minDays: 24,
    maxDays: 24,
  },
];

interface SantaWorkshopProgressProps {
  completedDays: number;
}

export function SantaWorkshopProgress({ completedDays }: SantaWorkshopProgressProps) {
  const currentStage = useMemo(() => {
    return WORKSHOP_STAGES.find(
      stage => completedDays >= stage.minDays && completedDays <= stage.maxDays
    ) || WORKSHOP_STAGES[0];
  }, [completedDays]);

  const progressPercentage = Math.min((completedDays / 24) * 100, 100);

  return (
    <Card className="overflow-hidden w-full max-w-4xl mx-auto border-2 border-red-300 dark:border-red-700 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <CardHeader className="pb-3 bg-gradient-to-r from-red-50 to-green-50 dark:from-red-950/20 dark:to-green-950/20">
        <CardTitle className="text-xl md:text-2xl font-bold text-center bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
          🎅 Santa's Workshop 🎅
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-6">
        <div className="text-center space-y-4">
          {/* Main Stage Visual */}
          <div className="relative">
            <div 
              className="text-8xl md:text-9xl mb-4 transition-all duration-500 ease-out animate-fade-in-scale"
              key={currentStage.id}
            >
              {currentStage.emoji}
            </div>
            
            {/* Stage Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-fade-in">
              {currentStage.name}
            </h3>
            
            {/* Stage Description */}
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in">
              {currentStage.description}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Workshop Progress:</span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                {completedDays} / 24 days
              </span>
            </div>
            <div className="w-full max-w-md mx-auto h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 transition-all duration-700 ease-out relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Next Stage Preview (if not at final stage) */}
          {currentStage.id < WORKSHOP_STAGES.length - 1 && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Complete {currentStage.maxDays + 1} days to unlock: <span className="font-semibold text-red-600 dark:text-red-400">{WORKSHOP_STAGES[currentStage.id + 1].name}</span> {WORKSHOP_STAGES[currentStage.id + 1].emoji}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

