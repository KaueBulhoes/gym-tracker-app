import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LayoutAnimation, Modal, Platform, StatusBar, Switch, UIManager } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing } from '../../../constants';
import type { ActiveWorkoutScreenProps } from '../../../navigation/types';
import { useWorkoutStore } from '../../../stores/workoutStore';
import type { Exercise, ExerciseWeight } from '../../../types/workout';
import {
    BackButton,
    Checkbox,
    Container,
    Content,
    DaySubtitle,
    DayTitle,
    ExerciseAccordion,
    ExerciseBody,
    ExerciseHeader,
    ExerciseHeaderRight,
    ExerciseInfo,
    ExerciseMeta,
    ExerciseName,
    FinishButton,
    FinishButtonText,
    Header,
    Overlay,
    RestModal,
    RestModalSkip,
    RestModalSkipText,
    RestModalTimer,
    RestModalTitle,
    ScrollContent,
    SetCheckbox,
    SetRow,
    SetText,
    SetWeight,
    TimerText,
    WeightButton,
    WeightButtonLabel,
    WeightInput,
    WeightModal,
    WeightModalTitle,
    WeightSaveButton,
    WeightSaveButtonText,
    WeightSetLabel,
    WeightSetRow,
    WeightToggleLabel,
    WeightToggleRow,
    WeightUnit,
} from './ActiveWorkoutScreen.styles';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const numericOnly = (text: string) => text.replace(/[^0-9.,]/g, '');

const formatTime = (totalSeconds: number): string => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const formatRest = (totalSeconds: number): string => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

type SetInfo = { index: number; reps: string };

const buildSetList = (exercise: Exercise): SetInfo[] => {
    if (exercise.fixedReps) {
        const count = parseInt(exercise.sets, 10) || 1;
        return Array.from({ length: count }, (_, i) => ({ index: i, reps: exercise.reps }));
    }
    const list: SetInfo[] = [];
    for (const scheme of exercise.repSchemes ?? []) {
        const count = parseInt(scheme.sets, 10) || 1;
        for (let i = 0; i < count; i++) {
            list.push({ index: list.length, reps: scheme.reps });
        }
    }
    return list;
};

