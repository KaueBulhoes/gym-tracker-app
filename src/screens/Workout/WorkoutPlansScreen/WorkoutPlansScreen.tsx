import React, { useState } from 'react';
import { Modal, StatusBar, Switch } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../../components/Button';
import { colors, spacing } from '../../../constants';
import type { WorkoutPlansScreenProps } from '../../../navigation/types';
import { useWorkoutStore } from '../../../stores/workoutStore';
import type { WorkoutPlan } from '../../../types/workout';
import { isoTimestampToBr } from '../../../utils/caseMapper';
import {
  ActiveBadge,
  ActiveBadgeText,
  BackButton,
  Container,
  Content,
  EmptyText,
  Footer,
  Header,
  HeaderTitle,
  ModalCard,
  ModalDayTitle,
  ModalExerciseName,
  ModalOverlay,
  ModalScroll,
  ModalTitle,
  PlanCard,
  PlanDate,
  PlanName,
  ScrollContent,
  SectionTitle,
  SelectLabel,
  SelectRow,
} from './WorkoutPlansScreen.styles';

const WorkoutPlansScreen: React.FC<WorkoutPlansScreenProps> = ({ navigation }) => {
  const plans = useWorkoutStore(state => state.plans);
  const setActivePlan = useWorkoutStore(state => state.setActivePlan);
  const isLoading = useWorkoutStore(state => state.isLoading);

  const [selectMode, setSelectMode] = useState(false);
  const [detailPlan, setDetailPlan] = useState<WorkoutPlan | null>(null);

  const handleCardPress = (plan: WorkoutPlan) => {
    if (selectMode) {
      if (isLoading) { return; }
      setActivePlan(plan.id);
    } else {
      setDetailPlan(plan);
    }
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} />

      <Header>
        <BackButton onPress={() => navigation.goBack()} accessibilityLabel="Voltar">
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.neutral50} />
        </BackButton>
        <HeaderTitle>Planos de Treino</HeaderTitle>
      </Header>

      <ScrollContent showsVerticalScrollIndicator={false}>
        <Content>
          {plans.length === 0 ? (
            <EmptyText>Nenhum plano criado ainda.</EmptyText>
          ) : (
            <>
              <SectionTitle>Minhas fichas</SectionTitle>

              <SelectRow>
                <SelectLabel>Selecionar ficha ativa</SelectLabel>
                <Switch
                  value={selectMode}
                  onValueChange={setSelectMode}
                  trackColor={{ false: colors.neutral500, true: colors.secondaryLight }}
                  thumbColor={selectMode ? colors.secondary : colors.neutral300}
                  accessibilityLabel="Modo de seleção de ficha ativa"
                />
              </SelectRow>

              {plans.map(plan => {
                const createdDate = isoTimestampToBr(plan.createdAt);
                const finishedDate = plan.finishedAt
                  ? isoTimestampToBr(plan.finishedAt)
                  : null;

                return (
                  <PlanCard
                    key={plan.id}
                    $active={plan.isActive}
                    onPress={() => handleCardPress(plan)}
                    accessibilityLabel={`${plan.name}${plan.isActive ? ', ficha ativa' : ''}`}
                  >
                    <PlanName>{plan.name}</PlanName>
                    <PlanDate>Criado em: {createdDate}</PlanDate>
                    {finishedDate && !plan.isActive && (
                      <PlanDate>Finalizado: {finishedDate}</PlanDate>
                    )}
                    {plan.isActive && (
                      <ActiveBadge>
                        <MaterialCommunityIcons name="check-circle" size={16} color={colors.primary} />
                        <ActiveBadgeText>Ficha ativa</ActiveBadgeText>
                      </ActiveBadge>
                    )}
                  </PlanCard>
                );
              })}
            </>
          )}
        </Content>
      </ScrollContent>

      <Footer>
        <Button
          title="Criar novo plano"
          onPress={() => navigation.navigate('AddWorkoutPlan')}
        />
      </Footer>

      <Modal
        visible={detailPlan !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setDetailPlan(null)}
      >
        <ModalOverlay onPress={() => setDetailPlan(null)}>
          <ModalCard onStartShouldSetResponder={() => true}>
            {detailPlan && (
              <>
                <ModalTitle>{detailPlan.name}</ModalTitle>
                <ModalScroll showsVerticalScrollIndicator={false}>
                  {detailPlan.days.map(day => (
                    <React.Fragment key={day.name}>
                      <ModalDayTitle>
                        {day.name}{day.description ? ` - ${day.description}` : ''}
                      </ModalDayTitle>
                      {day.exercises.length === 0 ? (
                        <ModalExerciseName>Sem exercícios</ModalExerciseName>
                      ) : (
                        day.exercises.map(exercise => (
                          <ModalExerciseName key={exercise.id}>
                            {exercise.name}
                          </ModalExerciseName>
                        ))
                      )}
                    </React.Fragment>
                  ))}
                </ModalScroll>

                {!detailPlan.isActive && (
                  <Button
                    title="Ativar ficha"
                    onPress={() => {
                      if (isLoading) { return; }
                      setActivePlan(detailPlan.id);
                      setDetailPlan(null);
                    }}
                    isLoading={isLoading}
                    style={{ marginTop: spacing.lg }}
                  />
                )}
              </>
            )}
          </ModalCard>
        </ModalOverlay>
      </Modal>
    </Container>
  );
};

export default WorkoutPlansScreen;
