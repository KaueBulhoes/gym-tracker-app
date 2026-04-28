import React, { useRef, useState } from 'react';
import { Modal, StatusBar, Switch, type View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import Button from '../../../components/Button';
import { spacing } from '../../../constants';
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
  GearButton,
  Header,
  HeaderTitle,
  MenuModalCard,
  MenuModalOption,
  MenuModalOptionText,
  MenuModalSeparator,
  MenuOverlay,
  ModalCard,
  ModalDayTitle,
  ModalExerciseName,
  ModalOverlay,
  ModalScroll,
  ModalTitle,
  PlanCard,
  PlanCardHeader,
  PlanDate,
  PlanName,
  ScrollContent,
  SelectLabel,
  SelectRow,
} from './WorkoutPlansScreen.styles';

const WorkoutPlansScreen: React.FC<WorkoutPlansScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const plans = useWorkoutStore(state => state.plans);
  const setActivePlan = useWorkoutStore(state => state.setActivePlan);
  const loadDraftFromPlan = useWorkoutStore(state => state.loadDraftFromPlan);
  const deletePlan = useWorkoutStore(state => state.deletePlan);
  const isLoading = useWorkoutStore(state => state.isLoading);

  const [selectMode, setSelectMode] = useState(false);
  const [detailPlan, setDetailPlan] = useState<WorkoutPlan | null>(null);
  const [menuPlan, setMenuPlan] = useState<WorkoutPlan | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const gearRefs = useRef<Record<string, View | null>>({});

  const handleCardPress = (plan: WorkoutPlan) => {
    if (selectMode) {
      if (isLoading) { return; }
      setActivePlan(plan.id);
    } else {
      setDetailPlan(plan);
    }
  };

  const handleEdit = (plan: WorkoutPlan) => {
    setMenuPlan(null);
    loadDraftFromPlan(plan);
    const days = plan.days.map(d => d.name);
    navigation.navigate('AddWorkoutExercises', { days });
  };

  const handleDelete = async (plan: WorkoutPlan) => {
    setMenuPlan(null);
    await deletePlan(plan.id);
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} />

      <Header>
        <BackButton onPress={() => navigation.goBack()} accessibilityLabel="Voltar">
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.onSecondary} />
        </BackButton>
        <HeaderTitle>Planos de Treino</HeaderTitle>
      </Header>

      <ScrollContent showsVerticalScrollIndicator={false}>
        <Content>
          {plans.length === 0 ? (
            <EmptyText>Nenhum plano criado ainda.</EmptyText>
          ) : (
            <>
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
                    <PlanCardHeader>
                      <PlanName>{plan.name}</PlanName>
                      <GearButton
                        ref={(ref: View | null) => { gearRefs.current[plan.id] = ref; }}
                        onPress={() => {
                          const ref = gearRefs.current[plan.id];
                          if (ref) {
                            (ref as unknown as { measureInWindow: (cb: (x: number, y: number, w: number, h: number) => void) => void })
                              .measureInWindow((x, y, w, h) => {
                                setMenuPosition({ top: y + h + 8, right: spacing.screenHorizontal });
                                setMenuPlan(plan);
                              });
                          } else {
                            setMenuPlan(plan);
                          }
                        }}
                        accessibilityLabel={`Opções de ${plan.name}`}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <MaterialCommunityIcons name="cog-outline" size={20} color={colors.neutral400} />
                      </GearButton>
                    </PlanCardHeader>
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

      {/* Detail modal */}
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

      {/* Gear menu modal */}
      <Modal
        visible={menuPlan !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setMenuPlan(null)}
      >
        <MenuOverlay onPress={() => setMenuPlan(null)}>
          <MenuModalCard
            style={{ position: 'absolute', top: menuPosition.top, right: menuPosition.right }}
            onStartShouldSetResponder={() => true}
          >
            {menuPlan && (
              <>
                <MenuModalOption
                  onPress={() => handleEdit(menuPlan)}
                  accessibilityLabel="Editar plano"
                >
                  <MaterialCommunityIcons name="pencil-outline" size={20} color={colors.text} />
                  <MenuModalOptionText>Editar</MenuModalOptionText>
                </MenuModalOption>
                <MenuModalSeparator />
                <MenuModalOption
                  onPress={() => handleDelete(menuPlan)}
                  accessibilityLabel="Excluir plano"
                >
                  <MaterialCommunityIcons name="trash-can-outline" size={20} color={colors.error} />
                  <MenuModalOptionText $danger>Excluir</MenuModalOptionText>
                </MenuModalOption>
              </>
            )}
          </MenuModalCard>
        </MenuOverlay>
      </Modal>
    </Container>
  );
};

export default WorkoutPlansScreen;
