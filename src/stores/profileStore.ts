import { create } from 'zustand';
import type { FitnessGoal, UserProfile } from '../types/profile';
import { AppError } from '../types/errors';
import { profileService } from '../services/profileService';

export type ProfileData = {
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
  isProfileLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  loadProfile: () => Promise<void>;
  saveProfile: (data: ProfileData) => Promise<boolean>;
  updateProfile: (data: Partial<ProfileData>) => Promise<boolean>;
  clearError: () => void;
  reset: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isOnboardingComplete: false,
  isProfileLoaded: false,
  isLoading: false,
  error: null,

  loadProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const profile = await profileService.getProfile();
      set({
        profile,
        isOnboardingComplete: profile?.onboardingCompletedAt != null,
        isProfileLoaded: true,
        isLoading: false,
      });
    } catch (err) {
      const message = err instanceof AppError ? err.message : 'Erro ao carregar perfil';
      set({ error: message, isProfileLoaded: true, isLoading: false });
    }
  },

  saveProfile: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const profile = await profileService.createProfile(data);
      set({ profile, isOnboardingComplete: true, isLoading: false });
      return true;
    } catch (err) {
      const message = err instanceof AppError ? err.message : 'Erro ao salvar perfil';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const profile = await profileService.updateProfile(data);
      set({ profile, isLoading: false });
      return true;
    } catch (err) {
      const message = err instanceof AppError ? err.message : 'Erro ao atualizar perfil';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),

  reset: () => set({
    profile: null,
    isOnboardingComplete: false,
    isProfileLoaded: false,
    isLoading: false,
    error: null,
  }),
}));
