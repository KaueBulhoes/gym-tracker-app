import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../../screens/Auth/LoginScreen/LoginScreen';
import RecoverPasswordScreen from '../../screens/Auth/RecoverPasswordScreen/RecoverPasswordScreen';
import ResetPasswordScreen from '../../screens/Auth/ResetPasswordScreen/ResetPasswordScreen';
import RegisterScreen from '../../screens/Auth/RegisterScreen/RegisterScreen';
import type { AuthStackParamList } from '../types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface AuthNavigatorProps {
    initialRouteName?: keyof AuthStackParamList;
}

const AuthNavigator: React.FC<AuthNavigatorProps> = ({
    initialRouteName = 'Login',
}) => {
    return (
        <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
