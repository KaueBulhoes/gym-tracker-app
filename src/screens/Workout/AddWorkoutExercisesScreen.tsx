import React from 'react';
import { StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing } from '../../constants';
import type { AddWorkoutExercisesScreenProps } from '../../navigation/types';
import { useWorkoutStore } from '../../stores/workoutStore';
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
    const { days } = route.params;
    const draft = useWorkoutStore(state => state.draft);
    const saveDraft = useWorkoutStore(state => state.saveDraft);
    const draftDays = draft?.days ?? [];

    const hasAnyExercise = draftDays.some(d => d.exercises.length > 0);

    const handleSave = () => {
        if (!hasAnyExercise) {
            return;
        }
        saveDraft();
        navigation.navigate('Home');
    };

    const exerciseCountFor = (dayName: string) =>
        draftDays.find(d => d.name === dayName)?.exercises.length ?? 0;

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} />

            <Header>
                <HeaderLeft>
                    <BackButton onPress={() => navigation.goBack()} accessibilityLabel="Voltar">
                        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.neutral50} />
                    </BackButton>
                    <HeaderTitle>Adicionar Exercícios</HeaderTitle>
                </HeaderLeft>
            </Header>

            <ScrollContent showsVerticalScrollIndicator={false}>
                <Content>
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
                        disabled={!hasAnyExercise}
                        $disabled={!hasAnyExercise}
                        accessibilityLabel="Salvar plano"
                        accessibilityState={{ disabled: !hasAnyExercise }}
                    >
                        <SaveButtonText>Salvar</SaveButtonText>
                    </SaveButton>
                </Content>
            </ScrollContent>
        </Container>
    );
};

export default AddWorkoutExercisesScreen;
