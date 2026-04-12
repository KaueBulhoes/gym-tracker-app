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
  BottomBar,
  BottomBarButton,
  BottomBarLabel,
  BottomBarStartButton,
  BottomBarStartLabel,
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
  ProfileButton,
  ProgressBarWrapper,
  ScrollContent,
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
  mockMonthlyTotal,
  mockUser,
  mockWeeklyGoal,
} from '../../mocks/homeData';
import { useAuthStore } from '../../stores/authStore';
import { useWorkoutStore } from '../../stores/workoutStore';
import type { AppStackParamList } from '../../navigation/types';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeScreen: React.FC = () => {
  const { signOut } = useAuthStore();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const plans = useWorkoutStore(state => state.plans);
  const lastCompleted = useWorkoutStore(state => state.lastCompleted);

  const remaining = mockWeeklyGoal.target - mockWeeklyGoal.completed;
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);

  const hasPlan = plans.length > 0;

  const allDays = plans.flatMap(plan =>
    plan.days.map(day => ({ ...day, planId: plan.id })),
  );

  const nextDay = (() => {
    if (!lastCompleted || allDays.length === 0) {
      return allDays[0] ?? null;
    }
    const currentIndex = allDays.findIndex(
      d => d.planId === lastCompleted.planId && d.name === lastCompleted.dayName,
    );
    if (currentIndex === -1) {
      return allDays[0];
    }
    return allDays[(currentIndex + 1) % allDays.length];
  })();

  const toggleWorkout = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedWorkout(prev => (prev === key ? null : key));
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} />
      <ScrollContent showsVerticalScrollIndicator={false}>
        <Header>
          <HeaderContent>
            <WelcomeText>Bem-vindo de volta,</WelcomeText>
            <UserName>{mockUser.name}!</UserName>
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
                : 'Parabéns! Você bateu sua meta semanal!'}
            </GoalMotivation>
          </Card>

          <MetricsRow>
            <MetricCard>
              <MetricLabel>Último treino</MetricLabel>
              <MetricValue>
                {lastCompleted ? lastCompleted.dayName : '-'}
              </MetricValue>
              <MetricSub>-</MetricSub>
            </MetricCard>

            <MetricCard>
              <MetricLabel>Treinos no mês</MetricLabel>
              <MetricValueLarge>{mockMonthlyTotal}</MetricValueLarge>
            </MetricCard>
          </MetricsRow>

          {hasPlan && (
            <>
              <SectionTitle>Meus Treinos</SectionTitle>
              <WorkoutList>
                {allDays.map(day => {
                  const key = `${day.planId}-${day.name}`;
                  const isNext = nextDay?.planId === day.planId && nextDay?.name === day.name;
                  const isExpanded = expandedWorkout === key;
                  const exerciseCount = day.exercises.length;

                  return (
                    <WorkoutAccordion
                      key={key}
                      $isNext={isNext}
                      onPress={() => toggleWorkout(key)}
                      accessibilityLabel={day.name}
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
                              {day.name}
                            </WorkoutAccordionTitle>
                            <WorkoutAccordionSubtitle>
                              {exerciseCount} {exerciseCount === 1 ? 'exercício' : 'exercícios'}
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
                          {day.exercises.map(exercise => {
                            const schemeLabel = exercise.fixedReps
                              ? `${exercise.sets}x${exercise.reps}`
                              : (exercise.repSchemes ?? []).map(s => `${s.sets}x${s.reps}`).join(' + ');
                            return (
                              <WorkoutDetail key={exercise.id}>
                                <MaterialCommunityIcons
                                  name="dumbbell"
                                  size={16}
                                  color={colors.textSecondary}
                                />
                                <WorkoutDetailText>
                                  {exercise.name} — {schemeLabel}
                                </WorkoutDetailText>
                              </WorkoutDetail>
                            );
                          })}
                          <Button
                            title="Começar Treino"
                            onPress={() => navigation.navigate('ActiveWorkout', { planId: day.planId, dayName: day.name })}
                            style={{ marginTop: spacing.md }}
                          />
                        </WorkoutAccordionBody>
                      )}
                    </WorkoutAccordion>
                  );
                })}
              </WorkoutList>
            </>
          )}
        </ContentArea>
      </ScrollContent>

      <BottomBar>
        <BottomBarButton
          onPress={() => navigation.navigate('AddWorkoutPlan')}
          accessibilityLabel="Novo plano de treino"
        >
          <MaterialCommunityIcons name="plus" size={24} color={colors.neutral300} />
          <BottomBarLabel>Adicionar</BottomBarLabel>
        </BottomBarButton>

        <BottomBarStartButton
          $disabled={!hasPlan}
          disabled={!hasPlan}
          onPress={() => {
            if (nextDay) {
              navigation.navigate('ActiveWorkout', { planId: nextDay.planId, dayName: nextDay.name });
            }
          }}
          accessibilityLabel="Começar treino do dia"
        >
          <MaterialCommunityIcons name="play" size={28} color={colors.textInverse} />
          <BottomBarStartLabel>Começar</BottomBarStartLabel>
        </BottomBarStartButton>

        <BottomBarButton
          onPress={() => { }}
          accessibilityLabel="Estatísticas"
        >
          <MaterialCommunityIcons name="chart-line" size={24} color={colors.neutral300} />
          <BottomBarLabel>Estatísticas</BottomBarLabel>
        </BottomBarButton>
      </BottomBar>
    </Container>
  );
};

export default HomeScreen;
