import type { LinkingOptions } from '@react-navigation/native';
import type { AppStackParamList, AuthStackParamList } from './types';

export const APP_SCHEME = 'gymtracker';
export const APP_PREFIX = `${APP_SCHEME}://`;
export const LOGIN_PATH = 'login';
export const LOGIN_URL = `${APP_PREFIX}${LOGIN_PATH}`;
export const RESET_PASSWORD_PATH = 'reset-password';
export const RESET_PASSWORD_URL = `${APP_PREFIX}${RESET_PASSWORD_PATH}`;

type RootLinkingParamList = AuthStackParamList & AppStackParamList;

export const linking: LinkingOptions<RootLinkingParamList> = {
  prefixes: [APP_PREFIX],
  config: {
    screens: {
      Login: 'login',
      Register: 'register',
      RecoverPassword: 'recover-password',
      ResetPassword: RESET_PASSWORD_PATH,
      Onboarding: 'onboarding',
      Home: 'home',
      Settings: 'settings',
      WorkoutPlans: 'workout-plans',
      AddWorkoutPlan: 'add-workout-plan',
      AddWorkoutExercises: 'add-workout-exercises',
      WorkoutDay: 'workout-day',
      ActiveWorkout: 'active-workout',
      Statistics: 'statistics',
    },
  },
};
