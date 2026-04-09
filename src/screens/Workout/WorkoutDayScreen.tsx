import React, { useState } from 'react';
import { Modal, StatusBar, Switch } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing } from '../../constants';
import type { WorkoutDayScreenProps } from '../../navigation/types';
import {
    AddExerciseButton,
    AddExerciseButtonText,
    BackButton,
    CancelButton,
    CancelButtonText,
    ConfirmButton,
    ConfirmButtonText,
    Container,
    Content,
    DeleteButton,
    Dialog,
    DialogInput,
    DialogRow,
    DialogTitle,
    ExerciseCard,
    ExerciseCardRow,
    ExerciseMeta,
    ExerciseName,
    Header,
    HeaderTitle,
    Overlay,
    RestInput,
    RestInputWrapper,
    RestUnit,
    ScrollContent,
    ToggleLabel,
    ToggleRow,
    ToggleSection,
} from './WorkoutDayScreen.styles';

type Exercise = {
    id: string;
    name: string;
    reps: string;
    restSeconds?: string;
};

const WorkoutDayScreen: React.FC<WorkoutDayScreenProps> = ({ route, navigation }) => {
    const { day } = route.params;

    const [defaultRest, setDefaultRest] = useState(false);
    const [defaultRestSeconds, setDefaultRestSeconds] = useState('');
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputReps, setInputReps] = useState('');
    const [inputRest, setInputRest] = useState('');

    const openDialog = () => setDialogVisible(true);

    const closeDialog = () => {
        setDialogVisible(false);
        setInputName('');
        setInputReps('');
        setInputRest('');
    };

    const addExercise = () => {
        if (!inputName.trim() || !inputReps.trim()) { return; }
        const rest = defaultRest ? defaultRestSeconds : inputRest.trim() || undefined;
        setExercises(prev => [
            ...prev,
            {
                id: String(Date.now()),
                name: inputName.trim(),
                reps: inputReps.trim(),
                restSeconds: rest,
            },
        ]);
        closeDialog();
    };

    const removeExercise = (id: string) =>
        setExercises(prev => prev.filter(e => e.id !== id));

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} />

            <Header>
                <BackButton onPress={() => navigation.goBack()} accessibilityLabel="Voltar">
                    <MaterialCommunityIcons name="arrow-left" size={24} color={colors.neutral50} />
                </BackButton>
                <HeaderTitle>{day}</HeaderTitle>
            </Header>

            <ScrollContent showsVerticalScrollIndicator={false}>
                <Content>
                    <ToggleSection>
                        <ToggleRow>
                            <ToggleLabel>Descanso padrão entre exercícios</ToggleLabel>
                            <Switch
                                value={defaultRest}
                                onValueChange={setDefaultRest}
                                trackColor={{ false: colors.neutral500, true: colors.secondaryLight }}
                                thumbColor={defaultRest ? colors.secondary : colors.neutral300}
                                accessibilityLabel="Ativar descanso padrão"
                            />
                        </ToggleRow>
                        {defaultRest && (
                            <RestInputWrapper>
                                <RestInput
                                    placeholder="0"
                                    placeholderTextColor={colors.neutral400}
                                    value={defaultRestSeconds}
                                    onChangeText={setDefaultRestSeconds}
                                    keyboardType="number-pad"
                                    maxLength={4}
                                    accessibilityLabel="Tempo de descanso padrão em segundos"
                                />
                                <RestUnit>segundos</RestUnit>
                            </RestInputWrapper>
                        )}
                    </ToggleSection>

                    {exercises.map(exercise => (
                        <ExerciseCard key={exercise.id}>
                            <ExerciseCardRow>
                                <MaterialCommunityIcons
                                    name="dumbbell"
                                    size={spacing.iconSize.sm}
                                    color={colors.secondary}
                                />
                                <ExerciseName>{exercise.name}</ExerciseName>
                                <DeleteButton
                                    onPress={() => removeExercise(exercise.id)}
                                    accessibilityLabel={`Remover ${exercise.name}`}
                                >
                                    <MaterialCommunityIcons
                                        name="trash-can-outline"
                                        size={spacing.iconSize.sm}
                                        color={colors.neutral400}
                                    />
                                </DeleteButton>
                            </ExerciseCardRow>
                            <ExerciseMeta>
                                {exercise.reps} rep{Number(exercise.reps) !== 1 ? 's' : ''}
                                {exercise.restSeconds ? ` · ${exercise.restSeconds}s descanso` : ''}
                            </ExerciseMeta>
                        </ExerciseCard>
                    ))}

                    <AddExerciseButton onPress={openDialog} accessibilityLabel="Adicionar série">
                        <MaterialCommunityIcons
                            name="plus"
                            size={spacing.iconSize.md}
                            color={colors.background}
                        />
                        <AddExerciseButtonText>Adicionar Série</AddExerciseButtonText>
                    </AddExerciseButton>
                </Content>
            </ScrollContent>

            <Modal
                visible={dialogVisible}
                transparent
                animationType="fade"
                onRequestClose={closeDialog}
            >
                <Overlay>
                    <Dialog onStartShouldSetResponder={() => true}>
                        <DialogTitle>Nova Série</DialogTitle>

                        <DialogInput
                            placeholder="Nome do exercício"
                            placeholderTextColor={colors.neutral400}
                            value={inputName}
                            onChangeText={setInputName}
                            accessibilityLabel="Nome do exercício"
                        />

                        <DialogInput
                            placeholder="Repetições"
                            placeholderTextColor={colors.neutral400}
                            value={inputReps}
                            onChangeText={setInputReps}
                            keyboardType="number-pad"
                            maxLength={4}
                            accessibilityLabel="Repetições"
                        />

                        {!defaultRest && (
                            <DialogInput
                                placeholder="Descanso (segundos)"
                                placeholderTextColor={colors.neutral400}
                                value={inputRest}
                                onChangeText={setInputRest}
                                keyboardType="number-pad"
                                maxLength={4}
                                accessibilityLabel="Descanso em segundos"
                            />
                        )}

                        <DialogRow>
                            <CancelButton onPress={closeDialog} accessibilityLabel="Cancelar">
                                <CancelButtonText>Cancelar</CancelButtonText>
                            </CancelButton>
                            <ConfirmButton onPress={addExercise} accessibilityLabel="Adicionar exercício">
                                <ConfirmButtonText>Adicionar</ConfirmButtonText>
                            </ConfirmButton>
                        </DialogRow>
                    </Dialog>
                </Overlay>
            </Modal>
        </Container>
    );
};

export default WorkoutDayScreen;
