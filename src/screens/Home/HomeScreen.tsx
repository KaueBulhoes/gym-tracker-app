import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import { colors, spacing, typography } from '../../constants';
import { useAuthStore } from '../../stores/authStore';

const HomeScreen: React.FC = () => {
  const { signOut, isLoading } = useAuthStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello GymTracker</Text>
      <Button
        title="Sair"
        onPress={signOut}
        isLoading={isLoading}
        variant="outline"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.screenHorizontal,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.xxl,
  },
  button: {
    width: '100%',
  },
});

export default HomeScreen;
