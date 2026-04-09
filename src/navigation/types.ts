import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  AddWorkoutPlan: undefined;
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
