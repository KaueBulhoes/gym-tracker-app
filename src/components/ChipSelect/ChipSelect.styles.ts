import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../constants';

export const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${spacing.sm}px;
`;

export const Chip = styled.Pressable<{ $selected: boolean }>`
  padding-horizontal: ${spacing.base}px;
  padding-vertical: ${spacing.sm}px;
  border-radius: ${spacing.buttonRadius}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $selected }) =>
    $selected ? colors.primary : colors.backgroundElevated};
  border-width: 1.5px;
  border-color: ${({ $selected }) =>
    $selected ? colors.primary : colors.border};
`;

export const ChipText = styled.Text<{ $selected: boolean }>`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ $selected }) => ($selected ? colors.textInverse : colors.text)};
`;
