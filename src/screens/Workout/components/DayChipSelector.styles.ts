import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../../constants';

export const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${spacing.sm}px;
  margin-top: ${spacing.md}px;
`;

export const Chip = styled.Pressable<{ $selected: boolean; $isAdd?: boolean }>`
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

export const ChipText = styled.Text<{ $selected: boolean }>`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ $selected }) => ($selected ? colors.textInverse : colors.text)};
`;
