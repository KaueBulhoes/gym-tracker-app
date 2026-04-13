import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@gym_tracker/home_stats';

export type HomeStatKey =
  | 'lastWorkout'
  | 'monthlyTotal'
  | 'yearlyTotal'
  | 'totalSessions'
  | 'totalTime'
  | 'streak'
  | 'avgPerWeek'
  | 'avgDuration'
  | 'longestSession'
  | 'shortestSession';

export const STAT_LABELS: Record<HomeStatKey, string> = {
  lastWorkout: 'Último treino',
  monthlyTotal: 'Treinos no mês',
  yearlyTotal: 'Treinos no ano',
  totalSessions: 'Total de treinos',
  totalTime: 'Tempo total',
  streak: 'Sequência atual',
  avgPerWeek: 'Média por semana',
  avgDuration: 'Duração média',
  longestSession: 'Mais longo',
  shortestSession: 'Mais curto',
};

interface HomeStatsState {
  selected: HomeStatKey[];
  loaded: boolean;
  load: () => Promise<void>;
  toggle: (key: HomeStatKey) => void;
}

export const useHomeStats = create<HomeStatsState>((set, get) => ({
  selected: [],
  loaded: false,

  load: async () => {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value) {
      set({ selected: JSON.parse(value), loaded: true });
    } else {
      const defaults: HomeStatKey[] = ['lastWorkout', 'monthlyTotal', 'avgDuration'];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      set({ selected: defaults, loaded: true });
    }
  },

  toggle: (key) => {
    const { selected } = get();
    let next: HomeStatKey[];
    if (selected.includes(key)) {
      next = selected.filter((k) => k !== key);
    } else if (selected.length >= 3) {
      return;
    } else {
      next = [...selected, key];
    }
    set({ selected: next });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  },
}));
