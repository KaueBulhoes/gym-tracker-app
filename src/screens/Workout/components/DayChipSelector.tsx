import React from 'react';
import { Chip, ChipText, Wrapper } from './DayChipSelector.styles';

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

export default DayChipSelector;
