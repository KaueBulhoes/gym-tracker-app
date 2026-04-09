import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { LayoutAnimation, Platform, StatusBar, UIManager } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import { colors, spacing } from '../../constants';
import {
  AddPlanFAB,
  Container,
  ContentArea,
  GoalCount,
  GoalHeader,
  GoalMotivation,
  GoalTitle,
  GoalTitleRow,
  Header,
  HeaderContent,
  MetricCard,
  MetricLabel,
  MetricSub,
  MetricValue,
  MetricValueLarge,
  MetricsRow,
  NextBadge,
  NextBadgeText,
  NextWorkoutHeader,
  NextWorkoutTitle,
  ProfileButton,
  ProgressBarWrapper,
  ScrollContent,
  SectionHeader,
  SectionTitle,
  UserName,
  WelcomeText,
  WorkoutAccordion,
  WorkoutAccordionBody,
  WorkoutAccordionHeader,
  WorkoutAccordionInfo,
  WorkoutAccordionLeft,
  WorkoutAccordionRight,
  WorkoutAccordionSubtitle,
  WorkoutAccordionTitle,
  WorkoutDetail,
  WorkoutDetailText,
  WorkoutIconContainer,
  WorkoutList,
} from './HomeScreen.styles';
import {
  mockLastWorkout,
  mockMonthlyTotal,
  mockNextWorkout,
  mockUser,
  mockWeeklyGoal,
  mockWorkoutPlan,
} from '../../mocks/homeData';
import { useAuthStore } from '../../stores/authStore';
import type { AppStackParamList } from '../../navigation/types';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const day = days[date.getDay()];
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${day} ${dd}/${mm}`;
};

const HomeScreen: React.FC = () => {
  const { signOut } = useAuthStore();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const remaining = mockWeeklyGoal.target - mockWeeklyGoal.completed;
  const [isWorkoutSectionOpen, setIsWorkoutSectionOpen] = useState(false);
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);

  const toggleWorkoutSection = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsWorkoutSectionOpen(prev => !prev);
  };

  const toggleWorkout = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedWorkout(prev => (prev === id ? null : id));
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} />
      <ScrollContent showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header>
          <HeaderContent>
            <WelcomeText>Bem-vindo de volta,</WelcomeText>
            <UserName>{mockUser.name}! 💪</UserName>
          </HeaderContent>
          <ProfileButton
            onPress={signOut}
            accessibilityLabel="Perfil"
          >
            <MaterialCommunityIcons
              name="account-outline"
              size={28}
              color={colors.neutral50}
            />
          </ProfileButton>
        </Header>

        <ContentArea>
          {/* Meta Semanal */}
          <Card variant="purple">
            <GoalHeader>
              <GoalTitleRow>
                <MaterialCommunityIcons
                  name="target"
                  size={spacing.iconSize.md}
                  color={colors.primary}
                />
                <GoalTitle>Meta Semanal</GoalTitle>
              </GoalTitleRow>
              <GoalCount>
                {mockWeeklyGoal.completed}/{mockWeeklyGoal.target}
              </GoalCount>
            </GoalHeader>
            <ProgressBarWrapper>
              <ProgressBar
                current={mockWeeklyGoal.completed}
                total={mockWeeklyGoal.target}
              />
            </ProgressBarWrapper>
            <GoalMotivation>
              {remaining > 0
                ? `Falta${remaining > 1 ? 'm' : ''} apenas ${remaining} treino${remaining > 1 ? 's' : ''} para bater sua meta!`
                : 'Parabéns! Você bateu sua meta semanal! 🎉'}
            </GoalMotivation>
          </Card>

          {/* Métricas */}
          <MetricsRow>
            <MetricCard>
              <MetricLabel>Último treino</MetricLabel>
              <MetricValue>Treino {mockLastWorkout.type}</MetricValue>
              <MetricSub>
                {mockLastWorkout.completedAt
                  ? formatDate(mockLastWorkout.completedAt)
                  : '-'}
              </MetricSub>
            </MetricCard>

            <MetricCard>
              <MetricLabel>Treinos no mês</MetricLabel>
              <MetricValueLarge>{mockMonthlyTotal}</MetricValueLarge>
            </MetricCard>
          </MetricsRow>

          {/* Próximo Treino */}
          <Card variant="highlighted">
            <NextWorkoutHeader>
              <NextWorkoutTitle>
                Treino {mockNextWorkout.type} - {mockNextWorkout.description}
              </NextWorkoutTitle>
              <NextBadge>
                <NextBadgeText>Próximo</NextBadgeText>
              </NextBadge>
            </NextWorkoutHeader>
            <Button title="Começar Treino" onPress={() => { }} />
          </Card>

          {/* Meus Treinos */}
          <SectionHeader onPress={toggleWorkoutSection} accessibilityLabel="Meus Treinos">
            <SectionTitle>Meus Treinos</SectionTitle>
            <MaterialCommunityIcons
              name={isWorkoutSectionOpen ? 'chevron-up' : 'chevron-down'}
              size={spacing.iconSize.md}
              color={colors.neutral400}
            />
          </SectionHeader>
          {isWorkoutSectionOpen && <WorkoutList>
            {mockWorkoutPlan.map(workout => {
              const isNext = workout.id === mockNextWorkout.id;
              const isExpanded = expandedWorkout === workout.id;

              return (
                <WorkoutAccordion
                  key={workout.id}
                  $isNext={isNext}
                  onPress={() => toggleWorkout(workout.id)}
                  accessibilityLabel={`Treino ${workout.type} - ${workout.description}`}
                >
                  <WorkoutAccordionHeader>
                    <WorkoutAccordionLeft>
                      <WorkoutIconContainer $isNext={isNext}>
                        <MaterialCommunityIcons
                          name="dumbbell"
                          size={spacing.iconSize.md}
                          color={isNext ? colors.primary : colors.secondary}
                        />
                      </WorkoutIconContainer>
                      <WorkoutAccordionInfo>
                        <WorkoutAccordionTitle $isNext={isNext}>
                          Treino {workout.type}
                        </WorkoutAccordionTitle>
                        <WorkoutAccordionSubtitle>
                          {workout.description}
                        </WorkoutAccordionSubtitle>
                      </WorkoutAccordionInfo>
                    </WorkoutAccordionLeft>
                    <WorkoutAccordionRight>
                      {isNext && <NextBadge><NextBadgeText>Próximo</NextBadgeText></NextBadge>}
                      <MaterialCommunityIcons
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={spacing.iconSize.md}
                        color={colors.neutral400}
                      />
                    </WorkoutAccordionRight>
                  </WorkoutAccordionHeader>

                  {isExpanded && (
                    <WorkoutAccordionBody>
                      <WorkoutDetail>
                        <MaterialCommunityIcons
                          name="clock-outline"
                          size={16}
                          color={colors.textSecondary}
                        />
                        <WorkoutDetailText>
                          Duração média: {workout.durationMinutes} min
                        </WorkoutDetailText>
                      </WorkoutDetail>
                      <Button
                        title="Iniciar Treino"
                        onPress={() => { }}
                        style={{ marginTop: spacing.md }}
                      />
                    </WorkoutAccordionBody>
                  )}
                </WorkoutAccordion>
              );
            })}
          </WorkoutList>}
        </ContentArea>
      </ScrollContent>

      <AddPlanFAB
        onPress={() => navigation.navigate('AddWorkoutPlan')}
        accessibilityLabel="Novo plano de treino"
      >
        <MaterialCommunityIcons name="plus" size={28} color={colors.textInverse} />
      </AddPlanFAB>
    </Container>
  );
};

export default HomeScreen;
