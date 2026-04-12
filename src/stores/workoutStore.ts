import { create } from 'zustand';
import type { WorkoutDay, WorkoutPlan, WorkoutSession } from '../types/workout';

interface LastCompleted {
  planId: string;
  dayName: string;
}

interface WorkoutState {
  plans: WorkoutPlan[];
  draft: WorkoutPlan | null;
  lastCompleted: LastCompleted | null;
  sessions: WorkoutSession[];
  startDraft: (dayNames: string[]) => void;
  updateDraftDay: (dayName: string, updater: (day: WorkoutDay) => WorkoutDay) => void;
  saveDraft: () => void;
  discardDraft: () => void;
  startLastWorkout: () => void;
  finishWorkout: (session: WorkoutSession) => void;
}

const createEmptyDay = (name: string): WorkoutDay => ({
  name,
  exercises: [],
  defaultRest: false,
  defaultRestSeconds: '',
});

export const useWorkoutStore = create<WorkoutState>((set) => ({
  plans: [],
  draft: null,
  lastCompleted: null,
  sessions: [],

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

  saveDraft: () => {
    set((state) => {
      if (!state.draft) {
        return state;
      }
      return {
        plans: [...state.plans, state.draft],
        draft: null,
      };
    });
  },

  discardDraft: () => {
    set({ draft: null });
  },

  finishWorkout: (session) => {
    set((state) => ({
      sessions: [...state.sessions, session],
      lastCompleted: { planId: session.planId, dayName: session.dayName },
    }));
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
}));
