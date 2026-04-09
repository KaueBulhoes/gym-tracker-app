import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  AddWorkoutPlan: undefined;
  AddWorkoutExercises: { days: string[] };
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
