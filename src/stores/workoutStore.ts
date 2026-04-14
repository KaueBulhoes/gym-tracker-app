import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import type {
  ActiveWorkout,
  ExerciseWeight,
  WorkoutDay,
  WorkoutPlan,
  WorkoutSession,
} from '../types/workout';
import { AppError } from '../types/errors';
import { workoutService } from '../services/workoutService';

const ACTIVE_WORKOUT_STORAGE_KEY = '@gymtracker:active-workout';

let activeWorkoutTicker: ReturnType<typeof setInterval> | null = null;

const saveActiveWorkout = async (activeWorkout: ActiveWorkout | null) => {
  if (!activeWorkout) {
    await AsyncStorage.removeItem(ACTIVE_WORKOUT_STORAGE_KEY);
    return;
  }

  await AsyncStorage.setItem(
    ACTIVE_WORKOUT_STORAGE_KEY,
    JSON.stringify(activeWorkout),
  );
};

interface LastCompleted {
  planId: string;
  dayName: string;
}

interface WorkoutState {
  plans: WorkoutPlan[];
  draft: WorkoutPlan | null;
  lastCompleted: LastCompleted | null;
  sessions: WorkoutSession[];
  activeWorkout: ActiveWorkout | null;
  isLoading: boolean;
  error: string | null;

  editingPlanId: string | null;

  // Async (Supabase)
  loadPlans: () => Promise<void>;
  loadSessions: () => Promise<void>;
  saveDraft: () => Promise<boolean>;
  saveEditDraft: () => Promise<boolean>;
  deletePlan: (planId: string) => Promise<void>;
  finishWorkout: (session: WorkoutSession) => Promise<boolean>;
  hydrateActiveWorkout: () => Promise<void>;
  ensureActiveWorkout: (planId: string, dayName: string) => void;
  toggleActiveSet: (
    exerciseId: string,
    setIndex: number,
    totalSets: number,
  ) => boolean;
  toggleActiveExercise: (exerciseId: string, setIndexes: number[]) => void;
  setActiveExerciseWeight: (
    exerciseId: string,
    exerciseName: string,
    uniform: boolean,
    weights: string[],
  ) => void;
  pauseActiveWorkout: () => void;
  resumeActiveWorkout: () => void;
  cancelActiveWorkout: () => void;
  setActivePlan: (planId: string) => Promise<void>;
  renewPlan: (planId: string, days: number) => Promise<void>;
  dismissExpiry: (planId: string) => Promise<void>;

