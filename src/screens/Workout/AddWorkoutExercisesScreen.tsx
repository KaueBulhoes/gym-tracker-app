import React from 'react';
import { StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing } from '../../constants';
import type { AddWorkoutExercisesScreenProps } from '../../navigation/types';
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
                    {days.map(day => (
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
                                        <DayCount>Toque para adicionar exercícios</DayCount>
                                    </DayInfo>
                                </DayHeaderLeft>
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={spacing.iconSize.md}
                                    color={colors.neutral400}
                                />
                            </DayHeader>
                        </DayCard>
                    ))}
                </Content>
            </ScrollContent>
        </Container>
    );
};

export default AddWorkoutExercisesScreen;
