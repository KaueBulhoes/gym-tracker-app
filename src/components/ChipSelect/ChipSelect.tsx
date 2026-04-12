import React from 'react';
import { Chip, ChipText, Wrapper } from './ChipSelect.styles';

interface ChipItem {
  value: string;
  label: string;
}

interface SingleSelectProps {
  items: ChipItem[];
  multiple?: false;
  selected: string;
  onSelect: (value: string) => void;
}

interface MultiSelectProps {
  items: ChipItem[];
  multiple: true;
  selected: string[];
  onSelect: (values: string[]) => void;
}

type ChipSelectProps = SingleSelectProps | MultiSelectProps;

const ChipSelect: React.FC<ChipSelectProps> = (props) => {
  const { items, multiple } = props;

  const isSelected = (value: string) =>
    multiple ? props.selected.includes(value) : props.selected === value;

  const handlePress = (value: string) => {
    if (multiple) {
      const current = props.selected;
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      props.onSelect(next);
    } else {
      props.onSelect(value);
    }
  };

  return (
    <Wrapper>
      {items.map(({ value, label }) => {
        const active = isSelected(value);
        return (
          <Chip
            key={value}
            $selected={active}
            onPress={() => handlePress(value)}
            accessibilityLabel={label}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <ChipText $selected={active}>{label}</ChipText>
          </Chip>
        );
      })}
    </Wrapper>
  );
};

export default ChipSelect;
