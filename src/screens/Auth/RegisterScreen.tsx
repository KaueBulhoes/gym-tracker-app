import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import type { RegisterScreenProps } from '../../navigation/types';
import { useAuthStore } from '../../stores/authStore';
import { Container, Content, Header, Title, Subtitle, Form, ErrorText } from './RegisterScreen.styles';

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

export default RegisterScreen;
