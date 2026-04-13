import { mapAuthError } from '../utils/errorMapper';
import { supabase } from './supabase';

const RESET_PASSWORD_URL = 'gymtracker://reset-password';

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

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: RESET_PASSWORD_URL,
    });
    if (error) {
      throw mapAuthError(error);
    }
  },

  async handleAuthDeepLink(url: string) {
    const parsedUrl = new URL(url);
    const searchParams = parsedUrl.searchParams;
    const hashParams = new URLSearchParams(parsedUrl.hash.replace(/^#/, ''));

    const routeFromHost = parsedUrl.hostname;
    const routeFromPath = parsedUrl.pathname.replace(/^\//, '');
    const isResetPasswordRoute =
      routeFromHost === 'reset-password' || routeFromPath === 'reset-password';

    const accessToken =
      hashParams.get('access_token') ?? searchParams.get('access_token');
    const refreshToken =
      hashParams.get('refresh_token') ?? searchParams.get('refresh_token');
    const type = hashParams.get('type') ?? searchParams.get('type');
    const code = hashParams.get('code') ?? searchParams.get('code');
    const tokenHash =
      hashParams.get('token_hash') ?? searchParams.get('token_hash');

    const isRecoveryType = type === 'recovery';
    const isRecoveryLink = isResetPasswordRoute || isRecoveryType;

    if (!isRecoveryLink) {
      return false;
    }

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        throw mapAuthError(error);
      }
      return true;
    }

    if (tokenHash && isRecoveryType) {
      const { error } = await supabase.auth.verifyOtp({
        type: 'recovery',
        token_hash: tokenHash,
      });

      if (error) {
        throw mapAuthError(error);
      }

      return true;
    }

    if (accessToken && refreshToken) {
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        throw mapAuthError(error);
      }
    }

    return true;
  },

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
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
      throw mapAuthError({
        message: 'session_not_found',
        name: 'AuthError',
        status: 401,
      } as never);
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
