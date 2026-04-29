import { activateKeepAwake, deactivateKeepAwake } from '@sayem314/react-native-keep-awake';
import { useEffect } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import { useKeepAwakeStore } from '../stores/keepAwakeStore';

export const useKeepAwake = (): void => {
  const enabled = useKeepAwakeStore(state => state.enabled);
  const isLoaded = useKeepAwakeStore(state => state.isLoaded);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const apply = (status: AppStateStatus) => {
      if (enabled && status === 'active') {
        activateKeepAwake();
      } else {
        deactivateKeepAwake();
      }
    };

    apply(AppState.currentState);

    const subscription = AppState.addEventListener('change', apply);

    return () => {
      subscription.remove();
      deactivateKeepAwake();
    };
  }, [enabled, isLoaded]);
};
