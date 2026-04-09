import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { LayoutAnimation, Platform, StatusBar, UIManager } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import { colors, spacing, typography } from '../../constants';
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

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const ScrollContent = styled.ScrollView``;

const Header = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.huge}px;
  padding-bottom: ${spacing.xl}px;
  background-color: ${colors.secondaryDark};
`;

const HeaderContent = styled.View`
  flex: 1;
`;

const WelcomeText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.neutral200};
`;

const UserName = styled.Text`
  font-size: ${typography.h2.fontSize}px;
  font-weight: ${typography.h2.fontWeight};
  color: ${colors.neutral50};
  margin-top: ${spacing.xxs}px;
`;

const ProfileButton = styled.Pressable`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: rgba(255, 255, 255, 0.15);
  align-items: center;
  justify-content: center;
`;

const ContentArea = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.lg}px;
  padding-bottom: 55px;
  gap: ${spacing.base}px;
`;

const GoalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const GoalTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

const GoalTitle = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.neutral50};
`;

const GoalCount = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.neutral50};
`;

const ProgressBarWrapper = styled.View`
  margin-top: ${spacing.md}px;
  margin-bottom: ${spacing.sm}px;
`;

const GoalMotivation = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  color: ${colors.neutral200};
`;

const MetricsRow = styled.View`
  flex-direction: row;
  gap: ${spacing.md}px;
`;

const MetricCard = styled.View`
  flex: 1;
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  border-width: 1px;
  border-color: ${colors.neutral600};
  padding: ${spacing.md}px;
  align-items: center;
  gap: ${spacing.xxs}px;
`;

const MetricValue = styled.Text`
  font-size: ${typography.numberSmall.fontSize}px;
  font-weight: ${typography.numberSmall.fontWeight};
  color: ${colors.text};
`;

const MetricValueLarge = styled.Text`
  font-size: ${typography.number.fontSize}px;
  font-weight: ${typography.number.fontWeight};
  color: ${colors.text};
  flex: 1;
  text-align-vertical: center;
`;

const MetricLabel = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  color: ${colors.textSecondary};
`;

const MetricSub = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  color: ${colors.neutral400};
`;


const NextWorkoutHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.base}px;
`;

const NextWorkoutTitle = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.text};
`;

const SectionHeader = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${spacing.sm}px;
`;

const SectionTitle = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.text};
`;

const AddPlanFAB = styled.Pressable`
  position: absolute;
  bottom: ${spacing.xl}px;
  align-self: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${colors.primary};
  align-items: center;
  justify-content: center;
  elevation: 6;
  shadow-color: ${colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.35;
  shadow-radius: 8px;
`;

const WorkoutList = styled.View`
  gap: ${spacing.sm}px;
`;

const WorkoutAccordion = styled.Pressable<{ $isNext: boolean }>`
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  border-width: 1px;
  border-color: ${({ $isNext }) =>
    $isNext ? colors.primary : colors.neutral600};
  overflow: hidden;
`;

const WorkoutAccordionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.cardPadding}px;
`;

const WorkoutAccordionLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const WorkoutIconContainer = styled.View<{ $isNext: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ $isNext }) =>
    $isNext ? 'rgba(255, 214, 10, 0.15)' : colors.backgroundHighlight};
  align-items: center;
  justify-content: center;
  margin-right: ${spacing.md}px;
`;

const WorkoutAccordionInfo = styled.View`
  flex: 1;
`;

const WorkoutAccordionTitle = styled.Text<{ $isNext: boolean }>`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ $isNext }) => ($isNext ? colors.primary : colors.text)};
`;

const WorkoutAccordionSubtitle = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.textSecondary};
  margin-top: ${spacing.xxs}px;
`;

const WorkoutAccordionRight = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

const NextBadge = styled.View`
  background-color: rgba(255, 214, 10, 0.15);
  padding-horizontal: ${spacing.sm}px;
  padding-vertical: ${spacing.xxs}px;
  border-radius: ${spacing.buttonRadius}px;
`;

const NextBadgeText = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.primary};
`;

const WorkoutAccordionBody = styled.View`
  padding-horizontal: ${spacing.cardPadding}px;
  padding-bottom: ${spacing.cardPadding}px;
  border-top-width: 1px;
  border-top-color: ${colors.neutral600};
`;

const WorkoutDetail = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.xs}px;
  margin-top: ${spacing.md}px;
`;

const WorkoutDetailText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.textSecondary};
`;

export default HomeScreen;
