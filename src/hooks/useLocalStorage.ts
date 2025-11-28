import { useState, useEffect } from 'react';

// Custom event name for same-tab localStorage updates
const STORAGE_UPDATE_EVENT = 'localStorageUpdate';

/**
 * Generic hook for managing localStorage state
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  serializer?: {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
  }
) {
  const serialize = serializer?.serialize || JSON.stringify;
  const deserialize = serializer?.deserialize || JSON.parse;

  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? deserialize(item) : defaultValue;
    } catch (error) {
      console.warn(`Failed to load ${key} from localStorage:`, error);
      return defaultValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
      localStorage.setItem(key, serialize(valueToStore));
      
      // Dispatch custom event to notify other components in the same tab
      window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_EVENT, {
        detail: { key, newValue: valueToStore }
      }));
    } catch (error) {
      console.warn(`Failed to save ${key} to localStorage:`, error);
    }
  };

  // Sync with localStorage changes from other tabs AND same tab
  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setState(deserialize(e.newValue));
        } catch (error) {
          console.warn(`Failed to sync ${key} from localStorage:`, error);
        }
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; newValue: T }>;
      if (customEvent.detail?.key === key) {
        try {
          setState(customEvent.detail.newValue);
        } catch (error) {
          console.warn(`Failed to sync ${key} from localStorage:`, error);
        }
      }
    };

    // Listen for cross-tab updates (StorageEvent)
    window.addEventListener('storage', handleStorageEvent);
    // Listen for same-tab updates (CustomEvent)
    window.addEventListener(STORAGE_UPDATE_EVENT, handleCustomEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener(STORAGE_UPDATE_EVENT, handleCustomEvent);
    };
  }, [key, deserialize]);

  return [state, setValue] as const;
}