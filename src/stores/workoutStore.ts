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
  setActivePlan: (planId: string) => Promise<void>;
  renewPlan: (planId: string, days: number) => Promise<void>;
  dismissExpiry: (planId: string) => Promise<void>;

  // Sync (local only)
  startDraft: (dayNames: string[], name: string, durationDays?: number | null) => void;
  updateDraftDuration: (days: number | null) => void;
  updateDraftDay: (dayName: string, updater: (day: WorkoutDay) => WorkoutDay) => void;
  discardDraft: () => void;
  startLastWorkout: () => void;
  clearError: () => void;
  reset: () => void;
}

const createEmptyDay = (name: string): WorkoutDay => ({
  name,
  description: null,
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

  startDraft: (dayNames, name, durationDays = null) => {
    set({
      draft: {
        id: String(Date.now()),
        name,
        isActive: true,
        finishedAt: null,
        durationDays: durationDays ?? null,
        expiresAt: null,
        expiryDismissed: false,
        days: dayNames.map(createEmptyDay),
        createdAt: new Date().toISOString(),
      },
    });
  },

  updateDraftDuration: (days) => {
    set((state) => {
      if (!state.draft) { return state; }
      return { draft: { ...state.draft, durationDays: days } };
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
        plans: state.plans.map((p) => (p.isActive ? { ...p, isActive: false, finishedAt: new Date().toISOString() } : p)).concat(savedPlan),
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

  setActivePlan: async (planId) => {
    try {
      set({ isLoading: true, error: null });
      const plans = await workoutService.setActivePlan(planId);
      set({ plans, isLoading: false });
    } catch (err) {
      const message = err instanceof AppError ? err.message : 'Erro ao ativar plano';
      set({ error: message, isLoading: false });
    }
  },

  renewPlan: async (planId, days) => {
    try {
      set({ isLoading: true, error: null });
      await workoutService.renewPlan(planId, days);
      const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      set((state) => ({
        plans: state.plans.map((p) =>
          p.id === planId
            ? { ...p, durationDays: days, expiresAt, expiryDismissed: false }
            : p,
        ),
        isLoading: false,
      }));
    } catch (err) {
      const message = err instanceof AppError ? err.message : 'Erro ao renovar ficha';
      set({ error: message, isLoading: false });
    }
  },

  dismissExpiry: async (planId) => {
    try {
      await workoutService.dismissExpiry(planId);
      set((state) => ({
        plans: state.plans.map((p) =>
          p.id === planId ? { ...p, expiryDismissed: true } : p,
        ),
      }));
    } catch (err) {
      const message = err instanceof AppError ? err.message : 'Erro ao dispensar aviso';
      set({ error: message });
    }
  },

  startLastWorkout: () => {
    set((state) => {
      const activePlan = state.plans.find((p) => p.isActive);
      if (!activePlan || activePlan.days.length === 0) {
        return state;
      }
      const firstDay = activePlan.days[0];
      return {
        lastCompleted: { planId: activePlan.id, dayName: firstDay.name },
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
