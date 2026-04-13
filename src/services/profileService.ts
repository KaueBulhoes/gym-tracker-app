import type { FitnessGoal, UserProfile } from '../types/profile';
import { profileToRow, profileUpdateToRow, rowToProfile } from '../utils/caseMapper';
import { mapDatabaseError } from '../utils/errorMapper';
import { supabase } from './supabase';

type ProfileData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  heightCm: number;
  weightKg: number;
  weeklyGoal: number;
  fitnessGoals: FitnessGoal[];
};

export const profileService = {
  async getProfile(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { return null; }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      throw mapDatabaseError(error);
    }

    return data ? rowToProfile(data) : null;
  },

  async createProfile(profileData: ProfileData): Promise<UserProfile> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw mapDatabaseError({ code: 'PGRST116', message: 'Usuário não autenticado' });
    }

    const row = profileToRow(profileData, user.id);

    const { data, error } = await supabase
      .from('profiles')
      .insert(row)
      .select()
      .single();

    if (error) {
      throw mapDatabaseError(error);
    }

    return rowToProfile(data);
  },

  async updateProfile(profileData: Partial<ProfileData>): Promise<UserProfile> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw mapDatabaseError({ code: 'PGRST116', message: 'Usuário não autenticado' });
    }

    const row = profileUpdateToRow(profileData);

    const { data, error } = await supabase
      .from('profiles')
      .update(row)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      throw mapDatabaseError(error);
    }

    return rowToProfile(data);
  },
};
