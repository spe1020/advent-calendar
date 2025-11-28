import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { useBadges } from '@/hooks/useBadges';
import { Trophy, Star } from 'lucide-react';
import { useMemo } from 'react';

interface BadgesViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BadgesView({ isOpen, onClose }: BadgesViewProps) {
  const { badges, totalBadges } = useBadges();

  // Generate all possible badges (1-24) - useMemo to recalculate when badges change
  const allBadges = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const day = i + 1;
      const badge = badges.find(b => b.day === day);
      return {
        day,
        earned: !!badge,
        ...badge,
      };
    });
  }, [badges]); // Recalculate when badges array changes

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            My Badges
          </DialogTitle>
          <DialogDescription className="text-base">
            You've earned {totalBadges} of 24 badges! {totalBadges === 24 && '🎉 Amazing! You completed all days!'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          {allBadges.map((badge) => (
            <Card
              key={badge.day}
              className={`relative overflow-hidden transition-all duration-300 ${
                badge.earned
                  ? 'border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 shadow-lg hover:scale-105'
                  : 'border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 opacity-60'
              }`}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center min-h-[120px]">
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
          ))}
        </div>

        {totalBadges === 24 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg text-center">
            <p className="text-lg font-bold text-white">
              🎄 Congratulations! You've completed the entire Advent Calendar! 🎄
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

