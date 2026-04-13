import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Linking, StatusBar } from 'react-native';
import { colors } from './src/constants';
import { linking } from './src/navigation/linking';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { authService } from './src/services/authService';
import { useAuthStore } from './src/stores/authStore';
import RootNavigator from './src/navigation/RootNavigator';

const App: React.FC = () => {
  const [isReady, setIsReady] = React.useState(false);

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
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F14" />
      {isReady ? (
        <NavigationContainer linking={linking}>
          <RootNavigator />
        </NavigationContainer>
      ) : (
        <ActivityIndicator size="large" color={colors.primary} />
      )}
    </SafeAreaProvider>
  );
};

export default App;
