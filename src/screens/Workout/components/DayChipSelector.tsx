import React from 'react';
import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../../constants';

interface DayChipSelectorProps {
    items: string[];
    selected: string[];
    onToggle: (item: string) => void;
    canAddMore: boolean;
    onAddMore: () => void;
}

const DayChipSelector: React.FC<DayChipSelectorProps> = ({
    items,
    selected,
    onToggle,
    canAddMore,
    onAddMore,
}) => (
    <Wrapper>
        {items.map(item => {
            const isSelected = selected.includes(item);
            return (
                <Chip
                    key={item}
                    $selected={isSelected}
                    onPress={() => onToggle(item)}
                    accessibilityLabel={`Divisão ${item}`}
                    accessibilityState={{ selected: isSelected }}
                >
                    <ChipText $selected={isSelected}>{item}</ChipText>
                </Chip>
            );
        })}
        {canAddMore && (
            <Chip
                $selected={false}
                $isAdd
                onPress={onAddMore}
                accessibilityLabel="Adicionar divisão extra"
            >
                <ChipText $selected={false}>+</ChipText>
            </Chip>
        )}
    </Wrapper>
);

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${spacing.sm}px;
  margin-top: ${spacing.md}px;
`;

const Chip = styled.Pressable<{ $selected: boolean; $isAdd?: boolean }>`
  width: 52px;
  height: 52px;
  border-radius: ${spacing.sm}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $selected }) =>
        $selected ? colors.primary : colors.backgroundElevated};
  border-width: 1.5px;
  border-color: ${({ $selected, $isAdd }) =>
        $isAdd ? colors.primary : $selected ? colors.primary : colors.border};
`;

const ChipText = styled.Text<{ $selected: boolean }>`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ $selected }) => ($selected ? colors.textInverse : colors.text)};
`;

export default DayChipSelector;
