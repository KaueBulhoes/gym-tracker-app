export type RepScheme = {
  sets: string;
  reps: string;
};

export type Exercise = {
  id: string;
  name: string;
  sets: string;
  reps: string;
  fixedReps: boolean;
  repSchemes?: RepScheme[];
  restSeconds?: string;
  notes?: string;
  conjugatedId?: string;
};

export type WorkoutDay = {
  name: string;
  description: string | null;
  exercises: Exercise[];
  defaultRest: boolean;
  defaultRestSeconds: string;
};

export type WorkoutPlan = {
  id: string;
  name: string;
  isActive: boolean;
  finishedAt: string | null;
  durationDays: number | null;
  expiresAt: string | null;
  expiryDismissed: boolean;
  days: WorkoutDay[];
  createdAt: string;
};

export type ExerciseWeight = {
  exerciseId: string;
  exerciseName: string;
  uniform: boolean;
  weights: string[];
};

export type WorkoutSession = {
  id: string;
  planId: string;
  dayName: string;
  startedAt: string;
  finishedAt: string;
  durationSeconds: number;
  exerciseWeights: ExerciseWeight[];
};

export type ActiveWorkout = {
  planId: string;
  dayName: string;
  startedAt: string;
  elapsedSeconds: number;
  isPaused: boolean;
  completedSets: Record<string, number[]>;
  exerciseWeights: Record<string, ExerciseWeight>;
};
