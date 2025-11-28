import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Sparkles, Flame, Film } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DailyQuiz } from './DailyQuiz';
import { useCompletedDays } from '@/hooks/useCompletedDays';
import { useBadges } from '@/hooks/useBadges';
import { useStreak } from '@/hooks/useStreak';
import { useAvatar } from '@/hooks/useAvatar';
import { useToast } from '@/hooks/useToast';

export interface CultureHighlight {
  country: string;
  tradition: string;
  description: string;
}

export interface MovieOfTheDay {
  title: string;
  year?: number;
  description: string;
}

export interface DayContent {
  day: number;
  unlockDate: string;
  title: string;
  // Learn section - kid-friendly Christmas history (40-60 words)
  learn: string;
  // Culture section - How different cultures celebrate
  culture?: CultureHighlight;
  // Fun fact for kids
  funFact?: string;
  // Family-friendly Christmas movie recommendation
  movie?: MovieOfTheDay;
}

interface AdventDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayContent: DayContent | null;
  onDayCompleted?: () => void;
}

export function AdventDayModal({ isOpen, onClose, dayContent, onDayCompleted }: AdventDayModalProps) {
  const { isDayCompleted, markDayAsCompleted } = useCompletedDays();
  const { hasBadge, earnBadge } = useBadges();
  const { currentStreak, updateStreak } = useStreak();
  const { avatar } = useAvatar();
  const { toast } = useToast();
  
  // Local state to force immediate UI update
  const [localCompleted, setLocalCompleted] = useState(false);
  const [localHasBadge, setLocalHasBadge] = useState(false);

  // Sync with hook state when modal opens or day changes
  useEffect(() => {
    if (dayContent) {
      const completed = isDayCompleted(dayContent.day);
      const hasBadgeForDay = hasBadge(dayContent.day);
      setLocalCompleted(completed);
      setLocalHasBadge(hasBadgeForDay);
    }
  }, [dayContent, isDayCompleted, hasBadge, isOpen]);

  if (!dayContent) return null;

  // Use local state for immediate UI feedback, fallback to hook state
  const isCompleted = localCompleted || isDayCompleted(dayContent.day);
  const hasEarnedBadge = localHasBadge || hasBadge(dayContent.day);

  const handleQuizComplete = () => {
    if (!isCompleted) {
      // Update local state immediately for instant UI feedback
      setLocalCompleted(true);
      setLocalHasBadge(true);
      
      // Update persistent state
      markDayAsCompleted(dayContent.day);
      
      // Update streak
      const streakResult = updateStreak(dayContent.unlockDate);
      
      // Earn badge with emoji based on day
      const badgeEmojis = ['🎄', '🎁', '⭐', '❄️', '🎅', '🦌', '🔔', '🕯️', '🌟', '🎀', '⛄', '🎊', '🎈', '🎪', '🎭', '🎨', '🎯', '🎲', '🎸', '🎺', '🎻', '🥁', '🎤', '🎬'];
      const emoji = badgeEmojis[(dayContent.day - 1) % badgeEmojis.length];
      const badgeTitle = `Day ${dayContent.day} Complete!`;
      
      earnBadge(dayContent.day, badgeTitle, emoji);
      
      // Enhanced toast with streak information
      const streakMessage = streakResult.newStreak > 1
        ? ` You're on a ${streakResult.newStreak}-day streak! 🔥`
        : streakResult.newStreak === 1
        ? ' You started a new streak! 🔥'
        : '';
      
      toast({
        title: '🎉 Congratulations!',
        description: `You earned a badge for completing Day ${dayContent.day}!${streakMessage}`,
      });
      
      // Notify parent component to refresh
      if (onDayCompleted) {
        // Use setTimeout to ensure state updates are flushed
        setTimeout(() => {
          onDayCompleted();
        }, 0);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
            {dayContent.title}
          </DialogTitle>
          <DialogDescription className="text-base flex items-center gap-2 flex-wrap">
            <span>
              Day {dayContent.day} • {new Date(dayContent.unlockDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl">{avatar}</span>
              {currentStreak > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm">
                  <Flame className="w-3 h-3" />
                  Streak: {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
                </span>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 w-full min-w-0">
          {/* Learn Section */}
          <Card className="overflow-hidden w-full border-2 border-red-200 dark:border-red-800">
            <CardHeader className="pb-3 bg-gradient-to-r from-red-50 to-green-50 dark:from-red-950/20 dark:to-green-950/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Learn About Christmas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words min-w-0" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                {dayContent.learn}
              </p>
            </CardContent>
          </Card>

          {/* Culture Section */}
          {dayContent.culture && (
            <Card className="overflow-hidden w-full border-2 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Christmas Around the World</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌍</span>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {dayContent.culture.country}
                    </h3>
                  </div>
                  <div className="pl-7 space-y-2">
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {dayContent.culture.tradition}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {dayContent.culture.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fun Fact Section */}
          {dayContent.funFact && (
            <Card className="overflow-hidden w-full border-2 border-yellow-200 dark:border-yellow-800">
              <CardHeader className="pb-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <span>Fun Fact!</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {dayContent.funFact}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Movie of the Day Section */}
          {dayContent.movie && (
            <Card className="overflow-hidden w-full border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Film className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span>🎬 Movie of the Day</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎥</span>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {dayContent.movie.title}
                      {dayContent.movie.year && (
                        <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
                          ({dayContent.movie.year})
                        </span>
                      )}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pl-7">
                    {dayContent.movie.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Daily Quiz/Interaction - Only show if not completed */}
          {!isCompleted && (
            <DailyQuiz dayContent={dayContent} onComplete={handleQuizComplete} />
          )}

          {/* Completion Badge Display */}
          {isCompleted && (
            <Card className="overflow-hidden w-full border-2 border-green-300 dark:border-green-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
              <CardContent className="pt-6 pb-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-6xl">{avatar}</span>
                  <div className="text-6xl animate-bounce">
                    {hasEarnedBadge ? '🏆' : '✅'}
                  </div>
                </div>
                <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                  Day {dayContent.day} Completed!
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Great job learning about Christmas, {avatar}! 🎉
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
