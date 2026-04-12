import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../../screens/Home/HomeScreen';
import OnboardingScreen from '../../screens/Onboarding/OnboardingScreen';
import ActiveWorkoutScreen from '../../screens/Workout/ActiveWorkoutScreen';
import AddWorkoutExercisesScreen from '../../screens/Workout/AddWorkoutExercisesScreen';
import AddWorkoutPlanScreen from '../../screens/Workout/AddWorkoutPlanScreen';
import WorkoutDayScreen from '../../screens/Workout/WorkoutDayScreen';
import { useProfileStore } from '../../stores/profileStore';
import type { AppStackParamList } from '../types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
    const isOnboardingComplete = useProfileStore((s) => s.isOnboardingComplete);

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={isOnboardingComplete ? 'Home' : 'Onboarding'}
        >
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddWorkoutPlan" component={AddWorkoutPlanScreen} />
            <Stack.Screen name="AddWorkoutExercises" component={AddWorkoutExercisesScreen} />
            <Stack.Screen name="WorkoutDay" component={WorkoutDayScreen} />
            <Stack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
