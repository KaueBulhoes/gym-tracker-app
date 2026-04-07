import type { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../constants';
import { supabase } from '../services/supabase';
import AuthNavigator from './AuthNavigator';

// MainNavigator será implementado nas próximas fases com as telas do app
const AppPlaceholder = () => (
    <View style={styles.placeholder} />
);

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
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return session ? <AppPlaceholder /> : <AuthNavigator />;
};

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    placeholder: {
        flex: 1,
        backgroundColor: colors.background,
    },
});

export default RootNavigator;
