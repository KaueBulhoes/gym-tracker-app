import { create } from 'zustand';
import type { FitnessGoal, UserProfile } from '../types/profile';

type ProfileData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  heightCm: number;
  weightKg: number;
  weeklyGoal: number;
  fitnessGoals: FitnessGoal[];
};

interface ProfileState {
  profile: UserProfile | null;
  isOnboardingComplete: boolean;
  saveProfile: (data: ProfileData) => void;
  updateProfile: (data: Partial<ProfileData>) => void;
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

  updateProfile: (data) => {
    set((state) => {
      if (!state.profile) {
        return state;
      }
      return { profile: { ...state.profile, ...data } };
    });
  },
}));
