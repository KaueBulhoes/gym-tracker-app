import type { FitnessGoal, UserProfile } from '../types/profile';
import type {
  Exercise,
  ExerciseWeight,
  RepScheme,
  WorkoutDay,
  WorkoutFeedback,
  WorkoutPlan,
  WorkoutSession,
} from '../types/workout';
import type {
  DayRow,
  ExerciseRow,
  FeedbackRow,
  ProfileRow,
  RepSchemeRow,
  SessionRow,
  WeightRow,
} from '../types/database';

// ─── Profile ──────────────────────────────────────────

type ProfileData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  heightCm: number;
  weightKg: number;
  weeklyGoal: number;
  fitnessGoals: FitnessGoal[];
};

// DD/MM/YYYY → YYYY-MM-DD (Supabase expects ISO date)
const brDateToIso = (date: string): string => {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
};

// YYYY-MM-DD → DD/MM/YYYY (app displays BR format)
export const isoDateToBr = (date: string): string => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

// ISO timestamp → DD/MM/YYYY (extracts date from full timestamp)
export const isoTimestampToBr = (timestamp: string): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const profileToRow = (
  data: ProfileData,
  userId: string,
): Omit<ProfileRow, 'id' | 'created_at' | 'updated_at'> => ({
  user_id: userId,
  first_name: data.firstName,
  last_name: data.lastName,
  birth_date: brDateToIso(data.birthDate),
  height_cm: data.heightCm,
  weight_kg: data.weightKg,
  weekly_goal: data.weeklyGoal,
  fitness_goals: data.fitnessGoals,
  onboarding_completed_at: new Date().toISOString(),
});

export const profileUpdateToRow = (
  data: Partial<ProfileData>,
): Record<string, unknown> => {
  const row: Record<string, unknown> = {};
  if (data.firstName !== undefined) { row.first_name = data.firstName; }
  if (data.lastName !== undefined) { row.last_name = data.lastName; }
  if (data.birthDate !== undefined) { row.birth_date = brDateToIso(data.birthDate); }
  if (data.heightCm !== undefined) { row.height_cm = data.heightCm; }
  if (data.weightKg !== undefined) { row.weight_kg = data.weightKg; }
  if (data.weeklyGoal !== undefined) { row.weekly_goal = data.weeklyGoal; }
  if (data.fitnessGoals !== undefined) { row.fitness_goals = data.fitnessGoals; }
  return row;
};

export const rowToProfile = (row: ProfileRow): UserProfile => ({
  firstName: row.first_name,
  lastName: row.last_name,
  birthDate: isoDateToBr(row.birth_date),
  heightCm: row.height_cm,
  weightKg: row.weight_kg,
  weeklyGoal: row.weekly_goal,
  fitnessGoals: row.fitness_goals as FitnessGoal[],
  onboardingCompletedAt: row.onboarding_completed_at,
});

// ─── Workout Plan (read) ──────────────────────────────

type DayRowWithNested = DayRow & {
  workout_plan_exercises: (ExerciseRow & {
    exercise_rep_schemes: RepSchemeRow[];
  })[];
};

const rowToRepScheme = (row: RepSchemeRow): RepScheme => ({
  sets: row.sets,
  reps: row.reps,
});

const rowToExercise = (
  row: ExerciseRow & { exercise_rep_schemes: RepSchemeRow[] },
): Exercise => ({
  id: row.id,
  name: row.name,
  sets: row.sets,
  reps: row.reps,
  fixedReps: row.fixed_reps,
  repSchemes: row.exercise_rep_schemes
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(rowToRepScheme),
  restSeconds: row.rest_seconds != null ? String(row.rest_seconds) : undefined,
  notes: row.notes ?? undefined,
  conjugatedId: row.conjugated_id ?? undefined,
});

const rowToDay = (row: DayRowWithNested): WorkoutDay => ({
  name: row.day_name,
  description: row.description ?? null,
  exercises: row.workout_plan_exercises
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(rowToExercise),
  defaultRest: row.default_rest,
  defaultRestSeconds: String(row.default_rest_seconds),
});

