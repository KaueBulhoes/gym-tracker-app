import type { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { authService } from '../services/authService';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
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
      const message =
        err instanceof Error ? err.message : 'Erro ao fazer login';
      set({ error: message, isLoading: false });
    }
  },

  signUp: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const { session, user } = await authService.signUp(email, password, name);
      set({ session, user, isLoading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao criar conta';
      set({ error: message, isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await authService.signOut();
      set({ user: null, session: null, isLoading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao sair';
      set({ error: message, isLoading: false });
    }
  },

  setSession: (session) => {
    set({ session, user: session?.user ?? null });
  },

  clearError: () => {
    set({ error: null });
  },
}));
