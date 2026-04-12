import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  AddWorkoutPlan: undefined;
  AddWorkoutExercises: { days: string[] };
  WorkoutDay: { day: string };
  ActiveWorkout: { planId: string; dayName: string };
};

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Login'
>;
export type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Register'
>;
export type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'Home'>;
export type AddWorkoutPlanScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'AddWorkoutPlan'
>;
export type AddWorkoutExercisesScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'AddWorkoutExercises'
>;
export type WorkoutDayScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'WorkoutDay'
>;
export type ActiveWorkoutScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'ActiveWorkout'
>;
export type OnboardingScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'Onboarding'
>;