  // Sync (local only)
  startDraft: (
    dayNames: string[],
    name: string,
    durationDays?: number | null,
  ) => void;
  loadDraftFromPlan: (plan: WorkoutPlan) => void;
  updateDraftDuration: (days: number | null) => void;
  updateDraftDay: (
    dayName: string,
    updater: (day: WorkoutDay) => WorkoutDay,
  ) => void;
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

export const useWorkoutStore = create<WorkoutState>((set, get) => {
  const stopTicker = () => {
    if (activeWorkoutTicker) {
      clearInterval(activeWorkoutTicker);
      activeWorkoutTicker = null;
    }
  };

  const startTicker = () => {
    stopTicker();
    activeWorkoutTicker = setInterval(() => {
      const current = get().activeWorkout;
      if (!current || current.isPaused) {
        return;
      }

      const next: ActiveWorkout = {
        ...current,
        elapsedSeconds: current.elapsedSeconds + 1,
      };

      set({ activeWorkout: next });

      if (next.elapsedSeconds % 5 === 0) {
        saveActiveWorkout(next).catch(() => undefined);
      }
    }, 1000);
  };

  return {
    plans: [],
    draft: null,
    editingPlanId: null,
    lastCompleted: null,
    sessions: [],
    activeWorkout: null,
    isLoading: false,
    error: null,

    loadPlans: async () => {
      try {
        set({ isLoading: true, error: null });
        const plans = await workoutService.getPlans();
        set({ plans, isLoading: false });
      } catch (err) {
        const message =
          err instanceof AppError ? err.message : 'Erro ao carregar planos';
        set({ error: message, isLoading: false });
      }
    },

    loadSessions: async () => {
      try {
        const sessions = await workoutService.getSessions();
        set({ sessions });
      } catch (err) {
        const message =
          err instanceof AppError ? err.message : 'Erro ao carregar sessões';
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
        editingPlanId: null,
      });
    },

    loadDraftFromPlan: plan => {
      set({ draft: { ...plan }, editingPlanId: plan.id });
    },

    updateDraftDuration: days => {
      set(state => {
        if (!state.draft) {
          return state;
        }
        return { draft: { ...state.draft, durationDays: days } };
      });
    },

    updateDraftDay: (dayName, updater) => {
      set(state => {
        if (!state.draft) {
          return state;
        }
        return {
          draft: {
            ...state.draft,
            days: state.draft.days.map(d =>
              d.name === dayName ? updater(d) : d,
            ),
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
        set(state => ({
          plans: state.plans
            .map(p =>
              p.isActive
                ? {
                    ...p,
                    isActive: false,
                    finishedAt: new Date().toISOString(),
                  }
                : p,
            )
            .concat(savedPlan),
          draft: null,
          editingPlanId: null,
          isLoading: false,
        }));
        return true;
      } catch (err) {
        const message =
          err instanceof AppError ? err.message : 'Erro ao salvar plano';
        set({ error: message, isLoading: false });
        return false;
      }
    },

    saveEditDraft: async () => {
      const { draft, editingPlanId } = get();
      if (!draft || !editingPlanId) {
        return false;
      }

      try {
        set({ isLoading: true, error: null });
        const updatedPlan = await workoutService.updatePlan(
          editingPlanId,
          draft,
        );
        set(state => ({
          plans: state.plans.map(p =>
            p.id === editingPlanId ? updatedPlan : p,
          ),
          draft: null,
          editingPlanId: null,
          isLoading: false,
        }));
        return true;
      } catch (err) {
        const message =
          err instanceof AppError ? err.message : 'Erro ao atualizar plano';
        set({ error: message, isLoading: false });
        return false;
      }
    },

    deletePlan: async planId => {
      try {
        set({ isLoading: true, error: null });
        await workoutService.deletePlan(planId);
        set(state => ({
          plans: state.plans.filter(p => p.id !== planId),
          isLoading: false,
        }));
      } catch (err) {
        const message =
          err instanceof AppError ? err.message : 'Erro ao excluir plano';
        set({ error: message, isLoading: false });
      }
    },

    discardDraft: () => {
      set({ draft: null, editingPlanId: null });
    },

    finishWorkout: async session => {
      try {
        set({ isLoading: true, error: null });
        const savedSession = await workoutService.saveSession(session);
        stopTicker();
        await saveActiveWorkout(null);
        set(state => ({
          sessions: [savedSession, ...state.sessions],
          lastCompleted: {
            planId: savedSession.planId,
            dayName: savedSession.dayName,
          },
          activeWorkout: null,
          isLoading: false,
        }));
        return true;
      } catch (err) {
        const message =
          err instanceof AppError ? err.message : 'Erro ao salvar treino';
        set({ error: message, isLoading: false });
        return false;
      }
    },

    hydrateActiveWorkout: async () => {
      try {
        const raw = await AsyncStorage.getItem(ACTIVE_WORKOUT_STORAGE_KEY);
        if (!raw) {
          stopTicker();
          set({ activeWorkout: null });
          return;
        }

        const parsed = JSON.parse(raw) as ActiveWorkout;
        set({ activeWorkout: parsed });

        if (!parsed.isPaused) {
          startTicker();
        } else {
          stopTicker();
        }
      } catch {
        stopTicker();
        set({ activeWorkout: null });
      }
    },

    ensureActiveWorkout: (planId, dayName) => {
      const { activeWorkout } = get();
      if (activeWorkout) {
        if (!activeWorkout.isPaused) {
          startTicker();
        } else {
          stopTicker();
        }
        return;
      }

      const created: ActiveWorkout = {
        planId,
        dayName,
        startedAt: new Date().toISOString(),
        elapsedSeconds: 0,
        isPaused: false,
        completedSets: {},
        exerciseWeights: {},
      };

      set({ activeWorkout: created });
      startTicker();
      saveActiveWorkout(created).catch(() => undefined);
    },

    toggleActiveSet: (exerciseId, setIndex, _totalSets) => {
      let completed = false;

      set(state => {
        const current = state.activeWorkout;
        if (!current) {
          return state;
        }

        const doneSets = new Set(current.completedSets[exerciseId] ?? []);
        if (doneSets.has(setIndex)) {
          doneSets.delete(setIndex);
        } else {
          doneSets.add(setIndex);
          completed = true;
        }

        const ordered = Array.from(doneSets).sort((a, b) => a - b);
        const nextCompleted = {
          ...current.completedSets,
          [exerciseId]: ordered,
        };
        const next: ActiveWorkout = {
          ...current,
          completedSets: nextCompleted,
        };

        saveActiveWorkout(next).catch(() => undefined);
        return { activeWorkout: next };
      });

      return completed;
    },

    toggleActiveExercise: (exerciseId, setIndexes) => {
      set(state => {
        const current = state.activeWorkout;
        if (!current) {
          return state;
        }

        const doneSets = current.completedSets[exerciseId] ?? [];
        const allDone = doneSets.length >= setIndexes.length;
        const nextCompleted = {
          ...current.completedSets,
          [exerciseId]: allDone ? [] : [...setIndexes],
        };
        const next: ActiveWorkout = {
          ...current,
          completedSets: nextCompleted,
        };

        saveActiveWorkout(next).catch(() => undefined);
        return { activeWorkout: next };
      });
    },

    setActiveExerciseWeight: (exerciseId, exerciseName, uniform, weights) => {
      set(state => {
        const current = state.activeWorkout;
        if (!current) {
          return state;
        }

        const nextWeights: Record<string, ExerciseWeight> = {
          ...current.exerciseWeights,
          [exerciseId]: {
            exerciseId,
            exerciseName,
            uniform,
            weights,
          },
        };

        const next: ActiveWorkout = {
          ...current,
          exerciseWeights: nextWeights,
        };

        saveActiveWorkout(next).catch(() => undefined);
        return { activeWorkout: next };
      });
    },

    pauseActiveWorkout: () => {
      const { activeWorkout } = get();
      if (!activeWorkout) {
        return;
      }

      const next: ActiveWorkout = { ...activeWorkout, isPaused: true };
      set({ activeWorkout: next });
      stopTicker();
      saveActiveWorkout(next).catch(() => undefined);
    },

    resumeActiveWorkout: () => {
      const { activeWorkout } = get();
      if (!activeWorkout) {
        return;
      }

      const next: ActiveWorkout = { ...activeWorkout, isPaused: false };
      set({ activeWorkout: next });
      startTicker();
      saveActiveWorkout(next).catch(() => undefined);
    },

    cancelActiveWorkout: () => {
      stopTicker();
      set({ activeWorkout: null });
      saveActiveWorkout(null).catch(() => undefined);
    },

    setActivePlan: async planId => {
      try {
        set({ isLoading: true, error: null });
        const plans = await workoutService.setActivePlan(planId);
        set({ plans, isLoading: false });
      } catch (err) {
        const message =
          err instanceof AppError ? err.message : 'Erro ao ativar plano';
        set({ error: message, isLoading: false });
      }
    },

    renewPlan: async (planId, days) => {
      try {
        set({ isLoading: true, error: null });
        await workoutService.renewPlan(planId, days);
        const expiresAt = new Date(
          Date.now() + days * 24 * 60 * 60 * 1000,
        ).toISOString();
        set(state => ({
          plans: state.plans.map(p =>
            p.id === planId
              ? { ...p, durationDays: days, expiresAt, expiryDismissed: false }
              : p,
          ),
          isLoading: false,
        }));
      } catch (err) {
        const message =
          err instanceof AppError ? err.message : 'Erro ao renovar ficha';
        set({ error: message, isLoading: false });
      }
    },

    dismissExpiry: async planId => {
      try {
        await workoutService.dismissExpiry(planId);
        set(state => ({
          plans: state.plans.map(p =>
            p.id === planId ? { ...p, expiryDismissed: true } : p,
          ),
        }));
      } catch (err) {
        const message =
          err instanceof AppError ? err.message : 'Erro ao dispensar aviso';
        set({ error: message });
      }
    },

    startLastWorkout: () => {
      set(state => {
        const activePlan = state.plans.find(p => p.isActive);
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

    reset: () => {
      stopTicker();
      saveActiveWorkout(null).catch(() => undefined);
      set({
        plans: [],
        draft: null,
        editingPlanId: null,
        lastCompleted: null,
        sessions: [],
        activeWorkout: null,
        isLoading: false,
        error: null,
      });
    },
  };
});
