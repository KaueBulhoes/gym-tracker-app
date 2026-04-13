import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { LayoutAnimation, Modal, Platform, StatusBar, TextInput, UIManager } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import ProgressBar from '../../../components/ProgressBar';
import { colors, spacing } from '../../../constants';
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
  ProfileMenuOverlay,
  ProfileMenuCard,
  ProfileMenuItem,
  ProfileMenuItemText,
  ProfileMenuDivider,
} from './HomeScreen.styles';
import { useAuthStore } from '../../../stores/authStore';
import { useProfileStore } from '../../../stores/profileStore';
import { useWorkoutStore } from '../../../stores/workoutStore';
import type { AppStackParamList } from '../../../navigation/types';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const getWeekStart = (): string => {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diff);
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString();
};

const HomeScreen: React.FC = () => {
  const { signOut } = useAuthStore();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const plans = useWorkoutStore(state => state.plans);
  const lastCompleted = useWorkoutStore(state => state.lastCompleted);
  const profile = useProfileStore(state => state.profile);
  const sessions = useWorkoutStore(state => state.sessions);

  const weeklyTarget = profile?.weeklyGoal ?? 5;
  const weekStart = getWeekStart();
  const weeklyRaw = sessions.filter(
    s => s.finishedAt >= weekStart,
  ).length;
  const weeklyCompleted = Math.min(weeklyRaw, weeklyTarget);
  const remaining = weeklyTarget - weeklyCompleted;

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const monthlyTotal = sessions.filter(
    s => s.finishedAt >= monthStart.toISOString(),
  ).length;
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const activePlan = plans.find(p => p.isActive) ?? null;
  const hasPlan = activePlan !== null;

  const allDays = activePlan
    ? activePlan.days.map(day => ({ ...day, planId: activePlan.id }))
    : [];

  const isExpired = activePlan?.expiresAt
    && new Date(activePlan.expiresAt) <= new Date()
    && !activePlan.expiryDismissed;

  const renewPlan = useWorkoutStore(state => state.renewPlan);
  const dismissExpiry = useWorkoutStore(state => state.dismissExpiry);
  const [showExpiryModal, setShowExpiryModal] = useState(false);
  const [renewDays, setRenewDays] = useState('');

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
            <UserName>{profile?.firstName ?? 'Atleta'}!</UserName>
          </HeaderContent>
          <ProfileButton
            onPress={() => setShowProfileMenu(true)}
            accessibilityLabel="Menu do perfil"
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
                {weeklyCompleted}/{weeklyTarget}
              </GoalCount>
            </GoalHeader>
            <ProgressBarWrapper>
              <ProgressBar
                current={weeklyCompleted}
                total={weeklyTarget}
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
              <MetricValueLarge>{monthlyTotal}</MetricValueLarge>
            </MetricCard>
          </MetricsRow>

          {hasPlan && (
            <>
              <SectionTitle>
                Meus Treinos
                {isExpired && (
                  <>
                    {'  '}
                    <MaterialCommunityIcons
                      name="alert"
                      size={18}
                      color={colors.primary}
                      onPress={() => setShowExpiryModal(true)}
                    />
                  </>
                )}
              </SectionTitle>
              {isExpired && (
                <WorkoutDetailText
                  style={{ color: colors.primary, marginBottom: spacing.sm, marginLeft: spacing.screenHorizontal }}
                  onPress={() => setShowExpiryModal(true)}
                >
                  Sua ficha venceu
                </WorkoutDetailText>
              )}
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
                              {day.name}{day.description ? ` - ${day.description}` : ''}
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
          onPress={() => navigation.navigate('WorkoutPlans')}
          accessibilityLabel="Planos de treino"
        >
          <MaterialCommunityIcons name="clipboard-text-outline" size={24} color={colors.neutral300} />
          <BottomBarLabel>Planos</BottomBarLabel>
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

      <Modal
        visible={showExpiryModal}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setShowExpiryModal(false)}
      >
        <ProfileMenuOverlay onPress={() => setShowExpiryModal(false)}>
          <ProfileMenuCard>
            <SectionTitle style={{ marginBottom: spacing.md }}>Sua ficha venceu</SectionTitle>
            <MetricLabel style={{ marginBottom: spacing.sm }}>Renovar por quantos dias?</MetricLabel>
            <TextInput
              value={renewDays}
              onChangeText={t => setRenewDays(t.replace(/[^0-9]/g, ''))}
              placeholder="Ex: 30"
              placeholderTextColor={colors.neutral500}
              keyboardType="number-pad"
              maxLength={3}
              style={{
                backgroundColor: colors.backgroundElevated,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.neutral600,
                color: colors.text,
                fontSize: 16,
                paddingHorizontal: 12,
                paddingVertical: 8,
                marginBottom: spacing.md,
              }}
            />
            <Button
              title="Renovar ficha"
              onPress={async () => {
                if (renewDays && activePlan) {
                  await renewPlan(activePlan.id, Number(renewDays));
                  setRenewDays('');
                  setShowExpiryModal(false);
                }
              }}
              disabled={!renewDays}
              style={{ marginBottom: spacing.sm }}
            />
            <Button
              title="Dispensar aviso"
              onPress={async () => {
                if (activePlan) {
                  await dismissExpiry(activePlan.id);
                  setShowExpiryModal(false);
                }
              }}
              style={{ marginBottom: spacing.sm, backgroundColor: colors.neutral600 }}
            />
          </ProfileMenuCard>
        </ProfileMenuOverlay>
      </Modal>

      <Modal
        visible={showProfileMenu}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setShowProfileMenu(false)}
      >
        <ProfileMenuOverlay onPress={() => setShowProfileMenu(false)}>
          <ProfileMenuCard>
            <ProfileMenuItem
              onPress={() => {
                setShowProfileMenu(false);
                navigation.navigate('Settings');
              }}
              accessibilityLabel="Editar perfil"
            >
              <MaterialCommunityIcons name="pencil-outline" size={20} color={colors.text} />
              <ProfileMenuItemText>Editar perfil</ProfileMenuItemText>
            </ProfileMenuItem>
            <ProfileMenuDivider />
            <ProfileMenuItem
              onPress={() => {
                setShowProfileMenu(false);
                signOut();
              }}
              accessibilityLabel="Sair"
            >
              <MaterialCommunityIcons name="logout" size={20} color={colors.error} />
              <ProfileMenuItemText $danger>Sair</ProfileMenuItemText>
            </ProfileMenuItem>
          </ProfileMenuCard>
        </ProfileMenuOverlay>
      </Modal>
    </Container>
  );
};

export default HomeScreen;
