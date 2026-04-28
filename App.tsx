import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Appearance, Linking, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { colors } from './src/constants';
import { getTheme } from './src/constants/theme';
import { linking } from './src/navigation/linking';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { authService } from './src/services/authService';
import { useAuthStore } from './src/stores/authStore';
import { useThemeStore } from './src/stores/themeStore';
import RootNavigator from './src/navigation/RootNavigator';

const App: React.FC = () => {
  const [isReady, setIsReady] = React.useState(false);
  const themeMode = useThemeStore(state => state.mode);
  const loadTheme = useThemeStore(state => state.loadTheme);
  const appTheme = React.useMemo(() => getTheme(themeMode), [themeMode]);

  React.useEffect(() => {
    let isMounted = true;

    const processAuthLink = async (url: string) => {
      try {
        const isRecoveryLink = await authService.handleAuthDeepLink(url);
        if (isRecoveryLink) {
          useAuthStore.getState().setRecoveryFlow(true);
        }
      } catch {
        // RootNavigator/store state already handles auth errors elsewhere.
      }
    };

    const bootstrap = async () => {
      await loadTheme();

      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        await processAuthLink(initialUrl);
      }

      if (isMounted) {
        setIsReady(true);
      }
    };

    const subscription = Linking.addEventListener('url', ({ url }) => {
      processAuthLink(url).catch(() => undefined);
    });

    bootstrap().catch(() => {
      if (isMounted) {
        setIsReady(true);
      }
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, [loadTheme]);

  React.useEffect(() => {
    const appearanceApi = Appearance as unknown as {
      setColorScheme?: (scheme: 'light' | 'dark' | null) => void;
    };
    appearanceApi.setColorScheme?.(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider theme={appTheme}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={appTheme.colors.background}
        />
        {isReady ? (
          <NavigationContainer linking={linking}>
            <RootNavigator />
          </NavigationContainer>
        ) : (
          <ActivityIndicator size="large" color={colors.primary} />
        )}
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
