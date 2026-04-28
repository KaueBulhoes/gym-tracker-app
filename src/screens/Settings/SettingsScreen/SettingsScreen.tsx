import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import Button from '../../../components/Button';
import ChipSelect from '../../../components/ChipSelect';
import Input from '../../../components/Input';
import type { SettingsScreenProps } from '../../../navigation/types';
import { useAuthStore } from '../../../stores/authStore';
import { useProfileStore } from '../../../stores/profileStore';
import type { FitnessGoal } from '../../../types/profile';
import {
  BackButton,
  Body,
  Container,
  Content,
  ErrorText,
  Footer,
  Row,
  TabContent,
  Section,
  SectionLabel,
  SideMenu,
  SideMenuItem,
  SideMenuText,
  SuccessText,
  TopBar,
  TopBarTitle,
} from './SettingsScreen.styles';

type Tab = 'profile' | 'password';

const WEEKLY_GOAL_OPTIONS = [
  { value: '1', label: '1x' },
  { value: '2', label: '2x' },
  { value: '3', label: '3x' },
  { value: '4', label: '4x' },
  { value: '5', label: '5x' },
  { value: '6', label: '6x' },
  { value: '7', label: '7x' },
];

const FITNESS_GOAL_OPTIONS = [
  { value: 'hypertrophy', label: 'Hipertrofia' },
  { value: 'weight_loss', label: 'Emagrecimento' },
  { value: 'maintenance', label: 'Manter peso' },
  { value: 'wellness', label: 'Saúde e bem-estar' },
];

const formatBirthDate = (text: string): string => {
  const digits = text.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  return (
    <Container>
      <TopBar>
        <BackButton
          onPress={() => navigation.goBack()}
          accessibilityLabel="Voltar"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.onSecondary} />
        </BackButton>
        <TopBarTitle>Configurações</TopBarTitle>
      </TopBar>

      <Body>
        <SideMenu>
          <SideMenuItem
            $active={activeTab === 'profile'}
            onPress={() => setActiveTab('profile')}
            accessibilityLabel="Aba Perfil"
          >
            <SideMenuText $active={activeTab === 'profile'}>Perfil</SideMenuText>
          </SideMenuItem>
          <SideMenuItem
            $active={activeTab === 'password'}
            onPress={() => setActiveTab('password')}
            accessibilityLabel="Aba Senha"
          >
            <SideMenuText $active={activeTab === 'password'}>Senha</SideMenuText>
          </SideMenuItem>
        </SideMenu>

        {activeTab === 'profile' ? <ProfileTab /> : <PasswordTab />}
      </Body>
    </Container>
  );
};

const ProfileTab: React.FC = () => {
  const profile = useProfileStore((s) => s.profile);
  const updateProfile = useProfileStore((s) => s.updateProfile);
  const isLoading = useProfileStore((s) => s.isLoading);
  const error = useProfileStore((s) => s.error);

  const [firstName, setFirstName] = useState(profile?.firstName ?? '');
  const [lastName, setLastName] = useState(profile?.lastName ?? '');
  const [birthDate, setBirthDate] = useState(profile?.birthDate ?? '');
  const [height, setHeight] = useState(profile?.heightCm?.toString() ?? '');
  const [weight, setWeight] = useState(profile?.weightKg?.toString() ?? '');
  const [weeklyGoal, setWeeklyGoal] = useState(profile?.weeklyGoal?.toString() ?? '');
  const [fitnessGoals, setFitnessGoals] = useState<string[]>(profile?.fitnessGoals ?? []);
  const [saved, setSaved] = useState(false);

  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    birthDate.length === 10 &&
    height.trim() &&
    weight.trim() &&
    weeklyGoal &&
    fitnessGoals.length > 0;

  const handleSave = async () => {
    if (!isFormValid) {
      return;
    }
    const success = await updateProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      birthDate,
      heightCm: Number(height),
      weightKg: Number(weight),
      weeklyGoal: Number(weeklyGoal),
      fitnessGoals: fitnessGoals as FitnessGoal[],
    });
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <TabContent>
      <Content
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Section>
          <Row>
            <Input
              label="Nome"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Seu nome"
              autoCapitalize="words"
              containerStyle={{ flex: 1 }}
            />
            <Input
              label="Sobrenome"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Seu sobrenome"
              autoCapitalize="words"
              containerStyle={{ flex: 1 }}
            />
          </Row>
        </Section>

        <Section>
          <Input
            label="Data de nascimento"
            value={birthDate}
            onChangeText={(text) => setBirthDate(formatBirthDate(text))}
            placeholder="DD/MM/AAAA"
            keyboardType="number-pad"
            maxLength={10}
          />
        </Section>

        <Section>
          <Row>
            <Input
              label="Altura (cm)"
              value={height}
              onChangeText={setHeight}
              placeholder="175"
              keyboardType="number-pad"
              maxLength={3}
              containerStyle={{ flex: 1 }}
            />
            <Input
              label="Peso (kg)"
              value={weight}
              onChangeText={setWeight}
              placeholder="75"
              keyboardType="decimal-pad"
              maxLength={5}
              containerStyle={{ flex: 1 }}
            />
          </Row>
        </Section>

        <Section>
          <SectionLabel>Quantas vezes pretende treinar por semana?</SectionLabel>
          <ChipSelect
            items={WEEKLY_GOAL_OPTIONS}
            selected={weeklyGoal}
            onSelect={setWeeklyGoal}
          />
        </Section>

        <Section>
          <SectionLabel>Qual seu objetivo?</SectionLabel>
          <ChipSelect
            items={FITNESS_GOAL_OPTIONS}
            multiple
            selected={fitnessGoals}
            onSelect={setFitnessGoals}
          />
        </Section>

        {error && <ErrorText>{error}</ErrorText>}
        {saved && <SuccessText>Perfil atualizado!</SuccessText>}
      </Content>

      <Footer>
        <Button title="Salvar" onPress={handleSave} disabled={!isFormValid} isLoading={isLoading} />
      </Footer>
    </TabContent>
  );
};

const PasswordTab: React.FC = () => {
  const { changePassword, isLoading, error, clearError } = useAuthStore();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const passwordMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  const isFormValid =
    currentPassword.trim() &&
    newPassword.length >= 6 &&
    newPassword === confirmPassword;

  const handleChangePassword = async () => {
    if (!isFormValid) {
      return;
    }
    const ok = await changePassword(currentPassword, newPassword);
    if (ok) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <TabContent>
      <Content
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Section>
          <Input
            label="Senha atual"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Digite sua senha atual"
            secureTextEntry
            autoCapitalize="none"
          />
        </Section>

        <Section>
          <Input
            label="Nova senha"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
            autoCapitalize="none"
          />
        </Section>

        <Section>
          <Input
            label="Confirmar nova senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Repita a nova senha"
            secureTextEntry
            autoCapitalize="none"
            error={passwordMismatch ? 'As senhas não coincidem' : undefined}
          />
        </Section>

        {error && <ErrorText>{error}</ErrorText>}
        {success && <SuccessText>Senha alterada com sucesso!</SuccessText>}
      </Content>

      <Footer>
        <Button
          title="Alterar senha"
          onPress={handleChangePassword}
          isLoading={isLoading}
          disabled={!isFormValid}
        />
      </Footer>
    </TabContent>
  );
};

export default SettingsScreen;
