import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import type { RecoverPasswordScreenProps } from '../../../navigation/types';
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
} from './RecoverPasswordScreen.styles';

const RecoverPasswordScreen: React.FC<RecoverPasswordScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { resetPassword, isLoading, error, clearError } = useAuthStore();

    useEffect(() => {
        return () => clearError();
    }, [clearError]);

    const handleSendReset = async () => {
        const cleanEmail = email.trim();
        if (!cleanEmail) {
            return;
        }

        setSuccessMessage(null);
        const success = await resetPassword(cleanEmail);

        if (success) {
            setSuccessMessage(`Se existir uma conta para ${cleanEmail}, enviamos o link de recuperação.`);
        }
    };

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Content
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Header>
                    <Title>Recuperar senha</Title>
                    <Subtitle>Informe seu e-mail para receber o link de redefinição</Subtitle>
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

                    {successMessage && <SuccessText>{successMessage}</SuccessText>}
                    {error && <ErrorText>{error}</ErrorText>}

                    <Button
                        title="Enviar link"
                        onPress={handleSendReset}
                        isLoading={isLoading}
                        disabled={!email.trim()}
                    />

                    <Button
                        title="Voltar para login"
                        onPress={() => navigation.navigate('Login')}
                        variant="outline"
                    />
                </Form>
            </Content>
        </Container>
    );
};

export default RecoverPasswordScreen;
