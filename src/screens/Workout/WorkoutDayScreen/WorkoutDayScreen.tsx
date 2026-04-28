import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StatusBar, Switch } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import { spacing } from '../../../constants';
import type { WorkoutDayScreenProps } from '../../../navigation/types';
import { useWorkoutStore } from '../../../stores/workoutStore';
import type { Exercise } from '../../../types/workout';
import {
    AddExerciseButton,
    AddExerciseButtonText,
    BackButton,
    CancelButton,
    CancelButtonText,
    ConjugatedHookBottom,
    ConjugatedHookTop,
    ConjugatedRail,
    ConjugatedSpacer,
    ConfirmButton,
    ConfirmButtonText,
    Container,
    Content,
    DeleteButton,
    Dialog,
    DialogContent,
    DialogHalfRow,
    DialogInput,
    DialogInputDynamic,
    DialogInputGroup,
    DialogLabel,
    DialogRow,
    DialogScroll,
    DialogTitle,
    ExerciseCard,
    ExerciseCardContainer,
    ExerciseCardRow,
    ExerciseItemRow,
    ExerciseMeta,
    ExerciseMetaRow,
    ExerciseName,
    ExerciseNotesText,
    ExerciseTag,
    ExerciseTagsRow,
    ExerciseTagText,
    Header,
    HeaderTitle,
    Overlay,
    RestInput,
    RestInputWrapper,
    RestUnit,
    SchemeActionButton,
    SchemeFields,
    SchemeList,
    SchemeRow,
    ScrollContent,
    ToggleLabel,
    ToggleRow,
    ToggleSection,
} from './WorkoutDayScreen.styles';

type RepSchemeInput = {
    id: string;
    sets: string;
    reps: string;
};

type DialogMode = 'none' | 'main' | 'conjugated';

const numericOnly = (text: string) => text.replace(/[^0-9]/g, '');
const weightInputOnly = (text: string) => {
    const normalized = text.replace(',', '.').replace(/[^0-9.]/g, '');
    const [integerPart = '', ...decimals] = normalized.split('.');
    const decimalPart = decimals.join('');
    return decimalPart ? `${integerPart}.${decimalPart.slice(0, 2)}` : integerPart;
};

