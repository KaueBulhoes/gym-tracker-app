import React from 'react';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import { colors, spacing, typography } from '../../constants';
import { useAuthStore } from '../../stores/authStore';

const HomeScreen: React.FC = () => {
  const { signOut, isLoading } = useAuthStore();

  return (
    <Container>
      <Title>Hello GymTracker</Title>
      <Button
        title="Sair"
        onPress={signOut}
        isLoading={isLoading}
        variant="outline"
        style={{ width: '100%' as unknown as number }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  align-items: center;
  justify-content: center;
  padding-horizontal: ${spacing.screenHorizontal}px;
`;

const Title = styled.Text`
  font-size: ${typography.h1.fontSize}px;
  font-weight: ${typography.h1.fontWeight};
  color: ${colors.primary};
  margin-bottom: ${spacing.xxl}px;
`;

export default HomeScreen;
