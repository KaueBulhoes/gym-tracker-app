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

    // 0. Deactivate current active plan
    await supabase
      .from('workout_plans')
      .update({ is_active: false, finished_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('is_active', true);

    // 1. Insert plan
    const expiresAt = draft.durationDays
      ? new Date(Date.now() + draft.durationDays * 24 * 60 * 60 * 1000).toISOString()
      : null;

    const { data: planRow, error: planError } = await supabase
      .from('workout_plans')
      .insert({
        user_id: userId,
        name: draft.name,
        is_active: true,
        duration_days: draft.durationDays,
        expires_at: expiresAt,
      })
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
      return rowToPlan({
        ...planRow,
        workout_plan_days: dayRows.map((r: Record<string, unknown>) => ({
          ...r,
          workout_plan_exercises: [],
        })),
      });
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

  async setActivePlan(planId: string): Promise<WorkoutPlan[]> {
    const userId = await getUserId();

    // Deactivate all
    const { error: deactivateError } = await supabase
      .from('workout_plans')
      .update({ is_active: false, finished_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('is_active', true);

    if (deactivateError) {
      throw mapDatabaseError(deactivateError);
    }

    // Activate target
    const { error: activateError } = await supabase
      .from('workout_plans')
      .update({ is_active: true, finished_at: null })
      .eq('id', planId);

    if (activateError) {
      throw mapDatabaseError(activateError);
    }

    // Re-fetch all plans
    return this.getPlans();
  },

  async renewPlan(planId: string, days: number): Promise<void> {
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

    const { error } = await supabase
      .from('workout_plans')
      .update({ duration_days: days, expires_at: expiresAt, expiry_dismissed: false })
      .eq('id', planId);

    if (error) {
      throw mapDatabaseError(error);
    }
  },

  async dismissExpiry(planId: string): Promise<void> {
    const { error } = await supabase
      .from('workout_plans')
      .update({ expiry_dismissed: true })
      .eq('id', planId);

    if (error) {
      throw mapDatabaseError(error);
    }
  },

  async updatePlan(planId: string, draft: WorkoutPlan): Promise<WorkoutPlan> {
    await getUserId();

    // 1. Update plan metadata
    const expiresAt = draft.durationDays
      ? new Date(Date.now() + draft.durationDays * 24 * 60 * 60 * 1000).toISOString()
      : null;

    const { error: planError } = await supabase
      .from('workout_plans')
      .update({
        name: draft.name,
        duration_days: draft.durationDays,
        expires_at: expiresAt,
        expiry_dismissed: false,
      })
      .eq('id', planId);

    if (planError) {
      throw mapDatabaseError(planError);
    }

    // 2. Delete old days (cascades to exercises and rep_schemes)
    const { error: deleteError } = await supabase
      .from('workout_plan_days')
      .delete()
      .eq('plan_id', planId);

    if (deleteError) {
      throw mapDatabaseError(deleteError);
    }

    // 3. Re-insert days
    const dayInserts = draft.days.map((day, i) => dayToRow(day, planId, i));

    const { data: dayRows, error: daysError } = await supabase
      .from('workout_plan_days')
      .insert(dayInserts)
      .select();

    if (daysError) {
      throw mapDatabaseError(daysError);
    }

    const dayNameToId = new Map<string, string>();
    for (const row of dayRows) {
      dayNameToId.set(row.day_name, row.id);
    }

    // 4. Re-insert exercises
    const localIdToExercise: { localId: string }[] = [];
    const exerciseInserts: Record<string, unknown>[] = [];

    for (const day of draft.days) {
      const dayId = dayNameToId.get(day.name);
      if (!dayId) { continue; }
      day.exercises.forEach((exercise, i) => {
        localIdToExercise.push({ localId: exercise.id });
        exerciseInserts.push(exerciseToRow(exercise, dayId, i));
      });
    }

    if (exerciseInserts.length > 0) {
      const { data: exerciseRows, error: exError } = await supabase
        .from('workout_plan_exercises')
        .insert(exerciseInserts)
        .select();

      if (exError) {
        throw mapDatabaseError(exError);
      }

      const localIdToUuid = new Map<string, string>();
      for (let i = 0; i < exerciseRows.length; i++) {
        localIdToUuid.set(localIdToExercise[i].localId, exerciseRows[i].id);
      }

      // 5. Update conjugated_id references
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
                  if (updError) { throw mapDatabaseError(updError); }
                })(),
              );
            }
          }
        }
      }
      await Promise.all(conjugatedUpdates);

      // 6. Insert rep schemes
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
        if (schemeError) { throw mapDatabaseError(schemeError); }
      }
    }

    // 7. Re-fetch complete plan
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

  async deletePlan(planId: string): Promise<void> {
    const { error } = await supabase
      .from('workout_plans')
      .delete()
      .eq('id', planId);

    if (error) {
      throw mapDatabaseError(error);
    }
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