const WorkoutDayScreen: React.FC<WorkoutDayScreenProps> = ({ route, navigation }) => {
    const { colors } = useTheme();
    const { day } = route.params;

    const draftDay = useWorkoutStore(state =>
        state.draft?.days.find(d => d.name === day),
    );
    const updateDraftDay = useWorkoutStore(state => state.updateDraftDay);

    const exercises = draftDay?.exercises ?? [];
    const description = draftDay?.description ?? '';
    const defaultRest = draftDay?.defaultRest ?? false;
    const defaultRestSeconds = draftDay?.defaultRestSeconds ?? '';

    const setDescription = (value: string) =>
        updateDraftDay(day, d => ({ ...d, description: value || null }));
    const setDefaultRest = (value: boolean) =>
        updateDraftDay(day, d => ({ ...d, defaultRest: value }));
    const setDefaultRestSeconds = (value: string) =>
        updateDraftDay(day, d => ({ ...d, defaultRestSeconds: value }));
    const addExercises = (items: Exercise[]) =>
        updateDraftDay(day, d => ({ ...d, exercises: [...d.exercises, ...items] }));

    const [dialogMode, setDialogMode] = useState<DialogMode>('none');
    const [pendingExercise, setPendingExercise] = useState<Exercise | null>(null);

    const [inputName, setInputName] = useState('');
    const [inputSets, setInputSets] = useState('');
    const [inputReps, setInputReps] = useState('');
    const [inputLoad, setInputLoad] = useState('');
    const [inputRest, setInputRest] = useState('');
    const [inputNotes, setInputNotes] = useState('');
    const [inputFixedReps, setInputFixedReps] = useState(true);
    const [inputIsConjugated, setInputIsConjugated] = useState(false);
    const [inputRepSchemes, setInputRepSchemes] = useState<RepSchemeInput[]>([
        { id: String(Date.now()), sets: '', reps: '' },
    ]);
    const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);

    const buildEmptyScheme = (suffix?: string): RepSchemeInput => ({
        id: `${Date.now()}-${suffix ?? '0'}`,
        sets: '',
        reps: '',
    });

    const resetInputs = () => {
        setInputName('');
        setInputSets('');
        setInputReps('');
        setInputLoad('');
        setInputRest('');
        setInputNotes('');
        setInputFixedReps(true);
        setInputIsConjugated(false);
        setInputRepSchemes([buildEmptyScheme()]);
        setEditingExerciseId(null);
    };

    const openMainDialog = () => {
        resetInputs();
        setDialogMode('main');
    };

    const closeDialog = () => {
        setDialogMode('none');
        setPendingExercise(null);
        resetInputs();
    };

    const openEditDialog = (exercise: Exercise) => {
        setEditingExerciseId(exercise.id);
        setDialogMode('main');
        setPendingExercise(null);
        setInputName(exercise.name);
        setInputLoad(exercise.loadKg ?? '');
        setInputSets(exercise.sets);
        setInputReps(exercise.reps);
        setInputRest(exercise.restSeconds ?? '');
        setInputNotes(exercise.notes ?? '');
        setInputIsConjugated(Boolean(exercise.conjugatedId));
        setInputFixedReps(exercise.fixedReps);
        if (exercise.fixedReps) {
            setInputRepSchemes([buildEmptyScheme()]);
            return;
        }

        const repSchemes = (exercise.repSchemes ?? []).length > 0
            ? (exercise.repSchemes ?? []).map((scheme, index) => ({
                id: `${exercise.id}-${index}`,
                sets: scheme.sets,
                reps: scheme.reps,
            }))
            : [{ id: `${exercise.id}-0`, sets: exercise.sets, reps: exercise.reps }];
        setInputRepSchemes(repSchemes);
    };

    const updateRepScheme = (id: string, key: 'sets' | 'reps', value: string) => {
        setInputRepSchemes(prev =>
            prev.map(item => (item.id === id ? { ...item, [key]: value } : item)),
        );
    };

    const addRepSchemeRow = () => {
        setInputRepSchemes(prev => [...prev, buildEmptyScheme(String(prev.length))]);
    };

    const removeRepSchemeRow = (id: string) => {
        setInputRepSchemes(prev => prev.filter(item => item.id !== id));
    };

    const buildExercise = (id: string): Exercise => {
        const validSchemes = inputRepSchemes
            .map(item => ({ sets: item.sets.trim(), reps: item.reps.trim() }))
            .filter(item => item.sets && item.reps);

        if (inputFixedReps) {
            return {
                id,
                name: inputName.trim(),
                loadKg: inputLoad.trim() || undefined,
                sets: inputSets.trim(),
                reps: inputReps.trim(),
                fixedReps: true,
                restSeconds: defaultRest
                    ? defaultRestSeconds || undefined
                    : inputRest.trim() || undefined,
                notes: inputNotes.trim() || undefined,
            };
        }

        const first = validSchemes[0] ?? { sets: '', reps: '' };
        return {
            id,
            name: inputName.trim(),
            loadKg: inputLoad.trim() || undefined,
            sets: first.sets,
            reps: first.reps,
            fixedReps: false,
            repSchemes: validSchemes,
            restSeconds: defaultRest
                ? defaultRestSeconds || undefined
                : inputRest.trim() || undefined,
            notes: inputNotes.trim() || undefined,
        };
    };

    const hasValidCustomScheme = inputRepSchemes.some(
        item => item.sets.trim() && item.reps.trim(),
    );

    const hasRequiredFields = inputName.trim() && (
        inputFixedReps
            ? inputSets.trim() && inputReps.trim()
            : hasValidCustomScheme
    );

    const handleMainConfirm = () => {
        if (!hasRequiredFields) {
            return;
        }

        const exercise = buildExercise(String(Date.now()));

        if (inputIsConjugated) {
            setPendingExercise(exercise);
            resetInputs();
            setInputFixedReps(true);
            setDialogMode('conjugated');
            return;
        }

        addExercises([exercise]);
        closeDialog();
    };

    const handleConjugatedConfirm = () => {
        if (!hasRequiredFields || !pendingExercise) {
            return;
        }

        const conjugatedId = String(Date.now());
        const conjugated = buildExercise(conjugatedId);

        addExercises([{ ...pendingExercise, conjugatedId }, conjugated]);
        closeDialog();
    };

    const removeExercise = (id: string) => {
        updateDraftDay(day, d => ({
            ...d,
            exercises: d.exercises
                .filter(e => e.id !== id)
                .map(e => (e.conjugatedId === id ? { ...e, conjugatedId: undefined } : e)),
        }));
    };

    const updateExercise = (id: string, updater: (exercise: Exercise) => Exercise) => {
        updateDraftDay(day, d => ({
            ...d,
            exercises: d.exercises.map(exercise =>
                exercise.id === id ? updater(exercise) : exercise,
            ),
        }));
    };

    const isEditingExercise = editingExerciseId !== null;
    const isDialogOpen = dialogMode !== 'none';
    const isConjugatedDialog = dialogMode === 'conjugated';
    const handleConfirm = isConjugatedDialog ? handleConjugatedConfirm : handleMainConfirm;

    const handleMainConfirmWithEdit = () => {
        if (isEditingExercise) {
            if (!hasRequiredFields) {
                return;
            }

            updateExercise(isEditingExercise, current => ({
                ...buildExercise(current.id),
                conjugatedId: current.conjugatedId,
            }));
            closeDialog();
            return;
        }

        handleMainConfirm();
    };

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} />

            <Header>
                <BackButton onPress={() => navigation.goBack()} accessibilityLabel="Voltar">
                    <MaterialCommunityIcons name="arrow-left" size={24} color={colors.onSecondary} />
                </BackButton>
                <HeaderTitle>{day}</HeaderTitle>
            </Header>

            <ScrollContent showsVerticalScrollIndicator={false}>
                <Content>
                    <DialogInputGroup style={{ marginBottom: spacing.base }}>
                        <DialogLabel>Descrição (opcional)</DialogLabel>
                        <DialogInput
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Ex: Peito e Bíceps"
                            placeholderTextColor={colors.neutral500}
                            autoCapitalize="sentences"
                        />
                    </DialogInputGroup>

                    <ToggleSection>
                        <ToggleRow>
                            <ToggleLabel>Descanso padrao entre exercicios</ToggleLabel>
                            <Switch
                                value={defaultRest}
                                onValueChange={setDefaultRest}
                                trackColor={{ false: colors.neutral500, true: colors.secondaryLight }}
                                thumbColor={defaultRest ? colors.secondary : colors.neutral300}
                                accessibilityLabel="Ativar descanso padrao"
                            />
                        </ToggleRow>
                        {defaultRest && (
                            <RestInputWrapper>
                                <RestInput
                                    placeholder="0"
                                    placeholderTextColor={colors.neutral400}
                                    value={defaultRestSeconds}
                                    onChangeText={text => setDefaultRestSeconds(numericOnly(text))}
                                    keyboardType="number-pad"
                                    maxLength={4}
                                    accessibilityLabel="Tempo de descanso padrao em segundos"
                                />
                                <RestUnit>segundos</RestUnit>
                            </RestInputWrapper>
                        )}
                    </ToggleSection>

                    {exercises.map((exercise, idx) => {
                        const isConjugatedFirst = Boolean(exercise.conjugatedId);
                        const isConjugatedSecond = idx > 0 && exercises[idx - 1]?.conjugatedId === exercise.id;
                        const schemeLabel = exercise.fixedReps
                            ? `${exercise.sets}x${exercise.reps || '?'}`
                            : (exercise.repSchemes ?? []).map(item => `${item.sets}x${item.reps}`).join(' + ');

                        return (
                            <ExerciseItemRow key={exercise.id}>
                                <ConjugatedRail>
                                    {isConjugatedFirst ? (
                                        <>
                                            <ConjugatedSpacer />
                                            <ConjugatedHookTop />
                                        </>
                                    ) : null}
                                    {isConjugatedSecond ? (
                                        <>
                                            <ConjugatedHookBottom />
                                            <ConjugatedSpacer />
                                        </>
                                    ) : null}
                                </ConjugatedRail>

                                <ExerciseCardContainer>
                                    <ExerciseCard>
                                        <ExerciseCardRow>
                                            <MaterialCommunityIcons
                                                name="dumbbell"
                                                size={spacing.iconSize.sm}
                                                color={colors.secondary}
                                            />
                                            <ExerciseName>{exercise.name}</ExerciseName>
                                            <DeleteButton
                                                onPress={() => openEditDialog(exercise)}
                                                accessibilityLabel={`Editar ${exercise.name}`}
                                            >
                                                <MaterialCommunityIcons
                                                    name="pencil-outline"
                                                    size={spacing.iconSize.sm}
                                                    color={colors.secondary}
                                                />
                                            </DeleteButton>
                                            <DeleteButton
                                                onPress={() => removeExercise(exercise.id)}
                                                accessibilityLabel={`Remover ${exercise.name}`}
                                            >
                                                <MaterialCommunityIcons
                                                    name="trash-can-outline"
                                                    size={spacing.iconSize.sm}
                                                    color={colors.error}
                                                />
                                            </DeleteButton>
                                        </ExerciseCardRow>

                                        <ExerciseMetaRow>
                                            <ExerciseMeta>
                                                {schemeLabel}
                                                {exercise.loadKg ? ` · ${exercise.loadKg}kg` : ''}
                                                {exercise.restSeconds ? ` · ${exercise.restSeconds}s descanso` : ''}
                                            </ExerciseMeta>
                                            <ExerciseTagsRow>
                                                {!exercise.fixedReps ? (
                                                    <ExerciseTag $variant="dropset">
                                                        <ExerciseTagText $variant="dropset">drop set</ExerciseTagText>
                                                    </ExerciseTag>
                                                ) : null}
                                                {isConjugatedFirst ? (
                                                    <ExerciseTag $variant="conjugated">
                                                        <ExerciseTagText $variant="conjugated">conjugado</ExerciseTagText>
                                                    </ExerciseTag>
                                                ) : null}
                                            </ExerciseTagsRow>
                                        </ExerciseMetaRow>

                                        {exercise.notes ? <ExerciseNotesText>{exercise.notes}</ExerciseNotesText> : null}
                                    </ExerciseCard>
                                </ExerciseCardContainer>
                            </ExerciseItemRow>
                        );
                    })}

                    <AddExerciseButton onPress={openMainDialog} accessibilityLabel="Adicionar serie">
                        <MaterialCommunityIcons name="plus" size={spacing.iconSize.md} color={colors.textInverse} />
                        <AddExerciseButtonText>Adicionar Serie</AddExerciseButtonText>
                    </AddExerciseButton>
                </Content>
            </ScrollContent>

            <Modal visible={isDialogOpen} transparent animationType="fade" onRequestClose={closeDialog}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    <Overlay>
                        <Dialog onStartShouldSetResponder={() => true}>
                            <DialogScroll keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                                <DialogContent>
                                    <DialogTitle>{isConjugatedDialog ? 'Exercicio Conjugado' : 'Nova Serie'}</DialogTitle>

                                    <DialogInput
                                        placeholder="Nome do exercicio"
                                        placeholderTextColor={colors.neutral400}
                                        value={inputName}
                                        onChangeText={setInputName}
                                        accessibilityLabel="Nome do exercicio"
                                    />

                                    <DialogInput
                                        placeholder="Carga (kg)"
                                        placeholderTextColor={colors.neutral400}
                                        value={inputLoad}
                                        onChangeText={text => setInputLoad(weightInputOnly(text))}
                                        keyboardType="decimal-pad"
                                        maxLength={6}
                                        accessibilityLabel="Carga em quilos"
                                    />

                                    {inputFixedReps ? (
                                        <DialogHalfRow>
                                            <DialogInputGroup>
                                                <DialogLabel>Series</DialogLabel>
                                                <DialogInput
                                                    placeholder="3"
                                                    placeholderTextColor={colors.neutral400}
                                                    value={inputSets}
                                                    onChangeText={text => setInputSets(numericOnly(text))}
                                                    keyboardType="number-pad"
                                                    maxLength={3}
                                                    accessibilityLabel="Numero de series"
                                                />
                                            </DialogInputGroup>
                                            <DialogInputGroup>
                                                <DialogLabel>Repeticoes</DialogLabel>
                                                <DialogInput
                                                    placeholder="12"
                                                    placeholderTextColor={colors.neutral400}
                                                    value={inputReps}
                                                    onChangeText={text => setInputReps(numericOnly(text))}
                                                    keyboardType="number-pad"
                                                    maxLength={3}
                                                    accessibilityLabel="Numero de repeticoes"
                                                />
                                            </DialogInputGroup>
                                        </DialogHalfRow>
                                    ) : (
                                        <SchemeList>
                                            <DialogHalfRow>
                                                <DialogLabel>Series</DialogLabel>
                                                <DialogLabel>Repeticoes</DialogLabel>
                                            </DialogHalfRow>
                                            {inputRepSchemes.map((scheme, index) => (
                                                <SchemeRow key={scheme.id}>
                                                    <SchemeFields>
                                                        <DialogInputDynamic
                                                            placeholder="1"
                                                            placeholderTextColor={colors.neutral400}
                                                            value={scheme.sets}
                                                            onChangeText={text => updateRepScheme(scheme.id, 'sets', numericOnly(text))}
                                                            keyboardType="number-pad"
                                                            maxLength={3}
                                                            accessibilityLabel={`Series ${index + 1}`}
                                                        />
                                                        <DialogInputDynamic
                                                            placeholder="12"
                                                            placeholderTextColor={colors.neutral400}
                                                            value={scheme.reps}
                                                            onChangeText={text => updateRepScheme(scheme.id, 'reps', numericOnly(text))}
                                                            keyboardType="number-pad"
                                                            maxLength={3}
                                                            accessibilityLabel={`Repeticoes ${index + 1}`}
                                                        />
                                                    </SchemeFields>

                                                    {index === 0 ? (
                                                        <SchemeActionButton
                                                            $variant="add"
                                                            onPress={addRepSchemeRow}
                                                            accessibilityLabel="Adicionar bloco de series e repeticoes"
                                                        >
                                                            <MaterialCommunityIcons
                                                                name="plus"
                                                                size={spacing.iconSize.sm}
                                                                color={colors.textInverse}
                                                            />
                                                        </SchemeActionButton>
                                                    ) : (
                                                        <SchemeActionButton
                                                            $variant="remove"
                                                            onPress={() => removeRepSchemeRow(scheme.id)}
                                                            accessibilityLabel={`Remover bloco ${index + 1}`}
                                                        >
                                                            <MaterialCommunityIcons
                                                                name="minus"
                                                                size={spacing.iconSize.sm}
                                                                color={colors.neutral50}
                                                            />
                                                        </SchemeActionButton>
                                                    )}
                                                </SchemeRow>
                                            ))}
                                        </SchemeList>
                                    )}

                                    {!defaultRest ? (
                                        <DialogInput
                                            placeholder="Descanso (segundos)"
                                            placeholderTextColor={colors.neutral400}
                                            value={inputRest}
                                            onChangeText={text => setInputRest(numericOnly(text))}
                                            keyboardType="number-pad"
                                            maxLength={4}
                                            accessibilityLabel="Descanso em segundos"
                                        />
                                    ) : null}

                                    <DialogInput
                                        placeholder="Observacao (opcional)"
                                        placeholderTextColor={colors.neutral400}
                                        value={inputNotes}
                                        onChangeText={setInputNotes}
                                        accessibilityLabel="Observacao"
                                    />

                                    <ToggleRow>
                                        <ToggleLabel>Repeticoes padrao</ToggleLabel>
                                        <Switch
                                            value={inputFixedReps}
                                            onValueChange={value => {
                                                setInputFixedReps(value);
                                                if (!value && inputRepSchemes.length === 0) {
                                                    setInputRepSchemes([buildEmptyScheme()]);
                                                }
                                            }}
                                            trackColor={{ false: colors.neutral500, true: colors.secondaryLight }}
                                            thumbColor={inputFixedReps ? colors.secondary : colors.neutral300}
                                            accessibilityLabel="Repeticoes padrao"
                                        />
                                    </ToggleRow>

                                    {!isConjugatedDialog ? (
                                        <ToggleRow>
                                            <ToggleLabel>Conjugado com outro exercicio</ToggleLabel>
                                            <Switch
                                                value={inputIsConjugated}
                                                onValueChange={setInputIsConjugated}
                                                disabled={isEditingExercise}
                                                trackColor={{ false: colors.neutral500, true: colors.secondaryLight }}
                                                thumbColor={inputIsConjugated ? colors.secondary : colors.neutral300}
                                                accessibilityLabel="Conjugado com outro exercicio"
                                            />
                                        </ToggleRow>
                                    ) : null}

                                    <DialogRow>
                                        <CancelButton onPress={closeDialog} accessibilityLabel="Cancelar">
                                            <CancelButtonText>Cancelar</CancelButtonText>
                                        </CancelButton>
                                        <ConfirmButton
                                            onPress={isConjugatedDialog ? handleConfirm : handleMainConfirmWithEdit}
                                            accessibilityLabel="Confirmar"
                                        >
                                            <ConfirmButtonText>
                                                {isEditingExercise
                                                    ? 'Salvar alteracoes'
                                                    : (inputIsConjugated && !isConjugatedDialog ? 'Proximo' : 'Adicionar')}
                                            </ConfirmButtonText>
                                        </ConfirmButton>
                                    </DialogRow>
                                </DialogContent>
                            </DialogScroll>
                        </Dialog>
                    </Overlay>
                </KeyboardAvoidingView>
            </Modal>
        </Container>
    );
};

export default WorkoutDayScreen;
