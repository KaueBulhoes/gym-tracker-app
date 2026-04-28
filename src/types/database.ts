export type ProfileRow = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  height_cm: number;
  weight_kg: number;
  weekly_goal: number;
  fitness_goals: string[];
  onboarding_completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PlanRow = {
  id: string;
  user_id: string;
  name: string;
  is_active: boolean;
  finished_at: string | null;
  duration_days: number | null;
  expires_at: string | null;
  expiry_dismissed: boolean;
  created_at: string;
};

export type DayRow = {
  id: string;
  plan_id: string;
  day_name: string;
  description: string | null;
  default_rest: boolean;
  default_rest_seconds: number;
  sort_order: number;
  created_at: string;
};

export type ExerciseRow = {
  id: string;
  day_id: string;
  name: string;
  sets: string;
  reps: string;
  fixed_reps: boolean;
  rest_seconds: number | null;
  notes: string | null;
  conjugated_id: string | null;
  sort_order: number;
  created_at: string;
};

export type RepSchemeRow = {
  id: string;
  exercise_id: string;
  sets: string;
  reps: string;
  sort_order: number;
};

export type SessionRow = {
  id: string;
  user_id: string;
  plan_id: string;
  day_name: string;
  started_at: string;
  finished_at: string;
  duration_seconds: number;
  created_at: string;
};

export type WeightRow = {
  id: string;
  session_id: string;
  exercise_name: string;
  uniform: boolean;
  weights: string[];
  created_at: string;
};

export type FeedbackRow = {
  id: string;
  session_id: string;
  intensity: 'light' | 'moderate' | 'intense';
  difficult_exercises: string[];
  comment: string | null;
  created_at: string;
};
