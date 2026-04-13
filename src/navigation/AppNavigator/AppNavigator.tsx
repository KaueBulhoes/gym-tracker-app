import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../constants';
import HomeScreen from '../../screens/Home/HomeScreen';
import OnboardingScreen from '../../screens/Onboarding/OnboardingScreen';
import SettingsScreen from '../../screens/Settings/SettingsScreen';
import ActiveWorkoutScreen from '../../screens/Workout/ActiveWorkoutScreen';
import AddWorkoutExercisesScreen from '../../screens/Workout/AddWorkoutExercisesScreen';
import AddWorkoutPlanScreen from '../../screens/Workout/AddWorkoutPlanScreen';
import WorkoutDayScreen from '../../screens/Workout/WorkoutDayScreen';
import { useProfileStore } from '../../stores/profileStore';
import { useWorkoutStore } from '../../stores/workoutStore';
import type { AppStackParamList } from '../types';
import { LoadingContainer } from './AppNavigator.styles';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
    const isOnboardingComplete = useProfileStore((s) => s.isOnboardingComplete);
    const isProfileLoaded = useProfileStore((s) => s.isProfileLoaded);
    const loadProfile = useProfileStore((s) => s.loadProfile);
    const loadPlans = useWorkoutStore((s) => s.loadPlans);
    const loadSessions = useWorkoutStore((s) => s.loadSessions);

    useEffect(() => {
        loadProfile();
        loadPlans();
        loadSessions();
    }, [loadProfile, loadPlans, loadSessions]);

    if (!isProfileLoaded) {
        return (
            <LoadingContainer>
                <ActivityIndicator size="large" color={colors.primary} />
            </LoadingContainer>
        );
    }

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={isOnboardingComplete ? 'Home' : 'Onboarding'}
        >
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="AddWorkoutPlan" component={AddWorkoutPlanScreen} />
            <Stack.Screen name="AddWorkoutExercises" component={AddWorkoutExercisesScreen} />
            <Stack.Screen name="WorkoutDay" component={WorkoutDayScreen} />
            <Stack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
