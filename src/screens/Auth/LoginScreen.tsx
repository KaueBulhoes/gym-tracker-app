import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { colors, spacing, typography } from '../../constants';
import type { LoginScreenProps } from '../../navigation/types';
import { useAuthStore } from '../../stores/authStore';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      return;
    }
    signIn(email.trim(), password);
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Content
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Header>
          <Title>Gym Tracker</Title>
          <Subtitle>Acompanhe seus treinos e evolua</Subtitle>
        </Header>

        <Form>
          <Input
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="Sua senha"
            secureTextEntry
            autoCapitalize="none"
          />

          {error && <ErrorText>{error}</ErrorText>}

          <Button
            title="Entrar"
            onPress={handleLogin}
            isLoading={isLoading}
            disabled={!email.trim() || !password.trim()}
          />

          <Button
            title="Criar conta"
            onPress={() => navigation.navigate('Register')}
            variant="outline"
          />
        </Form>
      </Content>
    </Container>
  );
};

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Content = styled.ScrollView`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-vertical: ${spacing.xxxl}px;
`;

const Header = styled.View`
  align-items: center;
  margin-bottom: ${spacing.xxxl}px;
`;

const Title = styled.Text`
  font-size: ${typography.h1.fontSize}px;
  font-weight: ${typography.h1.fontWeight};
  color: ${colors.primary};
  margin-bottom: ${spacing.sm}px;
`;

const Subtitle = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${colors.textSecondary};
`;

const Form = styled.View`
  gap: ${spacing.base}px;
`;

const ErrorText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.error};
  text-align: center;
`;

export default LoginScreen;
