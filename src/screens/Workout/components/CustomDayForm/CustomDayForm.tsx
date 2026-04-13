import React, { useRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../../constants';
import {
    AddButton,
    DayRow,
    ErrorMessage,
    InputRow,
    RemoveButton,
    RowInput,
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
    const [removingIndex, setRemovingIndex] = useState<number | null>(null);

    const duplicateIndexes = new Set<number>();
    const seen = new Map<string, number>();
    days.forEach((day, index) => {
        const key = day.toLowerCase();
        if (seen.has(key)) {
            duplicateIndexes.add(seen.get(key)!);
            duplicateIndexes.add(index);
        } else {
            seen.set(key, index);
        }
    });
    const hasDuplicates = duplicateIndexes.size > 0;

    return (
        <Wrapper>
            {days.map((day, index) => {
                const isDuplicate = duplicateIndexes.has(index);
                return (
                    <DayRow key={index}>
                        <RowInput
                            $error={isDuplicate}
                            value={day}
                            onChangeText={(text) => onRename(index, text)}
                            placeholder={`Treino ${index + 1}`}
                            placeholderTextColor={colors.textSecondary}
                            accessibilityLabel={`Nome do treino ${index + 1}`}
                        />
                        <RemoveButton
                            onPress={() => {
                                setRemovingIndex(index);
                                setTimeout(() => {
                                    onDelete(index);
                                    setRemovingIndex(null);
                                }, 150);
                            }}
                            style={removingIndex === index ? { backgroundColor: colors.error } : undefined}
                            accessibilityLabel={`Remover treino ${index + 1}`}
                        >
                            <MaterialCommunityIcons
                                name="minus"
                                size={20}
                                color={removingIndex === index ? colors.textInverse : colors.error}
                            />
                        </RemoveButton>
                    </DayRow>
                );
            })}

            {hasDuplicates && (
                <ErrorMessage>Treinos com mesmo nome. Mude o nome de um deles.</ErrorMessage>
            )}

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
                    accessibilityLabel="Adicionar treino"
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
