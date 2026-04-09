import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import { colors, spacing, typography } from '../../constants';
import type { AddWorkoutPlanScreenProps } from '../../navigation/types';
import CustomDayForm from './components/CustomDayForm';
import DayChipSelector from './components/DayChipSelector';

type WorkoutPlanType = 'abcde' | 'weekdays' | 'custom';

const ABCDE_BASE = ['A', 'B', 'C', 'D', 'E'];
const WEEKDAYS_BASE = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
const WEEKDAYS_EXTRA = ['Sáb', 'Dom'];

const PLAN_OPTIONS: { type: WorkoutPlanType; label: string; description: string }[] = [
    { type: 'abcde', label: 'Treino ABCDE', description: 'Divisão por letras (A, B, C...)' },
    { type: 'weekdays', label: 'Seg a Sex', description: 'Divisão pelos dias da semana' },
    { type: 'custom', label: 'Personalizável', description: 'Crie seus próprios nomes' },
];

const AddWorkoutPlanScreen: React.FC<AddWorkoutPlanScreenProps> = ({ navigation }) => {
    const [planType, setPlanType] = useState<WorkoutPlanType | null>(null);

    const [abcdeItems, setAbcdeItems] = useState(ABCDE_BASE);
    const [abcdeSelected, setAbcdeSelected] = useState<string[]>([]);

    const [weekdayItems, setWeekdayItems] = useState(WEEKDAYS_BASE);
    const [weekdaySelected, setWeekdaySelected] = useState<string[]>([]);

    const [customDays, setCustomDays] = useState<string[]>([]);
    const [customInput, setCustomInput] = useState('');

    const toggleAbcde = (item: string) => {
        const isExtra = !ABCDE_BASE.includes(item);
        if (abcdeSelected.includes(item)) {
            setAbcdeSelected(prev => prev.filter(i => i !== item));
            if (isExtra) {
                setAbcdeItems(prev => prev.filter(i => i !== item));
            }
        } else {
            setAbcdeSelected(prev => [...prev, item]);
        }
    };

    const addAbcdeItem = () => {
        const newItem = String.fromCharCode(65 + abcdeItems.length);
        setAbcdeItems(prev => [...prev, newItem]);
        setAbcdeSelected(prev => [...prev, newItem]);
    };

    const toggleWeekday = (item: string) => {
        const isExtra = !WEEKDAYS_BASE.includes(item);
        if (weekdaySelected.includes(item)) {
            setWeekdaySelected(prev => prev.filter(i => i !== item));
            if (isExtra) {
                setWeekdayItems(prev => prev.filter(i => i !== item));
            }
        } else {
            setWeekdaySelected(prev => [...prev, item]);
        }
    };

    const addWeekdayItem = () => {
        const extraIndex = weekdayItems.length - WEEKDAYS_BASE.length;
        if (extraIndex < WEEKDAYS_EXTRA.length) {
            const newItem = WEEKDAYS_EXTRA[extraIndex];
            setWeekdayItems(prev => [...prev, newItem]);
            setWeekdaySelected(prev => [...prev, newItem]);
        }
    };

    const confirmCustomDay = () => {
        if (!customInput.trim()) { return; }
        setCustomDays(prev => [...prev, customInput.trim()]);
        setCustomInput('');
    };

    const deleteCustomDay = (index: number) =>
        setCustomDays(prev => prev.filter((_, i) => i !== index));

    const renameCustomDay = (index: number, newName: string) =>
        setCustomDays(prev => prev.map((d, i) => (i === index ? newName : d)));

    const canAbcdeAddMore =
        abcdeSelected.length > 0 && abcdeSelected.length === abcdeItems.length;

    const canWeekdayAddMore =
        weekdaySelected.length > 0 &&
        weekdaySelected.length === weekdayItems.length &&
        weekdayItems.length < WEEKDAYS_BASE.length + WEEKDAYS_EXTRA.length;

    const canCreate =
        (planType === 'abcde' && abcdeSelected.length > 0) ||
        (planType === 'weekdays' && weekdaySelected.length > 0) ||
        (planType === 'custom' && customDays.length > 0);

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor={colors.secondaryDark} />

            <Header>
                <BackButton onPress={() => navigation.goBack()} accessibilityLabel="Voltar">
                    <MaterialCommunityIcons name="arrow-left" size={24} color={colors.neutral50} />
                </BackButton>
                <HeaderTitle>Novo Plano de Treino</HeaderTitle>
            </Header>

            <ScrollContent showsVerticalScrollIndicator={false}>
                <Content>
                    <SectionLabel>Tipo de treino</SectionLabel>

                    <RadioGroup>
                        {PLAN_OPTIONS.map(option => {
                            const isSelected = planType === option.type;
                            return (
                                <RadioOption
                                    key={option.type}
                                    $selected={isSelected}
                                    onPress={() => setPlanType(option.type)}
                                    accessibilityLabel={option.label}
                                    accessibilityState={{ selected: isSelected }}
                                >
                                    <RadioLeft>
                                        <RadioCircle $selected={isSelected}>
                                            {isSelected && <RadioDot />}
                                        </RadioCircle>
                                        <RadioTextGroup>
                                            <RadioLabel $selected={isSelected}>{option.label}</RadioLabel>
                                            <RadioDescription>{option.description}</RadioDescription>
                                        </RadioTextGroup>
                                    </RadioLeft>
                                </RadioOption>
                            );
                        })}
                    </RadioGroup>

                    {planType === 'abcde' && (
                        <Panel>
                            <PanelLabel>Selecione as divisões</PanelLabel>
                            <DayChipSelector
                                items={abcdeItems}
                                selected={abcdeSelected}
                                onToggle={toggleAbcde}
                                canAddMore={canAbcdeAddMore}
                                onAddMore={addAbcdeItem}
                            />
                        </Panel>
                    )}

                    {planType === 'weekdays' && (
                        <Panel>
                            <PanelLabel>Selecione os dias</PanelLabel>
                            <DayChipSelector
                                items={weekdayItems}
                                selected={weekdaySelected}
                                onToggle={toggleWeekday}
                                canAddMore={canWeekdayAddMore}
                                onAddMore={addWeekdayItem}
                            />
                        </Panel>
                    )}

                    {planType === 'custom' && (
                        <Panel>
                            <PanelLabel>Adicione seu treino</PanelLabel>
                            <CustomDayForm
                                days={customDays}
                                currentInput={customInput}
                                onChangeInput={setCustomInput}
                                onConfirm={confirmCustomDay}
                                onDelete={deleteCustomDay}
                                onRename={renameCustomDay}
                            />
                        </Panel>
                    )}

                    <Button
                        title="Criar Plano"
                        onPress={() => { }}
                        disabled={!canCreate}
                        style={{ marginTop: spacing.xl }}
                    />
                </Content>
            </ScrollContent>
        </Container>
    );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.huge}px;
  padding-bottom: ${spacing.xl}px;
  background-color: ${colors.secondaryDark};
