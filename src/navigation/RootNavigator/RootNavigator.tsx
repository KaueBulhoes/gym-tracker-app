import type { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../constants';
import { supabase } from '../../services/supabase';
import { useAuthStore } from '../../stores/authStore';
import AuthNavigator from '../AuthNavigator';
import AppNavigator from '../AppNavigator';
import { LoadingContainer } from './RootNavigator.styles';

const RootNavigator = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isRecoveryFlow = useAuthStore(state => state.isRecoveryFlow);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
            setSession(currentSession);
            setIsLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
                setSession(newSession);
            },
        );

        return () => subscription.unsubscribe();
    }, []);

    if (isLoading) {
        return (
            <LoadingContainer>
                <ActivityIndicator size="large" color={colors.primary} />
            </LoadingContainer>
        );
    }

    if (isRecoveryFlow) {
        return <AuthNavigator initialRouteName="ResetPassword" />;
    }

    return session ? <AppNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
