export type FitnessGoal =
  | 'hypertrophy'
  | 'weight_loss'
  | 'maintenance'
  | 'wellness';

export type UserProfile = {
  firstName: string;
  lastName: string;
  birthDate: string;
  heightCm: number;
  weightKg: number;
  weeklyGoal: number;
  fitnessGoals: FitnessGoal[];
  onboardingCompletedAt: string | null;
};
