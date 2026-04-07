import { mapAuthError } from '../utils/errorMapper';
import { supabase } from './supabase';

export const authService = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw mapAuthError(error);
    }
    return data;
  },

  async signUp(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    if (error) {
      throw mapAuthError(error);
    }
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw mapAuthError(error);
    }
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw mapAuthError(error);
    }
    return data.session;
  },
};
