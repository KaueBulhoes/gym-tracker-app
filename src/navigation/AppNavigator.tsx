import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import AddWorkoutPlanScreen from '../screens/Workout/AddWorkoutPlanScreen';
import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddWorkoutPlan" component={AddWorkoutPlanScreen} />
    </Stack.Navigator>
);

export default AppNavigator;
