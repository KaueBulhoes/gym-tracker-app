import React, { useEffect, useRef, useState } from 'react';
import { TextInput as RNTextInput, type TextInputProps } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../../constants';

interface CustomDayFormProps {
    days: string[];
    currentInput: string;
    onChangeInput: (text: string) => void;
    onConfirm: () => void;
    onDelete: (index: number) => void;
    onRename: (index: number, newName: string) => void;
}

const CustomDayForm: React.FC<CustomDayFormProps> = ({
    days,
    currentInput,
    onChangeInput,
    onConfirm,
    onDelete,
    onRename,
}) => {
    const inputRef = useRef<RNTextInput>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingValue, setEditingValue] = useState('');

    useEffect(() => {
        if (days.length > 0 && editingIndex === null) {
            inputRef.current?.focus();
        }
    }, [days.length, editingIndex]);

    const startEditing = (index: number) => {
        setEditingIndex(index);
        setEditingValue(days[index]);
    };

    const confirmRename = () => {
        if (editingIndex === null) { return; }
        if (editingValue.trim()) {
            onRename(editingIndex, editingValue.trim());
        }
        setEditingIndex(null);
        setEditingValue('');
    };

    return (
        <Wrapper>
            {days.map((day, index) => {
                const isEditing = editingIndex === index;
                return (
                    <ConfirmedRow key={index}>
                        {isEditing ? (
                            <RenameInput
                                value={editingValue}
                                onChangeText={setEditingValue}
                                onSubmitEditing={confirmRename}
                                returnKeyType="done"
                                autoFocus
                                accessibilityLabel={`Renomear dia ${index + 1}`}
                            />
                        ) : (
                            <>
                                <MaterialCommunityIcons
                                    name="check-circle"
                                    size={18}
                                    color={colors.success}
                                />
                                <ConfirmedText numberOfLines={1}>{day}</ConfirmedText>
                            </>
                        )}

                        <RowActions>
                            {isEditing ? (
                                <ActionButton
                                    onPress={confirmRename}
                                    accessibilityLabel="Confirmar renomeamento"
                                >
                                    <MaterialCommunityIcons
                                        name="check"
                                        size={18}
                                        color={colors.success}
                                    />
                                </ActionButton>
                            ) : (
                                <ActionButton
                                    onPress={() => startEditing(index)}
                                    accessibilityLabel={`Renomear ${day}`}
                                >
                                    <MaterialCommunityIcons
                                        name="pencil-outline"
                                        size={18}
                                        color={colors.textSecondary}
                                    />
                                </ActionButton>
                            )}
                            <ActionButton
                                onPress={() => {
                                    if (editingIndex === index) { setEditingIndex(null); }
                                    onDelete(index);
                                }}
                                accessibilityLabel={`Remover ${day}`}
                            >
                                <MaterialCommunityIcons
                                    name="trash-can-outline"
                                    size={18}
                                    color={colors.error}
                                />
                            </ActionButton>
                        </RowActions>
                    </ConfirmedRow>
                );
            })}

            <InputRow>
                <StyledInput
                    ref={inputRef}
                    value={currentInput}
                    onChangeText={onChangeInput}
                    placeholder={`Treino ${days.length + 1}`}
                    placeholderTextColor={colors.textSecondary}
                    onSubmitEditing={onConfirm}
                    returnKeyType="done"
                    accessibilityLabel={`Treino ${days.length + 1}`}
                    autoFocus={days.length === 0}
                />
                <AddButton
                    onPress={onConfirm}
                    disabled={!currentInput.trim()}
                    accessibilityLabel="Confirmar nome do dia"
                    $disabled={!currentInput.trim()}
                >
                    <MaterialCommunityIcons
                        name="plus"
                        size={20}
                        color={currentInput.trim() ? colors.textInverse : colors.textSecondary}
                    />
                </AddButton>
            </InputRow>
        </Wrapper>
    );
};

const Wrapper = styled.View`
  margin-top: ${spacing.md}px;
  gap: ${spacing.sm}px;
`;

const ConfirmedRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
  padding: ${spacing.sm}px ${spacing.md}px;
  background-color: ${colors.backgroundHighlight};
  border-radius: ${spacing.cardRadius}px;
  border-width: 1px;
  border-color: ${colors.success}40;
`;

const ConfirmedText = styled.Text`
  flex: 1;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${colors.text};
`;

const RenameInput = styled.TextInput`
  flex: 1;
  font-size: ${typography.body.fontSize}px;
  color: ${colors.text};
  padding: 0px;
`;

const RowActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.xs}px;
  margin-left: auto;
`;

const ActionButton = styled.Pressable`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

const InputRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

const ForwardedTextInput = React.forwardRef<RNTextInput, TextInputProps>(
    (props, ref) => <RNTextInput ref={ref} {...props} />,
);

const StyledInput = styled(ForwardedTextInput)`
  flex: 1;
  height: 48px;
  background-color: ${colors.backgroundInput};
  border-radius: ${spacing.inputRadius}px;
  border-width: 1.5px;
  border-color: ${colors.border};
  padding-horizontal: ${spacing.md}px;
  font-size: ${typography.body.fontSize}px;
  color: ${colors.text};
`;

const AddButton = styled.Pressable<{ $disabled: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: ${spacing.buttonRadius}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $disabled }) =>
        $disabled ? colors.backgroundElevated : colors.primary};
  border-width: 1.5px;
  border-color: ${({ $disabled }) =>
        $disabled ? colors.border : colors.primary};
`;

export default CustomDayForm;
