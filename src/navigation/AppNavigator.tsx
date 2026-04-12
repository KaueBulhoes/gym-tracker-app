import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import ActiveWorkoutScreen from '../screens/Workout/ActiveWorkoutScreen';
import AddWorkoutExercisesScreen from '../screens/Workout/AddWorkoutExercisesScreen';
import AddWorkoutPlanScreen from '../screens/Workout/AddWorkoutPlanScreen';
import WorkoutDayScreen from '../screens/Workout/WorkoutDayScreen';
import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddWorkoutPlan" component={AddWorkoutPlanScreen} />
        <Stack.Screen name="AddWorkoutExercises" component={AddWorkoutExercisesScreen} />
        <Stack.Screen name="WorkoutDay" component={WorkoutDayScreen} />
        <Stack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} />
    </Stack.Navigator>
);

export default AppNavigator;
