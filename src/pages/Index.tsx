import { useSeoMeta } from '@unhead/react';
import { useState, useEffect, useRef } from 'react';
import { AdventCalendarTile, type TileState } from '@/components/AdventCalendarTile';
import { AdventDayModal, DayContent } from '@/components/AdventDayModal';
import { BadgesView } from '@/components/BadgesView';
import { useToast } from '@/hooks/useToast';
import { useOpenedDays } from '@/hooks/useOpenedDays';
import { useCompletedDays } from '@/hooks/useCompletedDays';
import { useBadges } from '@/hooks/useBadges';
import { Calendar, Trophy, User, Award, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Snowfall } from '@/components/Snowfall';
import { ChristmasLights } from '@/components/ChristmasLights';
import { WinterNightBackground } from '@/components/WinterNightBackground';
import { ChristmasProgressBar } from '@/components/ChristmasProgressBar';
import { SantaWorkshopProgress } from '@/components/SantaWorkshopProgress';
import { AvatarSelector } from '@/components/AvatarSelector';
import { useAvatar } from '@/hooks/useAvatar';
import { Button } from '@/components/ui/button';

interface AdventData {
  days: DayContent[];
}

const Index = () => {
  const [adventData, setAdventData] = useState<AdventData | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayContent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { toast } = useToast();
  const { avatar } = useAvatar();
  const { isDayOpened, markDayAsOpened } = useOpenedDays();
  const { isDayCompleted, completedCount } = useCompletedDays();
  const { totalBadges } = useBadges();
  
  // Force re-render when a day is completed
  const handleDayCompleted = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  // Watch for changes in completed days and badges to force re-render
  const prevCompletedCount = useRef(completedCount);
  const prevBadgeCount = useRef(totalBadges);
  
  useEffect(() => {
    // Only update if counts actually changed (avoid initial render)
    if (prevCompletedCount.current !== completedCount || prevBadgeCount.current !== totalBadges) {
      prevCompletedCount.current = completedCount;
      prevBadgeCount.current = totalBadges;
      setRefreshKey(prev => prev + 1);
    }
  }, [completedCount, totalBadges]);

  useSeoMeta({
    title: 'Christmas Advent Calendar 2025',
    description: 'Discover the history and traditions of Christmas from around the world! A fun 24-day journey for kids leading up to Christmas.',
  });

  // Load advent calendar data
  useEffect(() => {
    fetch('/advent-data.json?v=' + Date.now()) // Cache busting to ensure fresh data
      .then(res => res.json())
      .then(data => setAdventData(data))
      .catch(err => {
        console.error('Failed to load advent data:', err);
        toast({
          title: 'Error',
          description: 'Failed to load advent calendar data',
          variant: 'destructive',
        });
      });
  }, [toast]);

  // Check if a day is unlocked based on current date
  // Day 1 is always unlocked (preview day), days 2-24 use normal unlock logic
  const isDayUnlocked = (dayNumber: number, unlockDate: string): boolean => {
    // Day 1 is always unlocked as a preview
    if (dayNumber === 1) {
      return true;
    }
    
    // Days 2-24: check if today >= unlockDate
    const now = new Date();
    const unlock = new Date(unlockDate);
    // Reset time to compare dates only
    now.setHours(0, 0, 0, 0);
    unlock.setHours(0, 0, 0, 0);
    return now >= unlock;
  };

  // Check if a day is today
  const isToday = (unlockDate: string): boolean => {
    const now = new Date();
    const unlock = new Date(unlockDate);
    now.setHours(0, 0, 0, 0);
    unlock.setHours(0, 0, 0, 0);
    return now.getTime() === unlock.getTime();
  };

  // Calculate tile state
  const getTileState = (dayContent: DayContent): TileState => {
    if (!isDayUnlocked(dayContent.day, dayContent.unlockDate)) {
      return 'locked';
    }
    // If completed, show as opened
    if (isDayCompleted(dayContent.day)) {
      return 'opened';
    }
    if (isToday(dayContent.unlockDate) && !isDayOpened(dayContent.day)) {
      return 'today';
    }
    if (isDayOpened(dayContent.day)) {
      return 'today'; // Available but not completed
    }
    // Past day that hasn't been opened yet - treat as "today" for now
    return 'today';
  };

  const handleTileClick = (dayContent: DayContent) => {
    setSelectedDay(dayContent);
    setIsModalOpen(true);
    // Mark day as opened when modal is opened
    markDayAsOpened(dayContent.day);
  };


  if (!adventData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-300 dark:text-gray-400">Loading advent calendar...</p>
        </div>
      </div>
    );
  }

  // Check if any days are unlocked
  const hasUnlockedDays = adventData.days.some(day => isDayUnlocked(day.day, day.unlockDate));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 relative">
      {/* Winter Night Background Effects */}
      <WinterNightBackground />
      
      {/* Snowfall Effect */}
      <Snowfall hasUnlockedDays={hasUnlockedDays} />
      
      {/* Header */}
      <header className="border-b border-indigo-800/30 dark:border-indigo-700/30 bg-slate-900/60 dark:bg-slate-950/60 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-red-400 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg md:text-2xl font-bold bg-gradient-to-r from-red-400 via-green-400 to-blue-400 bg-clip-text text-transparent truncate">
                  <span className="hidden sm:inline">Christmas Advent Calendar</span>
                  <span className="sm:hidden">Advent Calendar</span>
                </h1>
                <p className="text-xs text-gray-300 dark:text-gray-400 hidden sm:block">December 2025</p>
              </div>
            </div>
            
            {/* Desktop Menu - Only show on large screens (xl and up) */}
            <div className="hidden xl:flex items-center gap-2">
              <Button
                onClick={() => setIsAvatarOpen(true)}
                variant="outline"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                title="Choose your avatar"
                size="sm"
              >
                <span className="text-xl mr-2">{avatar}</span>
                <User className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setIsBadgesOpen(true)}
                variant="outline"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0"
                size="sm"
              >
                <Trophy className="w-4 h-4 mr-2" />
                My Badges ({totalBadges}/24)
              </Button>
              <Link to="/achievements">
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0"
                  size="sm"
                >
                  <Award className="w-4 h-4 mr-2" />
                  My Achievements 🏅
                </Button>
              </Link>
            </div>

            {/* Mobile Menu - Show on all screens below xl (mobile, tablet, small desktop) */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="xl:hidden bg-slate-800/60 border-slate-700 text-white hover:bg-slate-700/60 flex-shrink-0"
                  size="icon"
                >
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[300px] bg-slate-900 border-slate-800">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                  <SheetDescription className="text-gray-400">
                    Navigate to different sections
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-3">
                  <Button
                    onClick={() => {
                      setIsAvatarOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 h-auto py-3"
                  >
                    <span className="text-2xl mr-3">{avatar}</span>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">Choose Avatar</span>
                      <span className="text-xs opacity-80">Pick your holiday helper</span>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setIsBadgesOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full justify-start bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 h-auto py-3"
                  >
                    <Trophy className="w-5 h-5 mr-3" />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">My Badges</span>
                      <span className="text-xs opacity-80">{totalBadges} of 24 earned</span>
                    </div>
                  </Button>
                  
                  <Link to="/achievements" onClick={() => setIsMobileMenuOpen(false)} className="block">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 h-auto py-3"
                    >
                      <Award className="w-5 h-5 mr-3" />
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">My Achievements</span>
                        <span className="text-xs opacity-80">View your progress</span>
                      </div>
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12 space-y-4">
          <ChristmasLights />
          <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-white">
            Discover Christmas Around the World! 🌍
          </h2>
          <p className="text-xl text-gray-200 dark:text-gray-300 max-w-2xl mx-auto">
            Unlock a new story about Christmas history and traditions from different cultures every day leading up to Christmas!
          </p>
          <p className="text-sm text-red-300 dark:text-red-400 flex items-center justify-center gap-2">
            <span className="text-xl">🎄</span>
            Learn, explore, and have fun!
          </p>
        </div>

        {/* Progress Indicator */}
        <ChristmasProgressBar completed={completedCount} total={24} />

        {/* Calendar Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4 max-w-6xl mx-auto" key={refreshKey}>
          {adventData.days.map((day) => (
            <AdventCalendarTile
              key={`${day.day}-${isDayCompleted(day.day)}-${refreshKey}`}
              day={day.day}
              state={getTileState(day)}
              onClick={() => handleTileClick(day)}
            />
          ))}
        </div>

        {/* Santa's Workshop Progress */}
        <div className="mt-12">
          <SantaWorkshopProgress completedDays={completedCount} />
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center space-y-3">
          <div>
            <p className="text-lg md:text-xl font-bold text-white dark:text-white mb-3">
              Merry Christmas Around the World! 🌍
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-sm md:text-base text-gray-300 dark:text-gray-400">
              <span>🇺🇸 Merry Christmas</span>
              <span>🇪🇸 Feliz Navidad</span>
              <span>🇫🇷 Joyeux Noël</span>
              <span>🇩🇪 Frohe Weihnachten</span>
              <span>🇮🇹 Buon Natale</span>
              <span>🇵🇹 Feliz Natal</span>
              <span>🇳🇱 Vrolijk Kerstfeest</span>
              <span>🇷🇺 С Рождеством</span>
              <span>🇯🇵 メリークリスマス</span>
              <span>🇨🇳 圣诞快乐</span>
              <span>🇰🇷 메리 크리스마스</span>
              <span>🇸🇪 God Jul</span>
              <span>🇳🇴 God Jul</span>
              <span>🇩🇰 Glædelig Jul</span>
              <span>🇫🇮 Hyvää Joulua</span>
              <span>🇵🇱 Wesołych Świąt</span>
              <span>🇨🇿 Veselé Vánoce</span>
              <span>🇬🇷 Καλά Χριστούγεννα</span>
              <span>🇹🇷 Mutlu Noeller</span>
              <span>🇮🇸 Gleðileg Jól</span>
              <span>🇭🇺 Boldog Karácsonyt</span>
              <span>🇷🇴 Crăciun Fericit</span>
              <span>🇧🇬 Весела Коледа</span>
            </div>
          </div>
        </div>
      </main>

      {/* Day Content Modal - key forces re-render when completion state changes */}
      <AdventDayModal
        key={`${selectedDay?.day}-${selectedDay ? isDayCompleted(selectedDay.day) : ''}-${refreshKey}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dayContent={selectedDay}
        onDayCompleted={handleDayCompleted}
      />

      {/* Badges View Modal - key forces re-render when badge count changes */}
      <BadgesView
        key={totalBadges}
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
      />

      {/* Avatar Selector Modal */}
      <AvatarSelector
        isOpen={isAvatarOpen}
        onClose={() => setIsAvatarOpen(false)}
      />
    </div>
  );
};

export default Index;
