import { create } from 'zustand';
import type { FitnessGoal, UserProfile } from '../types/profile';

interface ProfileState {
  profile: UserProfile | null;
  isOnboardingComplete: boolean;
  saveProfile: (data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    heightCm: number;
    weightKg: number;
    weeklyGoal: number;
    fitnessGoals: FitnessGoal[];
  }) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isOnboardingComplete: false,

  saveProfile: (data) => {
    const profile: UserProfile = {
      ...data,
      onboardingCompletedAt: new Date().toISOString(),
    };
    set({ profile, isOnboardingComplete: true });
  },
}));
