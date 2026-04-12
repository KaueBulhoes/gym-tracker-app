import type { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { authService } from '../services/authService';
import { AppError } from '../types/errors';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  setSession: (session: Session | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: false,
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

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await authService.signOut();
      set({ user: null, session: null, isLoading: false });
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

  setSession: (session) => {
    set({ session, user: session?.user ?? null });
  },

  clearError: () => {
    set({ error: null });
  },
}));
