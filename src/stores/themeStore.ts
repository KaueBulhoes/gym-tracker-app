import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const THEME_STORAGE_KEY = '@gymtracker:theme-mode';

type ThemeMode = 'dark' | 'light';

interface ThemeState {
  mode: ThemeMode;
  isLoaded: boolean;
  loadTheme: () => Promise<void>;
  toggleTheme: () => Promise<void>;
  reset: () => void;
}

const saveTheme = async (mode: ThemeMode) => {
  await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'dark',
  isLoaded: false,

  loadTheme: async () => {
    try {
      const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        set({ mode: stored, isLoaded: true });
        return;
      }
      set({ isLoaded: true });
    } catch {
      set({ isLoaded: true });
    }
  },

  toggleTheme: async () => {
    const current = get().mode;
    const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
    set({ mode: next });
    try {
      await saveTheme(next);
    } catch {
      // Non-blocking: UI already updated.
    }
  },

  reset: () => {
    AsyncStorage.removeItem(THEME_STORAGE_KEY).catch(() => undefined);
    set({ mode: 'dark', isLoaded: false });
  },
}));
