import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing } from '../../constants';
import type { AddWorkoutExercisesScreenProps } from '../../navigation/types';
import {
    AddButton,
    BackButton,
    Container,
    Content,
    DayBody,
    DayCard,
    DayCount,
    DayHeader,
    DayHeaderLeft,
    DayIconContainer,
    DayInfo,
    DayName,
    DeleteButton,
    ExerciseInput,
    ExerciseName,
    ExerciseRow,
    Header,
    HeaderLeft,
    HeaderTitle,
    InputRow,
    SaveButton,
    SaveButtonText,
    ScrollContent,
} from './AddWorkoutExercisesScreen.styles';

type Exercise = { id: string; name: string };

const AddWorkoutExercisesScreen: React.FC<AddWorkoutExercisesScreenProps> = ({
    navigation,
    route,
}) => {
    const { days } = route.params;

    const [exercises, setExercises] = useState<Record<string, Exercise[]>>(
        Object.fromEntries(days.map(d => [d, []])),
    );
    const [expandedDay, setExpandedDay] = useState<string | null>(days[0] ?? null);
    const [inputs, setInputs] = useState<Record<string, string>>(
        Object.fromEntries(days.map(d => [d, ''])),
    );

    const toggleDay = (day: string) =>
        setExpandedDay(prev => (prev === day ? null : day));

    const addExercise = (day: string) => {
        const name = inputs[day]?.trim();
        if (!name) { return; }
        setExercises(prev => ({
            ...prev,
            [day]: [...prev[day], { id: `${day}-${Date.now()}`, name }],
        }));
        setInputs(prev => ({ ...prev, [day]: '' }));
    };

    const removeExercise = (day: string, id: string) =>
        setExercises(prev => ({
            ...prev,
            [day]: prev[day].filter(e => e.id !== id),
        }));

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
                <SaveButton onPress={() => navigation.navigate('Home')} accessibilityLabel="Salvar plano">
                    <SaveButtonText>Salvar</SaveButtonText>
                </SaveButton>
            </Header>

            <ScrollContent showsVerticalScrollIndicator={false}>
                <Content>
                    {days.map(day => {
                        const isExpanded = expandedDay === day;
                        const dayExercises = exercises[day] ?? [];
                        const count = dayExercises.length;

                        return (
                            <DayCard
                                key={day}
                                $expanded={isExpanded}
                                onPress={() => toggleDay(day)}
                                accessibilityLabel={`${day}, ${count} exercício${count !== 1 ? 's' : ''}`}
                                accessibilityState={{ expanded: isExpanded }}
                            >
                                <DayHeader>
                                    <DayHeaderLeft>
                                        <DayIconContainer $expanded={isExpanded}>
                                            <MaterialCommunityIcons
                                                name="dumbbell"
                                                size={spacing.iconSize.sm}
                                                color={isExpanded ? colors.secondary : colors.neutral400}
                                            />
                                        </DayIconContainer>
                                        <DayInfo>
                                            <DayName>{day}</DayName>
                                            <DayCount>
                                                {count === 0
                                                    ? 'Nenhum exercício'
                                                    : `${count} exercício${count !== 1 ? 's' : ''}`}
                                            </DayCount>
                                        </DayInfo>
                                    </DayHeaderLeft>
                                    <MaterialCommunityIcons
                                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                                        size={spacing.iconSize.md}
                                        color={colors.neutral400}
                                    />
                                </DayHeader>

                                {isExpanded && (
                                    <DayBody>
                                        {dayExercises.map(exercise => (
                                            <ExerciseRow key={exercise.id}>
                                                <MaterialCommunityIcons
                                                    name="circle-small"
                                                    size={spacing.iconSize.md}
                                                    color={colors.secondary}
                                                />
                                                <ExerciseName>{exercise.name}</ExerciseName>
                                                <DeleteButton
                                                    onPress={() => removeExercise(day, exercise.id)}
                                                    accessibilityLabel={`Remover ${exercise.name}`}
                                                >
                                                    <MaterialCommunityIcons
                                                        name="trash-can-outline"
                                                        size={spacing.iconSize.sm}
                                                        color={colors.neutral400}
                                                    />
                                                </DeleteButton>
                                            </ExerciseRow>
                                        ))}

                                        <InputRow>
                                            <ExerciseInput
                                                placeholder="Nome do exercício"
                                                placeholderTextColor={colors.neutral400}
                                                value={inputs[day]}
                                                onChangeText={text =>
                                                    setInputs(prev => ({ ...prev, [day]: text }))
                                                }
                                                onSubmitEditing={() => addExercise(day)}
                                                returnKeyType="done"
                                                accessibilityLabel="Nome do exercício"
                                            />
                                            <AddButton
                                                $disabled={!inputs[day]?.trim()}
                                                onPress={() => addExercise(day)}
                                                accessibilityLabel="Adicionar exercício"
                                            >
                                                <MaterialCommunityIcons
                                                    name="plus"
                                                    size={spacing.iconSize.md}
                                                    color={inputs[day]?.trim() ? colors.neutral50 : colors.neutral600}
                                                />
                                            </AddButton>
                                        </InputRow>
                                    </DayBody>
                                )}
                            </DayCard>
                        );
                    })}
                </Content>
            </ScrollContent>
        </Container>
    );
};

export default AddWorkoutExercisesScreen;