`;

const BackButton = styled.Pressable`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const HeaderTitle = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.neutral50};
`;

const ScrollContent = styled.ScrollView``;

const Content = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.xl}px;
  padding-bottom: 55px;
  gap: ${spacing.base}px;
`;

const SectionLabel = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.text};
`;

const RadioGroup = styled.View`
  gap: ${spacing.sm}px;
`;

const RadioOption = styled.Pressable<{ $selected: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.md}px;
  border-radius: ${spacing.cardRadius}px;
  background-color: ${colors.backgroundElevated};
  border-width: 1.5px;
  border-color: ${({ $selected }) => ($selected ? colors.primary : colors.border)};
`;

const RadioLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
`;

const RadioCircle = styled.View<{ $selected: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  border-width: 2px;
  border-color: ${({ $selected }) => ($selected ? colors.primary : colors.border)};
  align-items: center;
  justify-content: center;
`;

const RadioDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${colors.primary};
`;

const RadioTextGroup = styled.View`
  gap: ${spacing.xxs}px;
`;

const RadioLabel = styled.Text<{ $selected: boolean }>`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ $selected }) => ($selected ? colors.primary : colors.text)};
`;

const RadioDescription = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  color: ${colors.textSecondary};
`;

const Panel = styled.View`
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.md}px;
  border-width: 1px;
  border-color: ${colors.neutral600};
`;

const PanelLabel = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.textSecondary};
`;

export default AddWorkoutPlanScreen;
