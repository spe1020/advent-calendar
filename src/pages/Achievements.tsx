import { useSeoMeta } from '@unhead/react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBadges } from '@/hooks/useBadges';
import { useCompletedDays } from '@/hooks/useCompletedDays';
import { useStreak } from '@/hooks/useStreak';
import { useAvatar } from '@/hooks/useAvatar';
import { Trophy, Flame, Calendar, ArrowLeft, Star } from 'lucide-react';
import { WinterNightBackground } from '@/components/WinterNightBackground';
import { Snowfall } from '@/components/Snowfall';

// Title based on progress
const getProgressTitle = (completedDays: number): { emoji: string; title: string; description: string } => {
  if (completedDays === 0) {
    return { emoji: '🌱', title: 'Christmas Beginner', description: 'Just getting started!' };
  } else if (completedDays <= 5) {
    return { emoji: '❄️', title: 'Snowflake Starter', description: 'You\'re learning the basics!' };
  } else if (completedDays <= 10) {
    return { emoji: '🎄', title: 'Tree Decorator', description: 'You\'re making great progress!' };
  } else if (completedDays <= 15) {
    return { emoji: '🌟', title: 'Star Shiner', description: 'You\'re really shining!' };
  } else if (completedDays <= 20) {
    return { emoji: '🎁', title: 'Gift Wrapper', description: 'You\'re wrapping up your journey!' };
  } else if (completedDays < 24) {
    return { emoji: '🎅', title: 'Santa\'s Helper', description: 'You\'re almost there!' };
  } else {
    return { emoji: '🏆', title: 'Christmas Champion', description: 'You completed everything! Amazing!' };
  }
};

export default function Achievements() {
  const { badges, totalBadges } = useBadges();
  const { completedCount } = useCompletedDays();
  const { currentStreak, longestStreak } = useStreak();
  const { avatar } = useAvatar();

  useSeoMeta({
    title: 'My Achievements - Christmas Advent Calendar',
    description: 'View your Christmas Advent Calendar achievements, badges, and progress!',
  });

  const progressTitle = getProgressTitle(completedCount);
  const percentage = Math.round((completedCount / 24) * 100);

  // Generate all possible badges (1-24)
  const allBadges = useMemo(() => {
    const badgeEmojis = ['🎄', '🎁', '⭐', '❄️', '🎅', '🦌', '🔔', '🕯️', '🌟', '🎀', '⛄', '🎊', '🎈', '🎪', '🎭', '🎨', '🎯', '🎲', '🎸', '🎺', '🎻', '🥁', '🎤', '🎬'];
    
    return Array.from({ length: 24 }, (_, i) => {
      const day = i + 1;
      const badge = badges.find(b => b.day === day);
      const emoji = badgeEmojis[(day - 1) % badgeEmojis.length];
      
      return {
        day,
        emoji,
        earned: !!badge,
        title: badge?.title || `Day ${day} Complete!`,
        ...badge,
      };
    });
  }, [badges]);

  // Get descriptions for key badges
  const getBadgeDescription = (day: number): string | null => {
    if (day === 1) return 'Opened your first door!';
    if (day === 5) return 'Completed 5 days!';
    if (day === 12) return 'Halfway there!';
    if (day === 18) return 'Almost there!';
    if (day === 24) return 'Completed all 24 days!';
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 relative">
      {/* Winter Night Background Effects */}
      <WinterNightBackground />
      
      {/* Snowfall Effect */}
      <Snowfall hasUnlockedDays={true} />

      {/* Header */}
      <header className="border-b border-indigo-800/30 dark:border-indigo-700/30 bg-slate-900/60 dark:bg-slate-950/60 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <Link to="/" className="flex-shrink-0">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Back to Calendar</span>
                <span className="md:hidden">Back</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1 justify-center">
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 flex-shrink-0" />
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent truncate">
                My Achievements
              </h1>
            </div>
            <div className="w-16 md:w-24 flex-shrink-0" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Header Section with Avatar and Title */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <span className="text-6xl">{avatar}</span>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-white mb-2">
                {progressTitle.emoji} {progressTitle.title}
              </h2>
              <p className="text-lg text-gray-300 dark:text-gray-400">
                {progressTitle.description}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {/* Progress Card */}
          <Card className="border-2 border-green-300 dark:border-green-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <p className="text-3xl font-bold text-green-800 dark:text-green-200">
                  {completedCount} / 24
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Days Completed 🎄
                </p>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-3">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {percentage}% Complete
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Current Streak Card */}
          <Card className="border-2 border-orange-300 dark:border-orange-700 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <p className="text-3xl font-bold text-orange-800 dark:text-orange-200">
                  {currentStreak}
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  Days in a Row 🔥
                </p>
                {currentStreak === 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Start your streak today!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Longest Streak Card */}
          <Card className="border-2 border-purple-300 dark:border-purple-700 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Longest Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">
                  {longestStreak}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Best Record ⭐
                </p>
                {longestStreak === 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Complete days to build your streak!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <Card className="border-2 border-yellow-300 dark:border-yellow-700 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Your Badges Collection
            </CardTitle>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
              You've earned {totalBadges} of 24 badges! {totalBadges === 24 && '🎉 Amazing!'}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
              {allBadges.map((badge) => {
                const description = getBadgeDescription(badge.day);
                return (
                  <Card
                    key={badge.day}
                    className={`relative overflow-hidden transition-all duration-300 ${
                      badge.earned
                        ? 'border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 shadow-lg hover:scale-105'
                        : 'border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 opacity-60'
                    }`}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center min-h-[140px]">
                      {badge.earned ? (
                        <>
                          <div className="text-5xl mb-2 animate-bounce">
                            {badge.emoji}
                          </div>
                          <p className="text-xs font-semibold text-center text-gray-900 dark:text-white">
                            Day {badge.day}
                          </p>
                          <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-1">
                            {badge.title}
                          </p>
                          {description && (
                            <p className="text-xs text-center text-yellow-600 dark:text-yellow-400 mt-2 font-medium">
                              {description}
                            </p>
                          )}
                          <div className="absolute top-1 right-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-4xl mb-2 opacity-30">
                            🔒
                          </div>
                          <p className="text-xs font-semibold text-center text-gray-500 dark:text-gray-400">
                            Day {badge.day}
                          </p>
                          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-1">
                            Locked
                          </p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {totalBadges === 24 && (
              <div className="mt-6 p-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg text-center animate-fade-in">
                <p className="text-2xl font-bold text-white mb-2">
                  🎄 Congratulations! 🎄
                </p>
                <p className="text-lg text-white">
                  You've completed the entire Advent Calendar! You're a true Christmas Champion! 🏆
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