type PlanRowWithNested = {
  id: string;
  user_id: string;
  name: string;
  is_active: boolean;
  finished_at: string | null;
  duration_days: number | null;
  expires_at: string | null;
  expiry_dismissed: boolean;
  created_at: string;
  workout_plan_days: DayRowWithNested[];
};

export const rowToPlan = (row: PlanRowWithNested): WorkoutPlan => ({
  id: row.id,
  name: row.name,
  isActive: row.is_active,
  finishedAt: row.finished_at,
  durationDays: row.duration_days,
  expiresAt: row.expires_at,
  expiryDismissed: row.expiry_dismissed,
  days: row.workout_plan_days
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(rowToDay),
  createdAt: row.created_at,
});

// ─── Workout Plan (write) ─────────────────────────────

export const dayToRow = (
  day: WorkoutDay,
  planId: string,
  sortOrder: number,
): Omit<DayRow, 'id' | 'created_at'> => ({
  plan_id: planId,
  day_name: day.name,
  description: day.description ?? null,
  default_rest: day.defaultRest,
  default_rest_seconds: day.defaultRestSeconds ? Number(day.defaultRestSeconds) : 90,
  sort_order: sortOrder,
});

export const exerciseToRow = (
  exercise: Exercise,
  dayId: string,
  sortOrder: number,
): Omit<ExerciseRow, 'id' | 'created_at' | 'conjugated_id'> => ({
  day_id: dayId,
  name: exercise.name,
  sets: exercise.sets,
  reps: exercise.reps,
  fixed_reps: exercise.fixedReps,
  rest_seconds: exercise.restSeconds ? Number(exercise.restSeconds) : null,
  notes: exercise.notes ?? null,
  sort_order: sortOrder,
});

export const repSchemeToRow = (
  scheme: RepScheme,
  exerciseId: string,
  sortOrder: number,
): Omit<RepSchemeRow, 'id'> => ({
  exercise_id: exerciseId,
  sets: scheme.sets,
  reps: scheme.reps,
  sort_order: sortOrder,
});

// ─── Session ──────────────────────────────────────────

export const sessionToRow = (
  session: WorkoutSession,
  userId: string,
): Omit<SessionRow, 'id' | 'created_at'> => ({
  user_id: userId,
  plan_id: session.planId,
  day_name: session.dayName,
  started_at: session.startedAt,
  finished_at: session.finishedAt,
  duration_seconds: session.durationSeconds,
});

export const weightToRow = (
  weight: ExerciseWeight,
  sessionId: string,
): Omit<WeightRow, 'id' | 'created_at'> => ({
  session_id: sessionId,
  exercise_name: weight.exerciseName,
  uniform: weight.uniform,
  weights: weight.weights,
});

export const feedbackToRow = (
  feedback: WorkoutFeedback,
  sessionId: string,
): Omit<FeedbackRow, 'id' | 'created_at'> => ({
  session_id: sessionId,
  intensity: feedback.intensity,
  difficult_exercises: feedback.difficultExercises,
  comment: feedback.comment,
});

const rowToFeedback = (row: FeedbackRow): WorkoutFeedback => ({
  intensity: row.intensity,
  difficultExercises: row.difficult_exercises ?? [],
  comment: row.comment,
});

export const rowToSession = (
  row: SessionRow & {
    workout_session_weights: WeightRow[];
    workout_session_feedback: FeedbackRow[];
  },
): WorkoutSession => {
  const feedbackRow = row.workout_session_feedback?.[0];
  return {
    id: row.id,
    planId: row.plan_id,
    dayName: row.day_name,
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    durationSeconds: row.duration_seconds,
    exerciseWeights: row.workout_session_weights.map((w) => ({
      exerciseId: w.id,
      exerciseName: w.exercise_name,
      uniform: w.uniform,
      weights: w.weights,
    })),
    feedback: feedbackRow ? rowToFeedback(feedbackRow) : null,
  };
};
