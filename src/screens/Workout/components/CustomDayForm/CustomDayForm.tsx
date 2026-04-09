import React, { useEffect, useRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../constants';
import {
    ActionButton,
    AddButton,
    ConfirmedRow,
    ConfirmedText,
    InputRow,
    RenameInput,
    RowActions,
    StyledInput,
    Wrapper,
} from './CustomDayForm.styles';

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

export default CustomDayForm;
