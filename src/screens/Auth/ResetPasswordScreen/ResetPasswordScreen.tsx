import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useAuthStore } from '../../../stores/authStore';
import {
    Container,
    Content,
    Header,
    Title,
    Subtitle,
    Form,
    SuccessText,
    ErrorText,
} from './ResetPasswordScreen.styles';

const ResetPasswordScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        updatePassword,
        signOut,
        isLoading,
        error,
        clearError,
        setRecoveryFlow,
    } = useAuthStore();

    useEffect(() => {
        return () => clearError();
    }, [clearError]);

    const passwordMismatch =
        confirmPassword.length > 0 && password !== confirmPassword;
    const isFormValid = password.length >= 6 && password === confirmPassword;

    const handleUpdatePassword = async () => {
        if (!isFormValid) {
            return;
        }

        setSuccessMessage(null);
        const success = await updatePassword(password);

        if (success) {
            setRecoveryFlow(false);
            setSuccessMessage('Senha atualizada com sucesso. Entre novamente com a nova senha.');
        }
    };

    const handleBackToLogin = async () => {
        setRecoveryFlow(false);
        await signOut();
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Content
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Header>
                    <Title>Definir nova senha</Title>
                    <Subtitle>Digite sua nova senha para concluir a recuperação</Subtitle>
                </Header>

                <Form>
                    <Input
                        label="Nova senha"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Mínimo 6 caracteres"
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    <Input
                        label="Confirmar nova senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Repita a nova senha"
                        secureTextEntry
                        autoCapitalize="none"
                        error={passwordMismatch ? 'As senhas não coincidem' : undefined}
                    />

                    {successMessage && <SuccessText>{successMessage}</SuccessText>}
                    {error && <ErrorText>{error}</ErrorText>}

                    <Button
                        title="Atualizar senha"
                        onPress={handleUpdatePassword}
                        isLoading={isLoading}
                        disabled={!isFormValid}
                    />

                    <Button
                        title={successMessage ? 'Ir para login' : 'Cancelar'}
                        onPress={handleBackToLogin}
                        variant="outline"
                    />
                </Form>
            </Content>
        </Container>
    );
};

export default ResetPasswordScreen;
