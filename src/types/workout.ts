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
  exercises: Exercise[];
  defaultRest: boolean;
  defaultRestSeconds: string;
};

export type WorkoutPlan = {
  id: string;
  days: WorkoutDay[];
  createdAt: string;
};
