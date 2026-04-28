import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RecoverPassword: undefined;
  ResetPassword: undefined;
};

export type AppStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Settings: undefined;
  WorkoutPlans: undefined;
  AddWorkoutPlan: undefined;
  AddWorkoutExercises: { days: string[] };
  WorkoutDay: { day: string };
  ActiveWorkout: { planId: string; dayName: string };
  WorkoutFeedback: undefined;
  Statistics: undefined;
  ResetPassword: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Login'
>;
export type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Register'
>;
export type RecoverPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'RecoverPassword'
>;
export type ResetPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'ResetPassword'
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
export type WorkoutFeedbackScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'WorkoutFeedback'
>;
export type OnboardingScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'Onboarding'
>;
export type SettingsScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'Settings'
>;
export type WorkoutPlansScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'WorkoutPlans'
>;
export type StatisticsScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'Statistics'
>;
