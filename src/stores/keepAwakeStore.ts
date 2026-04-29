import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const KEEP_AWAKE_STORAGE_KEY = '@gymtracker:keep-awake';

interface KeepAwakeState {
  enabled: boolean;
  isLoaded: boolean;
  loadKeepAwake: () => Promise<void>;
  setEnabled: (value: boolean) => Promise<void>;
  toggle: () => Promise<void>;
  reset: () => void;
}

const persist = async (enabled: boolean) => {
  await AsyncStorage.setItem(KEEP_AWAKE_STORAGE_KEY, enabled ? '1' : '0');
};

export const useKeepAwakeStore = create<KeepAwakeState>((set, get) => ({
  enabled: false,
  isLoaded: false,

  loadKeepAwake: async () => {
    try {
      const stored = await AsyncStorage.getItem(KEEP_AWAKE_STORAGE_KEY);
      set({ enabled: stored === '1', isLoaded: true });
    } catch {
      set({ isLoaded: true });
    }
  },

  setEnabled: async (value: boolean) => {
    set({ enabled: value });
    try {
      await persist(value);
    } catch {
      // Non-blocking: UI already reflects the change.
    }
  },

  toggle: async () => {
    const next = !get().enabled;
    set({ enabled: next });
    try {
      await persist(next);
    } catch {
      // Non-blocking.
    }
  },

  reset: () => {
    AsyncStorage.removeItem(KEEP_AWAKE_STORAGE_KEY).catch(() => undefined);
    set({ enabled: false, isLoaded: false });
  },
}));
