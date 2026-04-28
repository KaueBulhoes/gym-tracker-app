import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import { spacing } from '../../../constants';
import type { AddWorkoutExercisesScreenProps } from '../../../navigation/types';
import { useWorkoutStore } from '../../../stores/workoutStore';
import {
    BackButton,
    Container,
    Content,
    DayCard,
    DayCount,
    DayHeader,
    DayHeaderLeft,
    DayIconContainer,
    DayInfo,
    DayName,
    DurationInput,
    DurationLabel,
    DurationRow,
    DurationUnit,
    Header,
    HeaderLeft,
    HeaderTitle,
    SaveButton,
    SaveButtonText,
    ScrollContent,
} from './AddWorkoutExercisesScreen.styles';

const AddWorkoutExercisesScreen: React.FC<AddWorkoutExercisesScreenProps> = ({
    navigation,
    route,
}) => {
    const { colors } = useTheme();
    const { days } = route.params;
    const draft = useWorkoutStore(state => state.draft);
    const saveDraft = useWorkoutStore(state => state.saveDraft);
    const saveEditDraft = useWorkoutStore(state => state.saveEditDraft);
    const editingPlanId = useWorkoutStore(state => state.editingPlanId);
    const updateDraftDuration = useWorkoutStore(state => state.updateDraftDuration);
    const draftDays = draft?.days ?? [];

    const isEditing = editingPlanId !== null;
    const isLoading = useWorkoutStore(state => state.isLoading);
    const [durationInput, setDurationInput] = useState(
        draft?.durationDays ? String(draft.durationDays) : '',
    );

    const handleDurationChange = (text: string) => {
        const numeric = text.replace(/[^0-9]/g, '');
        setDurationInput(numeric);
        updateDraftDuration(numeric ? Number(numeric) : null);
    };

    const hasAnyExercise = draftDays.some(d => d.exercises.length > 0);

    const handleSave = async () => {
        if (!hasAnyExercise) {
            return;
        }
        const success = isEditing ? await saveEditDraft() : await saveDraft();
        if (success) {
            navigation.navigate(isEditing ? 'WorkoutPlans' : 'Home');
        }
    };

    const exerciseCountFor = (dayName: string) =>
        draftDays.find(d => d.name === dayName)?.exercises.length ?? 0;

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} />

            <Header>
                <HeaderLeft>
                    <BackButton onPress={() => navigation.goBack()} accessibilityLabel="Voltar">
                        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.onSecondary} />
                    </BackButton>
                    <HeaderTitle>{isEditing ? 'Editar Exercícios' : 'Adicionar Exercícios'}</HeaderTitle>
                </HeaderLeft>
            </Header>

            <ScrollContent showsVerticalScrollIndicator={false}>
                <Content>
                    <DurationRow>
                        <DurationLabel>Duração da ficha:</DurationLabel>
                        <DurationInput
                            value={durationInput}
                            onChangeText={handleDurationChange}
                            placeholder="—"
                            placeholderTextColor={colors.neutral500}
                            keyboardType="number-pad"
                            maxLength={3}
                            accessibilityLabel="Duração da ficha em dias"
                        />
                        <DurationUnit>dias</DurationUnit>
                    </DurationRow>

                    {days.map(day => {
                        const count = exerciseCountFor(day);
                        const countLabel =
                            count === 0
                                ? 'Toque para adicionar exercícios'
                                : `${count} ${count === 1 ? 'exercício' : 'exercícios'}`;
                        return (
                        <DayCard
                            key={day}
                            onPress={() => navigation.navigate('WorkoutDay', { day })}
                            accessibilityLabel={`Configurar ${day}`}
                        >
                            <DayHeader>
                                <DayHeaderLeft>
                                    <DayIconContainer>
                                        <MaterialCommunityIcons
                                            name="dumbbell"
                                            size={spacing.iconSize.sm}
                                            color={colors.neutral400}
                                        />
                                    </DayIconContainer>
                                    <DayInfo>
                                        <DayName>{day}</DayName>
                                        <DayCount>{countLabel}</DayCount>
                                    </DayInfo>
                                </DayHeaderLeft>
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={spacing.iconSize.md}
                                    color={colors.neutral400}
                                />
                            </DayHeader>
                        </DayCard>
                        );
                    })}

                    <SaveButton
                        onPress={handleSave}
                        disabled={!hasAnyExercise || isLoading}
                        $disabled={!hasAnyExercise || isLoading}
                        accessibilityLabel="Salvar plano"
                        accessibilityState={{ disabled: !hasAnyExercise || isLoading }}
                    >
                        <SaveButtonText>{isLoading ? 'Salvando...' : 'Salvar'}</SaveButtonText>
                    </SaveButton>
                </Content>
            </ScrollContent>
        </Container>
    );
};

export default AddWorkoutExercisesScreen;
