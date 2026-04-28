import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const STORAGE_KEY = '@gym_tracker/workload_chart';

export type WorkloadChartDays = 30 | 60 | 90;
export const ALL_EXERCISES = '__all__' as const;
export type WorkloadChartExercise = string | typeof ALL_EXERCISES;

interface WorkloadChartPrefsState {
  exercise: WorkloadChartExercise;
  days: WorkloadChartDays;
  loaded: boolean;
  load: () => Promise<void>;
  setExercise: (exercise: WorkloadChartExercise) => void;
  setDays: (days: WorkloadChartDays) => void;
}

const isValidDays = (value: unknown): value is WorkloadChartDays =>
  value === 30 || value === 60 || value === 90;

export const useWorkloadChartPrefs = create<WorkloadChartPrefsState>((set, get) => ({
  exercise: ALL_EXERCISES,
  days: 30,
  loaded: false,

  load: async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      set({ loaded: true });
      return;
    }
    try {
      const parsed = JSON.parse(raw) as Partial<{
        exercise: unknown;
        days: unknown;
      }>;
      const exercise =
        typeof parsed.exercise === 'string' ? parsed.exercise : ALL_EXERCISES;
      const days = isValidDays(parsed.days) ? parsed.days : 30;
      set({ exercise, days, loaded: true });
    } catch {
      set({ loaded: true });
    }
  },

  setExercise: (exercise) => {
    set({ exercise });
    const { days } = get();
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ exercise, days }));
  },

  setDays: (days) => {
    set({ days });
    const { exercise } = get();
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ exercise, days }));
  },
}));
