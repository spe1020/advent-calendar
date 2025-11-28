import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAvatar, type AvatarType, AVAILABLE_AVATARS } from '@/hooks/useAvatar';

interface AvatarSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AvatarSelector({ isOpen, onClose }: AvatarSelectorProps) {
  const { avatar, selectAvatar } = useAvatar();

  const handleSelect = (selectedAvatar: AvatarType) => {
    selectAvatar(selectedAvatar);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
            Pick Your Holiday Helper! 🎄
          </DialogTitle>
          <DialogDescription className="text-base">
            Choose an avatar to represent you on your Christmas adventure!
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 py-4">
          {AVAILABLE_AVATARS.map(({ emoji, name }) => (
            <Button
              key={emoji}
              onClick={() => handleSelect(emoji)}
              variant={avatar === emoji ? 'default' : 'outline'}
              className={`
                h-24 flex flex-col items-center justify-center gap-2
                text-4xl transition-all duration-200
                ${avatar === emoji
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-2 border-green-600 shadow-lg scale-105'
                  : 'hover:scale-105 hover:border-green-400 border-2'
                }
              `}
            >
              <span>{emoji}</span>
              <span className="text-xs font-semibold">{name}</span>
            </Button>
          ))}
        </div>

        <div className="text-center pt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your avatar will appear throughout your Christmas journey! ✨
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

