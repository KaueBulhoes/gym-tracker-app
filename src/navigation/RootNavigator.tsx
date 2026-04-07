import type { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../constants';
import HomeScreen from '../screens/Home/HomeScreen';
import { supabase } from '../services/supabase';
import AuthNavigator from './AuthNavigator';

const RootNavigator = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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

    return session ? <HomeScreen /> : <AuthNavigator />;
};

const LoadingContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${colors.background};
`;

export default RootNavigator;
