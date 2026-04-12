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

  async changePassword(currentPassword: string, newPassword: string) {
    const { data: sessionData } = await supabase.auth.getSession();
    const email = sessionData.session?.user?.email;
    if (!email) {
      throw mapAuthError({ message: 'session_not_found', name: 'AuthError', status: 401 } as never);
    }

    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });
    if (verifyError) {
      throw mapAuthError(verifyError);
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      throw mapAuthError(error);
    }
  },
};