const ActiveWorkoutScreen: React.FC<ActiveWorkoutScreenProps> = ({ route, navigation }) => {
    const { planId, dayName } = route.params;

    const plan = useWorkoutStore(state =>
        state.plans.find(p => p.id === planId),
    );
    const finishWorkout = useWorkoutStore(state => state.finishWorkout);
    const day = plan?.days.find(d => d.name === dayName);
    const exercises = day?.exercises ?? [];

    const exerciseCount = exercises.length;
    const subtitle = `${exerciseCount} ${exerciseCount === 1 ? 'exercício' : 'exercícios'}`;

    const startedAtRef = useRef(new Date().toISOString());
    const [elapsed, setElapsed] = useState(0);
    const elapsedRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            elapsedRef.current += 1;
            setElapsed(elapsedRef.current);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const [exerciseWeights, setExerciseWeights] = useState<Record<string, ExerciseWeight>>({});
    const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
    const [completedSets, setCompletedSets] = useState<Record<string, Set<number>>>({});

    const [restSeconds, setRestSeconds] = useState(0);
    const restRef = useRef(0);
    const restIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const closeRest = useCallback(() => {
        if (restIntervalRef.current) {
            clearInterval(restIntervalRef.current);
            restIntervalRef.current = null;
        }
        setRestSeconds(0);
    }, []);

    const startRest = useCallback((seconds: number) => {
        if (seconds <= 0) {
            return;
        }
        restRef.current = seconds;
        setRestSeconds(seconds);
        restIntervalRef.current = setInterval(() => {
            restRef.current -= 1;
            if (restRef.current <= 0) {
                closeRest();
            } else {
                setRestSeconds(restRef.current);
            }
        }, 1000);
    }, [closeRest]);

    useEffect(() => {
        return () => {
            if (restIntervalRef.current) {
                clearInterval(restIntervalRef.current);
            }
        };
    }, []);

    const getRestForExercise = (exerciseId: string): number => {
        const exercise = exercises.find(e => e.id === exerciseId);
        if (exercise?.restSeconds) {
            return parseInt(exercise.restSeconds, 10) || 0;
        }
        if (day?.defaultRest && day.defaultRestSeconds) {
            return parseInt(day.defaultRestSeconds, 10) || 0;
        }
        return 0;
    };

    const toggleExpanded = (exerciseId: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedExercise(prev => (prev === exerciseId ? null : exerciseId));
    };

    const isSetCompleted = (exerciseId: string, setIndex: number) =>
        completedSets[exerciseId]?.has(setIndex) ?? false;

    const toggleSet = (exerciseId: string, setIndex: number, totalSets: number) => {
        setCompletedSets(prev => {
            const current = new Set(prev[exerciseId] ?? []);
            if (current.has(setIndex)) {
                current.delete(setIndex);
            } else {
                current.add(setIndex);
                const rest = getRestForExercise(exerciseId);
                if (rest > 0 && current.size < totalSets) {
                    startRest(rest);
                }
            }
            return { ...prev, [exerciseId]: current };
        });
    };

    const isExerciseDone = (exerciseId: string, totalSets: number) => {
        const done = completedSets[exerciseId];
        return done ? done.size >= totalSets : false;
    };

    const toggleExercise = (exerciseId: string, setList: SetInfo[]) => {
        const allDone = isExerciseDone(exerciseId, setList.length);
        setCompletedSets(prev => ({
            ...prev,
            [exerciseId]: allDone
                ? new Set<number>()
                : new Set(setList.map(s => s.index)),
        }));
    };

    const getWeightForSet = (exerciseId: string, setIndex: number): string | null => {
        const w = exerciseWeights[exerciseId];
        if (!w) {
            return null;
        }
        if (w.uniform) {
            return w.weights[0] || null;
        }
        return w.weights[setIndex] || null;
    };

    const [weightModalExerciseId, setWeightModalExerciseId] = useState<string | null>(null);
    const [weightDifferent, setWeightDifferent] = useState(false);
    const [weightInputs, setWeightInputs] = useState<string[]>([]);

    const openWeightModal = (exerciseId: string) => {
        const exercise = exercises.find(e => e.id === exerciseId);
        if (!exercise) {
            return;
        }
        const setList = buildSetList(exercise);
        const totalSets = setList.length;
        const existing = exerciseWeights[exerciseId];
        if (existing) {
            setWeightDifferent(!existing.uniform);
            setWeightInputs(
                existing.uniform
                    ? Array(totalSets).fill(existing.weights[0] ?? '')
                    : existing.weights.concat(Array(Math.max(0, totalSets - existing.weights.length)).fill('')),
            );
        } else {
            setWeightDifferent(false);
            setWeightInputs(Array(totalSets).fill(''));
        }
        setWeightModalExerciseId(exerciseId);
    };

    const closeWeightModal = () => {
        setWeightModalExerciseId(null);
    };

    const saveWeight = () => {
        if (!weightModalExerciseId) {
            return;
        }
        const exercise = exercises.find(e => e.id === weightModalExerciseId);
        const uniform = !weightDifferent;
        const weights = uniform ? [weightInputs[0] ?? ''] : [...weightInputs];
        setExerciseWeights(prev => ({
            ...prev,
            [weightModalExerciseId]: {
                exerciseId: weightModalExerciseId,
                exerciseName: exercise?.name ?? '',
                uniform,
                weights,
            },
        }));
        closeWeightModal();
    };

    const handleFinish = async () => {
        const success = await finishWorkout({
            id: String(Date.now()),
            planId,
            dayName,
            startedAt: startedAtRef.current,
            finishedAt: new Date().toISOString(),
            durationSeconds: elapsedRef.current,
            exerciseWeights: Object.values(exerciseWeights),
        });
        if (success) {
            navigation.navigate('Home');
        }
    };

    const weightModalExercise = exercises.find(e => e.id === weightModalExerciseId);
    const weightModalSets = weightModalExercise ? buildSetList(weightModalExercise).length : 0;

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} />

            <Header>
                <BackButton onPress={() => navigation.goBack()} accessibilityLabel="Voltar">
                    <MaterialCommunityIcons name="arrow-left" size={24} color={colors.neutral50} />
                </BackButton>
                <TimerText>{formatTime(elapsed)}</TimerText>
                <DayTitle>{dayName}</DayTitle>
                <DaySubtitle>{subtitle}</DaySubtitle>
            </Header>

            <ScrollContent showsVerticalScrollIndicator={false}>
                <Content>
                    {exercises.map(exercise => {
                        const setList = buildSetList(exercise);
                        const schemeLabel = exercise.fixedReps
                            ? `${exercise.sets}x${exercise.reps}`
                            : (exercise.repSchemes ?? []).map(s => `${s.sets}x${s.reps}`).join(' + ');
                        const done = isExerciseDone(exercise.id, setList.length);
                        const isExpanded = expandedExercise === exercise.id;

                        return (
                            <ExerciseAccordion
                                key={exercise.id}
                                $done={done}
                                onPress={() => toggleExpanded(exercise.id)}
                                accessibilityLabel={exercise.name}
                            >
                                <ExerciseHeader>
                                    <Checkbox
                                        $checked={done}
                                        onPress={() => toggleExercise(exercise.id, setList)}
                                        accessibilityLabel={`Marcar ${exercise.name} como concluído`}
                                    >
                                        {done && (
                                            <MaterialCommunityIcons name="check" size={16} color={colors.background} />
                                        )}
                                    </Checkbox>
                                    <ExerciseInfo>
                                        <ExerciseName $done={done}>{exercise.name}</ExerciseName>
                                        <ExerciseMeta>{schemeLabel}</ExerciseMeta>
                                    </ExerciseInfo>
                                    <ExerciseHeaderRight>
                                        <WeightButton
                                            onPress={() => openWeightModal(exercise.id)}
                                            accessibilityLabel={`Carga de ${exercise.name}`}
                                        >
                                            <MaterialCommunityIcons
                                                name="weight-kilogram"
                                                size={spacing.iconSize.md}
                                                color={colors.primary}
                                            />
                                            <WeightButtonLabel>Carga</WeightButtonLabel>
                                        </WeightButton>
                                        <MaterialCommunityIcons
                                            name={isExpanded ? 'chevron-up' : 'chevron-down'}
                                            size={spacing.iconSize.md}
                                            color={colors.neutral400}
                                        />
                                    </ExerciseHeaderRight>
                                </ExerciseHeader>

                                {isExpanded && (
                                    <ExerciseBody>
                                        {setList.map(set => {
                                            const checked = isSetCompleted(exercise.id, set.index);
                                            const weight = getWeightForSet(exercise.id, set.index);
                                            return (
                                                <SetRow
                                                    key={set.index}
                                                    onPress={() => toggleSet(exercise.id, set.index, setList.length)}
                                                    accessibilityLabel={`Série ${set.index + 1}`}
                                                >
                                                    <SetCheckbox $checked={checked}>
                                                        {checked && (
                                                            <MaterialCommunityIcons name="check" size={12} color={colors.background} />
                                                        )}
                                                    </SetCheckbox>
                                                    <SetText $checked={checked}>
                                                        Série {set.index + 1} x {set.reps}
                                                    </SetText>
                                                    <SetWeight $checked={checked}>
                                                        {weight ? `${weight} kg` : '-'}
                                                    </SetWeight>
                                                </SetRow>
                                            );
                                        })}
                                    </ExerciseBody>
                                )}
                            </ExerciseAccordion>
                        );
                    })}
                </Content>
            </ScrollContent>

            <FinishButton onPress={handleFinish} accessibilityLabel="Finalizar treino">
                <FinishButtonText>Finalizar Treino</FinishButtonText>
            </FinishButton>

            <Modal visible={restSeconds > 0} transparent animationType="fade" onRequestClose={closeRest}>
                <Overlay>
                    <RestModal>
                        <RestModalTitle>Descanso</RestModalTitle>
                        <RestModalTimer>{formatRest(restSeconds)}</RestModalTimer>
                        <RestModalSkip onPress={closeRest} accessibilityLabel="Pular descanso">
                            <RestModalSkipText>Pular</RestModalSkipText>
                        </RestModalSkip>
                    </RestModal>
                </Overlay>
            </Modal>

            <Modal visible={weightModalExerciseId !== null} transparent animationType="fade" onRequestClose={closeWeightModal}>
                <Overlay>
                    <WeightModal>
                        <WeightModalTitle>{weightModalExercise?.name}</WeightModalTitle>

                        <WeightToggleRow>
                            <WeightToggleLabel>Cargas diferentes por série</WeightToggleLabel>
                            <Switch
                                value={weightDifferent}
                                onValueChange={value => {
                                    setWeightDifferent(value);
                                    if (!value) {
                                        setWeightInputs(prev => Array(prev.length).fill(prev[0] ?? ''));
                                    }
                                }}
                                trackColor={{ false: colors.neutral500, true: colors.secondaryLight }}
                                thumbColor={weightDifferent ? colors.secondary : colors.neutral300}
                                accessibilityLabel="Cargas diferentes por série"
                            />
                        </WeightToggleRow>

                        {weightDifferent ? (
                            Array.from({ length: weightModalSets }).map((_, i) => (
                                <WeightSetRow key={i}>
                                    <WeightSetLabel>Série {i + 1}</WeightSetLabel>
                                    <WeightInput
                                        placeholder="0"
                                        placeholderTextColor={colors.neutral400}
                                        value={weightInputs[i] ?? ''}
                                        onChangeText={text => {
                                            setWeightInputs(prev => {
                                                const next = [...prev];
                                                next[i] = numericOnly(text);
                                                return next;
                                            });
                                        }}
                                        keyboardType="decimal-pad"
                                        maxLength={6}
                                        accessibilityLabel={`Carga série ${i + 1}`}
                                    />
                                    <WeightUnit>kg</WeightUnit>
                                </WeightSetRow>
                            ))
                        ) : (
                            <WeightSetRow>
                                <WeightSetLabel>Carga</WeightSetLabel>
                                <WeightInput
                                    placeholder="0"
                                    placeholderTextColor={colors.neutral400}
                                    value={weightInputs[0] ?? ''}
                                    onChangeText={text => {
                                        const val = numericOnly(text);
                                        setWeightInputs(prev => Array(prev.length).fill(val));
                                    }}
                                    keyboardType="decimal-pad"
                                    maxLength={6}
                                    accessibilityLabel="Carga"
                                />
                                <WeightUnit>kg</WeightUnit>
                            </WeightSetRow>
                        )}

                        <WeightSaveButton onPress={saveWeight} accessibilityLabel="Salvar carga">
                            <WeightSaveButtonText>Salvar</WeightSaveButtonText>
                        </WeightSaveButton>
                    </WeightModal>
                </Overlay>
            </Modal>
        </Container>
    );
};

export default ActiveWorkoutScreen;
