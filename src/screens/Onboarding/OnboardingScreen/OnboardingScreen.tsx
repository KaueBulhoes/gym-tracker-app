import React, { useState } from 'react';
import Button from '../../../components/Button';
import ChipSelect from '../../../components/ChipSelect';
import Input from '../../../components/Input';
import type { OnboardingScreenProps } from '../../../navigation/types';
import { useProfileStore } from '../../../stores/profileStore';
import type { FitnessGoal } from '../../../types/profile';
import {
  Container,
  Content,
  ErrorText,
  Footer,
  Header,
  Row,
  Section,
  SectionLabel,
  Subtitle,
  Title,
} from './OnboardingScreen.styles';

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

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [weeklyGoal, setWeeklyGoal] = useState('');
  const [fitnessGoals, setFitnessGoals] = useState<string[]>([]);

  const saveProfile = useProfileStore((s) => s.saveProfile);
  const isLoading = useProfileStore((s) => s.isLoading);
  const error = useProfileStore((s) => s.error);

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

    const success = await saveProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      birthDate,
      heightCm: Number(height),
      weightKg: Number(weight),
      weeklyGoal: Number(weeklyGoal),
      fitnessGoals: fitnessGoals as FitnessGoal[],
    });

    if (success) {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  };

  const handleBirthDateChange = (text: string) => {
    setBirthDate(formatBirthDate(text));
  };

  return (
    <Container>
      <Content
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Header>
          <Title>Complete seu perfil</Title>
          <Subtitle>Precisamos de algumas informações para personalizar sua experiência</Subtitle>
        </Header>

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
            onChangeText={handleBirthDateChange}
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
      </Content>

      <Footer>
        {error && <ErrorText>{error}</ErrorText>}
        <Button
          title="Começar"
          onPress={handleSave}
          disabled={!isFormValid}
          isLoading={isLoading}
        />
      </Footer>
    </Container>
  );
};

export default OnboardingScreen;
