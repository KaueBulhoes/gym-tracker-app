import type { WorkoutPlan, WorkoutSession } from '../types/workout';
import {
  dayToRow,
  exerciseToRow,
  repSchemeToRow,
  rowToPlan,
  rowToSession,
  sessionToRow,
  weightToRow,
} from '../utils/caseMapper';
import { mapDatabaseError } from '../utils/errorMapper';
import { supabase } from './supabase';

const getUserId = async (): Promise<string> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw mapDatabaseError({ code: 'PGRST116', message: 'Usuário não autenticado' });
  }
  return user.id;
};

export const workoutService = {
  async getPlans(): Promise<WorkoutPlan[]> {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from('workout_plans')
      .select(`
        *,
        workout_plan_days (
          *,
          workout_plan_exercises (
            *,
            exercise_rep_schemes (*)
          )
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      throw mapDatabaseError(error);
    }

    return (data ?? []).map(rowToPlan);
  },

  async savePlan(draft: WorkoutPlan): Promise<WorkoutPlan> {
    const userId = await getUserId();

    // 1. Insert plan
    const { data: planRow, error: planError } = await supabase
      .from('workout_plans')
      .insert({ user_id: userId })
      .select()
      .single();

    if (planError) {
      throw mapDatabaseError(planError);
    }

    const planId = planRow.id;

    // 2. Insert days
    const dayInserts = draft.days.map((day, i) => dayToRow(day, planId, i));

    const { data: dayRows, error: daysError } = await supabase
      .from('workout_plan_days')
      .insert(dayInserts)
      .select();

    if (daysError) {
      throw mapDatabaseError(daysError);
    }

    // Map day names to UUIDs
    const dayNameToId = new Map<string, string>();
    for (const row of dayRows) {
      dayNameToId.set(row.day_name, row.id);
    }

    // 3. Insert exercises (without conjugated_id first)
    const localIdToExercise: { localId: string; dayId: string; sortOrder: number }[] = [];
    const exerciseInserts: Record<string, unknown>[] = [];

    for (const day of draft.days) {
      const dayId = dayNameToId.get(day.name);
      if (!dayId) { continue; }

      day.exercises.forEach((exercise, i) => {
        localIdToExercise.push({ localId: exercise.id, dayId, sortOrder: i });
        exerciseInserts.push(exerciseToRow(exercise, dayId, i));
      });
    }

    if (exerciseInserts.length === 0) {
      // Plan with no exercises — return as-is
      return {
        id: planId,
        days: draft.days.map((d) => ({ ...d, exercises: [] })),
        createdAt: planRow.created_at,
      };
    }

    const { data: exerciseRows, error: exError } = await supabase
      .from('workout_plan_exercises')
      .insert(exerciseInserts)
      .select();

    if (exError) {
      throw mapDatabaseError(exError);
    }

    // Build local ID → UUID map
    // exerciseRows come back in insertion order
    const localIdToUuid = new Map<string, string>();
    for (let i = 0; i < exerciseRows.length; i++) {
      localIdToUuid.set(localIdToExercise[i].localId, exerciseRows[i].id);
    }

    // 4. Update conjugated_id references
    const conjugatedUpdates: Promise<void>[] = [];
    for (const day of draft.days) {
      for (const exercise of day.exercises) {
        if (exercise.conjugatedId) {
          const exerciseUuid = localIdToUuid.get(exercise.id);
          const conjugatedUuid = localIdToUuid.get(exercise.conjugatedId);
          if (exerciseUuid && conjugatedUuid) {
            conjugatedUpdates.push(
              (async () => {
                const { error: updError } = await supabase
                  .from('workout_plan_exercises')
                  .update({ conjugated_id: conjugatedUuid })
                  .eq('id', exerciseUuid);
                if (updError) {
                  throw mapDatabaseError(updError);
                }
              })(),
            );
          }
        }
      }
    }
    await Promise.all(conjugatedUpdates);

    // 5. Insert rep schemes
    const schemeInserts: Record<string, unknown>[] = [];
    for (const day of draft.days) {
      for (const exercise of day.exercises) {
        if (!exercise.fixedReps && exercise.repSchemes?.length) {
          const exerciseUuid = localIdToUuid.get(exercise.id);
          if (!exerciseUuid) { continue; }
          exercise.repSchemes.forEach((scheme, i) => {
            schemeInserts.push(repSchemeToRow(scheme, exerciseUuid, i));
          });
        }
      }
    }

    if (schemeInserts.length > 0) {
      const { error: schemeError } = await supabase
        .from('exercise_rep_schemes')
        .insert(schemeInserts);

      if (schemeError) {
        throw mapDatabaseError(schemeError);
      }
    }

    // 6. Re-fetch the complete plan to return consistent data
    const { data: fullPlan, error: fetchError } = await supabase
      .from('workout_plans')
      .select(`
        *,
        workout_plan_days (
          *,
          workout_plan_exercises (
            *,
            exercise_rep_schemes (*)
          )
        )
      `)
      .eq('id', planId)
      .single();

    if (fetchError) {
      throw mapDatabaseError(fetchError);
    }

    return rowToPlan(fullPlan);
  },

  async getSessions(): Promise<WorkoutSession[]> {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from('workout_sessions')
      .select('*, workout_session_weights (*)')
      .eq('user_id', userId)
      .order('finished_at', { ascending: false });

    if (error) {
      throw mapDatabaseError(error);
    }

    return (data ?? []).map(rowToSession);
  },

  async saveSession(session: WorkoutSession): Promise<WorkoutSession> {
    const userId = await getUserId();

    // 1. Insert session
    const { data: sessionRow, error: sessionError } = await supabase
      .from('workout_sessions')
      .insert(sessionToRow(session, userId))
      .select()
      .single();

    if (sessionError) {
      throw mapDatabaseError(sessionError);
    }

    const sessionId = sessionRow.id;

    // 2. Insert weights
    if (session.exerciseWeights.length > 0) {
      const weightInserts = session.exerciseWeights.map((w) => weightToRow(w, sessionId));

      const { error: weightsError } = await supabase
        .from('workout_session_weights')
        .insert(weightInserts);

      if (weightsError) {
        throw mapDatabaseError(weightsError);
      }
    }

    // 3. Re-fetch to return consistent data
    const { data: fullSession, error: fetchError } = await supabase
      .from('workout_sessions')
      .select('*, workout_session_weights (*)')
      .eq('id', sessionId)
      .single();

    if (fetchError) {
      throw mapDatabaseError(fetchError);
    }

    return rowToSession(fullSession);
  },
};
