import type { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { authService } from '../services/authService';
import { AppError } from '../types/errors';
import { useProfileStore } from './profileStore';
import { useWorkoutStore } from './workoutStore';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isRecoveryFlow: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<boolean>;
  setSession: (session: Session | null) => void;
  setRecoveryFlow: (isRecoveryFlow: boolean) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  session: null,
  isLoading: false,
  isRecoveryFlow: false,
  error: null,

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { session, user } = await authService.signIn(email, password);
      set({ session, user, isLoading: false });
    } catch (err) {
      const appError =
        err instanceof AppError
          ? err
          : new AppError('UNKNOWN', 'Erro ao fazer login', err);
      set({ error: appError.message, isLoading: false });
    }
  },

  signUp: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const { session, user } = await authService.signUp(email, password, name);
      set({ session, user, isLoading: false });
      return true;
    } catch (err) {
      const appError =
        err instanceof AppError
          ? err
          : new AppError('UNKNOWN', 'Erro ao criar conta', err);
      set({ error: appError.message, isLoading: false });
      return false;
    }
  },

  resetPassword: async email => {
    set({ isLoading: true, error: null });
    try {
      await authService.resetPassword(email);
      set({ isLoading: false });
      return true;
    } catch (err) {
      const appError =
        err instanceof AppError
          ? err
          : new AppError(
              'UNKNOWN',
              'Erro ao solicitar recuperação de senha',
              err,
            );
      set({ error: appError.message, isLoading: false });
      return false;
    }
  },

  updatePassword: async newPassword => {
    set({ isLoading: true, error: null });
    try {
      await authService.updatePassword(newPassword);
      set({ isLoading: false });
      return true;
    } catch (err) {
      const appError =
        err instanceof AppError
          ? err
          : new AppError('UNKNOWN', 'Erro ao redefinir senha', err);
      set({ error: appError.message, isLoading: false });
      return false;
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await authService.signOut();
      useProfileStore.getState().reset();
      useWorkoutStore.getState().reset();
      set({
        user: null,
        session: null,
        isRecoveryFlow: false,
        isLoading: false,
      });
    } catch (err) {
      const appError =
        err instanceof AppError
          ? err
          : new AppError('UNKNOWN', 'Erro ao sair', err);
      set({ error: appError.message, isLoading: false });
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      await authService.changePassword(currentPassword, newPassword);
      set({ isLoading: false });
      return true;
    } catch (err) {
      const appError =
        err instanceof AppError
          ? err
          : new AppError('UNKNOWN', 'Erro ao alterar senha', err);
      set({ error: appError.message, isLoading: false });
      return false;
    }
  },

  setSession: session => {
    set({ session, user: session?.user ?? null });
  },

  setRecoveryFlow: isRecoveryFlow => {
    set({ isRecoveryFlow });
  },

  clearError: () => {
    set({ error: null });
  },
}));
