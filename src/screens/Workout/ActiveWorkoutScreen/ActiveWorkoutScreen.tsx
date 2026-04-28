import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LayoutAnimation, Modal, Platform, StatusBar, Switch, UIManager } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import { spacing } from '../../../constants';
import type { ActiveWorkoutScreenProps } from '../../../navigation/types';
import { useWorkoutStore } from '../../../stores/workoutStore';
import type { Exercise, ExerciseWeight } from '../../../types/workout';
import {
    BackButton,
    BottomControlButton,
    BottomControlText,
    BottomControlsRow,
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
    ExerciseTabButton,
    ExerciseTabText,
    ExerciseTabsRow,
    Header,
    HeaderCenter,
    HeaderLeft,
    HeaderRight,
    HeaderRow,
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
    WorkoutMetaSection,
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

const buildSchemeLabel = (exercise: Exercise): string => {
    if (exercise.fixedReps) {
        return `${exercise.sets}x${exercise.reps}`;
    }
    return (exercise.repSchemes ?? []).map(s => `${s.sets}x${s.reps}`).join(' + ');
};

type ExerciseGroup = {
    id: string;
    isPair: boolean;
    exercises: Exercise[];
};

const buildGroups = (exercises: Exercise[]): ExerciseGroup[] => {
    const groups: ExerciseGroup[] = [];
    let i = 0;
    while (i < exercises.length) {
        const ex = exercises[i];
        const next = exercises[i + 1];
        if (ex.conjugatedId && next && next.id === ex.conjugatedId) {
            groups.push({ id: ex.id, isPair: true, exercises: [ex, next] });
            i += 2;
        } else {
            groups.push({ id: ex.id, isPair: false, exercises: [ex] });
            i += 1;
        }
    }
    return groups;
};

type GroupSetRow = { index: number; reps: (string | null)[] };

const buildGroupSetList = (group: ExerciseGroup): GroupSetRow[] => {
    const lists = group.exercises.map(buildSetList);
    const maxLen = Math.max(...lists.map(l => l.length), 0);
    const rows: GroupSetRow[] = [];
    for (let i = 0; i < maxLen; i++) {
        rows.push({
            index: i,
            reps: lists.map(l => l[i]?.reps ?? null),
        });
    }
    return rows;
};

const buildGroupSchemeLabel = (group: ExerciseGroup): string => {
    if (!group.isPair) {
        return buildSchemeLabel(group.exercises[0]);
    }
    const [a, b] = group.exercises;
    if (a.fixedReps && b.fixedReps && a.sets === b.sets) {
        return `${a.sets}x ${a.reps} + ${b.reps}`;
    }
    return `${buildSchemeLabel(a)}  ·  ${buildSchemeLabel(b)}`;
};

const ActiveWorkoutScreen: React.FC<ActiveWorkoutScreenProps> = ({ route, navigation }) => {
    const { colors } = useTheme();
    const { planId, dayName } = route.params;
    const insets = useSafeAreaInsets();

    const plans = useWorkoutStore(state => state.plans);
    const sessions = useWorkoutStore(state => state.sessions);
    const activeWorkout = useWorkoutStore(state => state.activeWorkout);
    const finishWorkout = useWorkoutStore(state => state.finishWorkout);
    const ensureActiveWorkout = useWorkoutStore(state => state.ensureActiveWorkout);
    const toggleActiveSet = useWorkoutStore(state => state.toggleActiveSet);
    const toggleActiveExercise = useWorkoutStore(state => state.toggleActiveExercise);
    const setActiveExerciseWeight = useWorkoutStore(state => state.setActiveExerciseWeight);
    const pauseActiveWorkout = useWorkoutStore(state => state.pauseActiveWorkout);
    const resumeActiveWorkout = useWorkoutStore(state => state.resumeActiveWorkout);
    const cancelActiveWorkout = useWorkoutStore(state => state.cancelActiveWorkout);

    useEffect(() => {
        ensureActiveWorkout(planId, dayName);
    }, [dayName, ensureActiveWorkout, planId]);

    const currentPlanId = activeWorkout?.planId ?? planId;
    const currentDayName = activeWorkout?.dayName ?? dayName;

    const plan = plans.find(p => p.id === currentPlanId);
    const realDay = plan?.days.find(d => d.name === currentDayName);
    const exercises = realDay?.exercises ?? [];
    const workoutDescription = realDay?.description?.trim() ?? '';

    const groups = useMemo(() => buildGroups(exercises), [exercises]);

    // Pre-fill weights from last session of this plan+day
    const buildInitialWeights = (): Record<string, ExerciseWeight> => {
        const lastSession = sessions.find(
            s => s.planId === currentPlanId && s.dayName === currentDayName,
        );
        if (!lastSession) { return {}; }

        const initial: Record<string, ExerciseWeight> = {};
        for (const exercise of exercises) {
            const prev = lastSession.exerciseWeights.find(
                w => w.exerciseName === exercise.name,
            );
            if (prev) {
                initial[exercise.id] = {
                    exerciseId: exercise.id,
                    exerciseName: exercise.name,
                    uniform: prev.uniform,
                    weights: prev.weights,
                };
            }
        }
        return initial;
    };

    useEffect(() => {
        if (!activeWorkout) {
            return;
        }

        const hasStoredWeights = Object.keys(activeWorkout.exerciseWeights).length > 0;
        if (hasStoredWeights) {
            return;
        }

        const initial = buildInitialWeights();
        Object.values(initial).forEach(weight => {
            setActiveExerciseWeight(
                weight.exerciseId,
                weight.exerciseName,
                weight.uniform,
                weight.weights,
            );
        });
    }, [
        activeWorkout,
        currentDayName,
        currentPlanId,
        exercises,
        sessions,
        setActiveExerciseWeight,
    ]);

    const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

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
        if (realDay?.defaultRest && realDay.defaultRestSeconds) {
            return parseInt(realDay.defaultRestSeconds, 10) || 0;
        }
        return 0;
    };

    const toggleExpanded = (groupId: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedGroup(prev => (prev === groupId ? null : groupId));
    };

    const isSetCompleted = (exerciseId: string, setIndex: number) =>
        activeWorkout?.completedSets[exerciseId]?.includes(setIndex) ?? false;

    const isGroupSetCompleted = (group: ExerciseGroup, setIndex: number) => {
        const exercisesWithSet = group.exercises.filter(
            ex => setIndex < buildSetList(ex).length,
        );
        if (exercisesWithSet.length === 0) {
            return false;
        }
        return exercisesWithSet.every(ex => isSetCompleted(ex.id, setIndex));
    };

    const toggleGroupSet = (group: ExerciseGroup, setIndex: number, totalSets: number) => {
        const exercisesWithSet = group.exercises.filter(
            ex => setIndex < buildSetList(ex).length,
        );
        if (exercisesWithSet.length === 0) {
            return;
        }
        const allDone = exercisesWithSet.every(ex => isSetCompleted(ex.id, setIndex));
        const target = !allDone;

        exercisesWithSet.forEach(ex => {
            const isDone = isSetCompleted(ex.id, setIndex);
            if (isDone !== target) {
                toggleActiveSet(ex.id, setIndex, buildSetList(ex).length);
            }
        });

        if (target && setIndex < totalSets - 1) {
            const rest = getRestForExercise(group.exercises[0].id);
            if (rest > 0) {
                startRest(rest);
            }
        }
    };

    const isExerciseDone = (exerciseId: string, totalSets: number) => {
        const done = activeWorkout?.completedSets[exerciseId] ?? [];
        return done.length >= totalSets;
    };

    const isGroupDone = (group: ExerciseGroup) =>
        group.exercises.every(ex => isExerciseDone(ex.id, buildSetList(ex).length));

    const toggleGroup = (group: ExerciseGroup) => {
        const groupDone = isGroupDone(group);
        const target = !groupDone;

        group.exercises.forEach(ex => {
            const setIndexes = buildSetList(ex).map(s => s.index);
            const exDone = isExerciseDone(ex.id, setIndexes.length);
            if (exDone !== target) {
                toggleActiveExercise(ex.id, setIndexes);
            }
        });
    };

    const getWeightForSet = (exerciseId: string, setIndex: number): string | null => {
        const w = activeWorkout?.exerciseWeights[exerciseId];
        if (!w) {
            return null;
        }
        if (w.uniform) {
            return w.weights[0] || null;
        }
        return w.weights[setIndex] || null;
    };

    const buildGroupWeightLabel = (group: ExerciseGroup, setIndex: number): string => {
        const values = group.exercises.map(ex => {
            if (setIndex >= buildSetList(ex).length) {
                return null;
            }
            return getWeightForSet(ex.id, setIndex);
        });
        if (values.every(v => !v)) {
            return '-';
        }
        return `${values.map(v => v ?? '-').join(' + ')} kg`;
    };

    const [weightModalGroupId, setWeightModalGroupId] = useState<string | null>(null);
    const [weightModalActiveExerciseId, setWeightModalActiveExerciseId] = useState<string | null>(null);
    const [weightInputsByExercise, setWeightInputsByExercise] = useState<Record<string, string[]>>({});
    const [weightDifferentByExercise, setWeightDifferentByExercise] = useState<Record<string, boolean>>({});

    const openWeightModal = (group: ExerciseGroup) => {
        const inputs: Record<string, string[]> = {};
        const different: Record<string, boolean> = {};

        group.exercises.forEach(ex => {
            const totalSets = buildSetList(ex).length;
            const existing = activeWorkout?.exerciseWeights[ex.id];
            if (existing) {
                different[ex.id] = !existing.uniform;
                inputs[ex.id] = existing.uniform
                    ? Array(totalSets).fill(existing.weights[0] ?? '')
                    : existing.weights.concat(
                          Array(Math.max(0, totalSets - existing.weights.length)).fill(''),
                      );
            } else {
                different[ex.id] = false;
                inputs[ex.id] = Array(totalSets).fill('');
            }
        });

        setWeightInputsByExercise(inputs);
        setWeightDifferentByExercise(different);
        setWeightModalActiveExerciseId(group.exercises[0].id);
        setWeightModalGroupId(group.id);
    };

    const closeWeightModal = () => {
        setWeightModalGroupId(null);
        setWeightModalActiveExerciseId(null);
        setWeightInputsByExercise({});
        setWeightDifferentByExercise({});
    };

    const saveWeight = () => {
        const group = groups.find(g => g.id === weightModalGroupId);
        if (!group) {
            return;
        }

        group.exercises.forEach(ex => {
            const isDifferent = weightDifferentByExercise[ex.id] ?? false;
            const inputs = weightInputsByExercise[ex.id] ?? [];
            const uniform = !isDifferent;
            const weights = uniform ? [inputs[0] ?? ''] : [...inputs];
            setActiveExerciseWeight(ex.id, ex.name, uniform, weights);
        });

        closeWeightModal();
    };

    const updateActiveExerciseDifferent = (value: boolean) => {
        const exId = weightModalActiveExerciseId;
        if (!exId) {
            return;
        }
        setWeightDifferentByExercise(prev => ({ ...prev, [exId]: value }));
        if (!value) {
            setWeightInputsByExercise(prev => {
                const current = prev[exId] ?? [];
                const filled = Array(current.length).fill(current[0] ?? '');
                return { ...prev, [exId]: filled };
            });
        }
    };

    const updateActiveExerciseInput = (index: number, text: string) => {
        const exId = weightModalActiveExerciseId;
        if (!exId) {
            return;
        }
        const isDifferent = weightDifferentByExercise[exId] ?? false;
        const cleaned = numericOnly(text);
        setWeightInputsByExercise(prev => {
            const current = prev[exId] ?? [];
            const next = isDifferent
                ? current.map((v, i) => (i === index ? cleaned : v))
                : Array(current.length).fill(cleaned);
            return { ...prev, [exId]: next };
        });
    };

    const [isSaving, setIsSaving] = useState(false);

    const handleFinish = async () => {
        if (isSaving || !activeWorkout) { return; }
        setIsSaving(true);
        const success = await finishWorkout({
            id: String(Date.now()),
            planId: activeWorkout.planId,
            dayName: activeWorkout.dayName,
            startedAt: activeWorkout.startedAt,
            finishedAt: new Date().toISOString(),
            durationSeconds: activeWorkout.elapsedSeconds,
            exerciseWeights: Object.values(activeWorkout.exerciseWeights),
        });
        if (success) {
            navigation.navigate('Home');
        } else {
            setIsSaving(false);
        }
    };

    const handlePauseResume = () => {
        if (!activeWorkout) {
            return;
        }

        if (activeWorkout.isPaused) {
            resumeActiveWorkout();
            return;
        }

        pauseActiveWorkout();
    };

    const handleCancelWorkout = () => {
        cancelActiveWorkout();
        navigation.navigate('Home');
    };

    const weightModalGroup = groups.find(g => g.id === weightModalGroupId);
    const activeWeightExercise = weightModalGroup?.exercises.find(
        ex => ex.id === weightModalActiveExerciseId,
    );
    const activeWeightSets = activeWeightExercise ? buildSetList(activeWeightExercise).length : 0;
    const activeWeightDifferent = activeWeightExercise
        ? weightDifferentByExercise[activeWeightExercise.id] ?? false
        : false;
    const activeWeightInputs = activeWeightExercise
        ? weightInputsByExercise[activeWeightExercise.id] ?? []
        : [];

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} />

            <Header>
                <HeaderRow>
                    <HeaderLeft>
                        <BackButton
                            onPress={() => navigation.goBack()}
                            accessibilityLabel="Voltar"
                        >
                            <MaterialCommunityIcons name="arrow-left" size={22} color={colors.onSecondary} />
                        </BackButton>
                    </HeaderLeft>

                    <HeaderCenter>
                        <TimerText>{formatTime(activeWorkout?.elapsedSeconds ?? 0)}</TimerText>
                    </HeaderCenter>

                    <HeaderRight />
                </HeaderRow>
            </Header>

            <WorkoutMetaSection>
                <DayTitle numberOfLines={1}>{currentDayName}</DayTitle>
                {workoutDescription ? (
                    <DaySubtitle>{workoutDescription}</DaySubtitle>
                ) : null}
            </WorkoutMetaSection>

            <ScrollContent showsVerticalScrollIndicator={false}>
                <Content>
                    {groups.map(group => {
                        const setList = buildGroupSetList(group);
                        const schemeLabel = buildGroupSchemeLabel(group);
                        const done = isGroupDone(group);
                        const isExpanded = expandedGroup === group.id;
                        const groupName = group.exercises.map(e => e.name).join(' + ');

                        return (
                            <ExerciseAccordion
                                key={group.id}
                                $done={done}
                                onPress={() => toggleExpanded(group.id)}
                                accessibilityLabel={groupName}
                            >
                                <ExerciseHeader>
                                    <Checkbox
                                        $checked={done}
                                        onPress={() => toggleGroup(group)}
                                        accessibilityLabel={`Marcar ${groupName} como concluído`}
                                    >
                                        {done && (
                                            <MaterialCommunityIcons name="check" size={16} color={colors.textInverse} />
                                        )}
                                    </Checkbox>
                                    <ExerciseInfo>
                                        <ExerciseName $done={done}>{groupName}</ExerciseName>
                                        <ExerciseMeta>{schemeLabel}</ExerciseMeta>
                                    </ExerciseInfo>
                                    <ExerciseHeaderRight>
                                        <WeightButton
                                            onPress={() => openWeightModal(group)}
                                            accessibilityLabel={`Carga de ${groupName}`}
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
                                        {setList.map((set, setIdx) => {
                                            const checked = isGroupSetCompleted(group, set.index);
                                            const weightLabel = buildGroupWeightLabel(group, set.index);
                                            const rest = getRestForExercise(group.exercises[0].id);
                                            const isLastSet = setIdx === setList.length - 1;
                                            const repsLabel = set.reps
                                                .map(r => r ?? '-')
                                                .join(' + ');
                                            return (
                                                <SetRow
                                                    key={set.index}
                                                    onPress={() => toggleGroupSet(group, set.index, setList.length)}
                                                    accessibilityLabel={`Série ${set.index + 1}`}
                                                >
                                                    <SetCheckbox $checked={checked}>
                                                        {checked && (
                                                            <MaterialCommunityIcons name="check" size={12} color={colors.textInverse} />
                                                        )}
                                                    </SetCheckbox>
                                                    <SetText $checked={checked}>
                                                        Série {set.index + 1} x {repsLabel}
                                                        {rest > 0 && !isLastSet ? `  •  Descanso: ${rest}s` : ''}
                                                    </SetText>
                                                    <SetWeight $checked={checked}>
                                                        {weightLabel}
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

            <BottomControlsRow $bottomInset={insets.bottom}>
                <BottomControlButton
                    onPress={handlePauseResume}
                    $variant="neutral"
                    accessibilityLabel={activeWorkout?.isPaused ? 'Retomar treino' : 'Pausar treino'}
                >
                    <BottomControlText>
                        {activeWorkout?.isPaused ? 'Retomar' : 'Pause'}
                    </BottomControlText>
                </BottomControlButton>

                <BottomControlButton
                    onPress={handleFinish}
                    $variant="primary"
                    $disabled={isSaving}
                    disabled={isSaving}
                    accessibilityLabel="Finalizar treino"
                >
                    <BottomControlText $variant="primary">
                        {isSaving ? 'Salvando...' : 'Finalizar'}
                    </BottomControlText>
                </BottomControlButton>

                <BottomControlButton
                    onPress={handleCancelWorkout}
                    $variant="danger"
                    accessibilityLabel="Zerar treino"
                >
                    <BottomControlText $variant="danger">Zerar</BottomControlText>
                </BottomControlButton>
            </BottomControlsRow>

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

            <Modal visible={weightModalGroupId !== null} transparent animationType="fade" onRequestClose={closeWeightModal}>
                <Overlay>
                    <WeightModal>
                        <WeightModalTitle>
                            {weightModalGroup?.exercises.map(e => e.name).join(' + ')}
                        </WeightModalTitle>

                        {weightModalGroup?.isPair && (
                            <ExerciseTabsRow>
                                {weightModalGroup.exercises.map(ex => {
                                    const isActive = weightModalActiveExerciseId === ex.id;
                                    return (
                                        <ExerciseTabButton
                                            key={ex.id}
                                            $active={isActive}
                                            onPress={() => setWeightModalActiveExerciseId(ex.id)}
                                            accessibilityLabel={`Selecionar ${ex.name}`}
                                        >
                                            <ExerciseTabText $active={isActive}>{ex.name}</ExerciseTabText>
                                        </ExerciseTabButton>
                                    );
                                })}
                            </ExerciseTabsRow>
                        )}

                        <WeightToggleRow>
                            <WeightToggleLabel>Cargas diferentes por série</WeightToggleLabel>
                            <Switch
                                value={activeWeightDifferent}
                                onValueChange={updateActiveExerciseDifferent}
                                trackColor={{ false: colors.neutral500, true: colors.secondaryLight }}
                                thumbColor={activeWeightDifferent ? colors.secondary : colors.neutral300}
                                accessibilityLabel="Cargas diferentes por série"
                            />
                        </WeightToggleRow>

                        {activeWeightDifferent ? (
                            Array.from({ length: activeWeightSets }).map((_, i) => (
                                <WeightSetRow key={i}>
                                    <WeightSetLabel>Série {i + 1}</WeightSetLabel>
                                    <WeightInput
                                        placeholder="0"
                                        placeholderTextColor={colors.neutral400}
                                        value={activeWeightInputs[i] ?? ''}
                                        onChangeText={text => updateActiveExerciseInput(i, text)}
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
                                    value={activeWeightInputs[0] ?? ''}
                                    onChangeText={text => updateActiveExerciseInput(0, text)}
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
