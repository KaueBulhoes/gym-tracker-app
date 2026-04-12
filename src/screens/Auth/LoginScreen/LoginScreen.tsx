import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import type { LoginScreenProps } from '../../../navigation/types';
import { useAuthStore } from '../../../stores/authStore';
import { Container, Content, Header, Title, Subtitle, Form, ErrorText } from './LoginScreen.styles';

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

export default LoginScreen;
