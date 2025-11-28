import { useLocalStorage } from './useLocalStorage';

export type AvatarType = '🎄' | '🦌' | '⛄' | '🧝' | '🎅' | '🌟';

export const AVAILABLE_AVATARS: { emoji: AvatarType; name: string }[] = [
  { emoji: '🎄', name: 'Christmas Tree' },
  { emoji: '🦌', name: 'Reindeer' },
  { emoji: '⛄', name: 'Snowman' },
  { emoji: '🧝', name: 'Elf' },
  { emoji: '🎅', name: 'Santa' },
  { emoji: '🌟', name: 'Star' },
];

/**
 * Hook to manage user's selected avatar
 */
export function useAvatar() {
  const [avatar, setAvatar] = useLocalStorage<AvatarType>(
    'christmas:advent:avatar',
    '🎄' // Default avatar
  );

  const selectAvatar = (newAvatar: AvatarType) => {
    setAvatar(newAvatar);
  };

  return {
    avatar,
    selectAvatar,
  };
}

