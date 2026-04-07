import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { colors, spacing, typography } from '../../constants';
import type { RegisterScreenProps } from '../../navigation/types';
import { useAuthStore } from '../../stores/authStore';

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signUp, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const isFormValid =
    name.trim() &&
    email.trim() &&
    password.length >= 6 &&
    password === confirmPassword;

  const handleRegister = () => {
    if (!isFormValid) {
      return;
    }
    signUp(email.trim(), password, name.trim());
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Content
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Header>
          <Title>Criar conta</Title>
          <Subtitle>Comece a registrar seus treinos</Subtitle>
        </Header>

        <Form>
          <Input
            label="Nome"
            value={name}
            onChangeText={setName}
            placeholder="Seu nome"
            autoCapitalize="words"
          />

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
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
            autoCapitalize="none"
          />

          <Input
            label="Confirmar senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Repita a senha"
            secureTextEntry
            autoCapitalize="none"
            error={passwordMismatch ? 'As senhas não coincidem' : undefined}
          />

          {error && <ErrorText>{error}</ErrorText>}

          <Button
            title="Cadastrar"
            onPress={handleRegister}
            isLoading={isLoading}
            disabled={!isFormValid}
          />

          <Button
            title="Já tenho conta"
            onPress={() => navigation.goBack()}
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

export default RegisterScreen;
