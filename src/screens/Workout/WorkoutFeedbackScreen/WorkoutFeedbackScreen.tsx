import React, { useEffect, useMemo, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import Select, { type SelectItem } from '../../../components/Select';
import { spacing } from '../../../constants';
import type { WorkoutFeedbackScreenProps } from '../../../navigation/types';
import { useWorkoutStore } from '../../../stores/workoutStore';
import type { WorkoutIntensity } from '../../../types/workout';
import {
  BackButton,
  CommentInput,
  CommentLabel,
  CommentLabelRow,
  CommentLabelText,
  Container,
  ConcludeButton,
  ConcludeButtonText,
  Content,
  Footer,
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
  HeaderRow,
  HeaderSubtitle,
  HeaderTitle,
  KeyboardArea,
  MotivationalCard,
  MotivationalText,
  OptionalHint,
  ScrollContent,
  TimerLabel,
  TimerText,
  TimerWrapper,
} from './WorkoutFeedbackScreen.styles';

const MOTIVATIONAL_MESSAGES = [
  'Mais um treino na conta. Você está se superando! 💪',
  'Disciplina é o que separa quem sonha de quem realiza. Continue!',
  'Cada repetição te aproxima do seu objetivo. Bom trabalho!',
  'A versão de amanhã agradece pelo esforço de hoje.',
  'Treino concluído. Recupere bem e volte ainda mais forte!',
  'Foco e consistência. É assim que se constrói resultado.',
];

const INTENSITY_OPTIONS: SelectItem[] = [
  { value: 'light', label: 'Leve' },
  { value: 'moderate', label: 'Moderado' },
  { value: 'intense', label: 'Intenso' },
];

const formatTime = (totalSeconds: number): string => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const WorkoutFeedbackScreen: React.FC<WorkoutFeedbackScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const activeWorkout = useWorkoutStore((s) => s.activeWorkout);
  const plans = useWorkoutStore((s) => s.plans);
  const finishWorkout = useWorkoutStore((s) => s.finishWorkout);
  const error = useWorkoutStore((s) => s.error);
  const clearError = useWorkoutStore((s) => s.clearError);

  const [intensity, setIntensity] = useState<WorkoutIntensity | null>(null);
  const [difficultExercises, setDifficultExercises] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const motivationalMessage = useMemo(() => {
    const index = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
    return MOTIVATIONAL_MESSAGES[index];
  }, []);

  useEffect(() => {
    if (!activeWorkout) {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  }, [activeWorkout, navigation]);

  const exerciseItems: SelectItem[] = useMemo(() => {
    if (!activeWorkout) {
      return [];
    }
    const plan = plans.find((p) => p.id === activeWorkout.planId);
    const day = plan?.days.find((d) => d.name === activeWorkout.dayName);
    return (day?.exercises ?? []).map((ex) => ({
      value: ex.name,
      label: ex.name,
    }));
  }, [activeWorkout, plans]);

  if (!activeWorkout) {
    return null;
  }

  const handleBack = () => {
    navigation.goBack();
  };

  const handleConclude = async () => {
    if (!intensity || isSaving) {
      return;
    }
    clearError();
    setIsSaving(true);

    const trimmedComment = comment.trim();
    const success = await finishWorkout({
      id: String(Date.now()),
      planId: activeWorkout.planId,
      dayName: activeWorkout.dayName,
      startedAt: activeWorkout.startedAt,
      finishedAt: new Date().toISOString(),
      durationSeconds: activeWorkout.elapsedSeconds,
      exerciseWeights: Object.values(activeWorkout.exerciseWeights),
      feedback: {
        intensity,
        difficultExercises,
        comment: trimmedComment.length > 0 ? trimmedComment : null,
      },
    });

    if (success) {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } else {
      setIsSaving(false);
    }
  };

  const canSubmit = intensity !== null && !isSaving;

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} />

      <Header>
        <HeaderRow>
          <HeaderLeft>
            <BackButton onPress={handleBack} accessibilityLabel="Voltar para o treino">
              <MaterialCommunityIcons name="arrow-left" size={22} color={colors.onSecondary} />
            </BackButton>
          </HeaderLeft>
          <HeaderCenter>
            <HeaderTitle>Treino concluído!</HeaderTitle>
            <HeaderSubtitle>{activeWorkout.dayName}</HeaderSubtitle>
          </HeaderCenter>
          <HeaderRight />
        </HeaderRow>
      </Header>

      <KeyboardArea behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollContent
          contentContainerStyle={{ paddingBottom: spacing.xxl + insets.bottom }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Content>
            <TimerWrapper>
              <TimerLabel>Tempo total</TimerLabel>
              <TimerText>{formatTime(activeWorkout.elapsedSeconds)}</TimerText>
            </TimerWrapper>

            <MotivationalCard>
              <MaterialCommunityIcons
                name="trophy"
                size={spacing.iconSize.lg}
                color={colors.primary}
              />
              <MotivationalText>{motivationalMessage}</MotivationalText>
            </MotivationalCard>

            <Select
              label="Qual a intensidade do treino?"
              placeholder="Selecione uma opção"
              modalTitle="Intensidade"
              items={INTENSITY_OPTIONS}
              selected={intensity}
              onChange={(v) => setIntensity(v as WorkoutIntensity)}
            />

            <Select
              label="Teve dificuldade em algum exercício?"
              labelHint="Opcional"
              placeholder="Selecione os exercícios"
              modalTitle="Exercícios com dificuldade"
              items={exerciseItems}
              multiple
              selected={difficultExercises}
              onChange={setDifficultExercises}
              emptyHint="Sem exercícios cadastrados neste dia."
            />

            <CommentLabel>
              <CommentLabelRow>
                <CommentLabelText>Comentários</CommentLabelText>
                <OptionalHint>Opcional</OptionalHint>
              </CommentLabelRow>
              <CommentInput
                placeholder="Como foi o treino?"
                placeholderTextColor={colors.neutral300}
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
                maxLength={500}
                textAlignVertical="top"
                accessibilityLabel="Comentários sobre o treino"
              />
            </CommentLabel>

            {error ? <OptionalHint>{error}</OptionalHint> : null}
          </Content>
        </ScrollContent>

        <Footer $bottomInset={insets.bottom}>
          <ConcludeButton
            onPress={handleConclude}
            disabled={!canSubmit}
            $disabled={!canSubmit}
            accessibilityLabel="Concluir treino"
            accessibilityState={{ disabled: !canSubmit }}
          >
            <ConcludeButtonText>
              {isSaving ? 'Salvando...' : 'Concluir'}
            </ConcludeButtonText>
          </ConcludeButton>
        </Footer>
      </KeyboardArea>
    </Container>
  );
};

export default WorkoutFeedbackScreen;
