import { create } from 'zustand';
import type { WorkoutDay, WorkoutPlan, WorkoutSession } from '../types/workout';
import { AppError } from '../types/errors';
import { workoutService } from '../services/workoutService';

interface LastCompleted {
  planId: string;
  dayName: string;
}

interface WorkoutState {
  plans: WorkoutPlan[];
  draft: WorkoutPlan | null;
  lastCompleted: LastCompleted | null;
  sessions: WorkoutSession[];
  isLoading: boolean;
  error: string | null;

  // Async (Supabase)
  loadPlans: () => Promise<void>;
  loadSessions: () => Promise<void>;
  saveDraft: () => Promise<boolean>;
  finishWorkout: (session: WorkoutSession) => Promise<boolean>;

  // Sync (local only)
  startDraft: (dayNames: string[]) => void;
  updateDraftDay: (dayName: string, updater: (day: WorkoutDay) => WorkoutDay) => void;
  discardDraft: () => void;
  startLastWorkout: () => void;
  clearError: () => void;
  reset: () => void;
}

const createEmptyDay = (name: string): WorkoutDay => ({
  name,
  exercises: [],
  defaultRest: false,
  defaultRestSeconds: '',
});

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  plans: [],
  draft: null,
  lastCompleted: null,
  sessions: [],
  isLoading: false,
  error: null,

  loadPlans: async () => {
    try {
      set({ isLoading: true, error: null });
      const plans = await workoutService.getPlans();
      set({ plans, isLoading: false });
    } catch (err) {
      const message = err instanceof AppError ? err.message : 'Erro ao carregar planos';
      set({ error: message, isLoading: false });
    }
  },

  loadSessions: async () => {
    try {
      const sessions = await workoutService.getSessions();
      set({ sessions });
    } catch (err) {
      const message = err instanceof AppError ? err.message : 'Erro ao carregar sessões';
      set({ error: message });
    }
  },

  startDraft: (dayNames) => {
    set({
      draft: {
        id: String(Date.now()),
        days: dayNames.map(createEmptyDay),
        createdAt: new Date().toISOString(),
      },
    });
  },

  updateDraftDay: (dayName, updater) => {
    set((state) => {
      if (!state.draft) {
        return state;
      }
      return {
        draft: {
          ...state.draft,
          days: state.draft.days.map((d) => (d.name === dayName ? updater(d) : d)),
        },
      };
    });
  },

  saveDraft: async () => {
    const { draft } = get();
    if (!draft) {
      return false;
    }

    try {
      set({ isLoading: true, error: null });
      const savedPlan = await workoutService.savePlan(draft);
      set((state) => ({
        plans: [...state.plans, savedPlan],
        draft: null,
        isLoading: false,
      }));
      return true;
    } catch (err) {
      const message = err instanceof AppError ? err.message : 'Erro ao salvar plano';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  discardDraft: () => {
    set({ draft: null });
  },

  finishWorkout: async (session) => {
    try {
      set({ isLoading: true, error: null });
      const savedSession = await workoutService.saveSession(session);
      set((state) => ({
        sessions: [savedSession, ...state.sessions],
        lastCompleted: { planId: savedSession.planId, dayName: savedSession.dayName },
        isLoading: false,
      }));
      return true;
    } catch (err) {
      const message = err instanceof AppError ? err.message : 'Erro ao salvar treino';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  startLastWorkout: () => {
    set((state) => {
      const lastPlan = state.plans[state.plans.length - 1];
      if (!lastPlan || lastPlan.days.length === 0) {
        return state;
      }
      const firstDay = lastPlan.days[0];
      return {
        lastCompleted: { planId: lastPlan.id, dayName: firstDay.name },
      };
    });
  },

  clearError: () => set({ error: null }),

  reset: () => set({
    plans: [],
    draft: null,
    lastCompleted: null,
    sessions: [],
    isLoading: false,
    error: null,
  }),
}));
