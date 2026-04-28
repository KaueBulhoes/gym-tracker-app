import styled from 'styled-components/native';
import { spacing, typography } from '../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const Backdrop = styled.Pressable`
  flex: 1;
`;

export const LandscapeFrame = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  transform: rotate(90deg);
`;

export const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${spacing.lg}px;
  padding-top: ${spacing.md}px;
  padding-bottom: ${spacing.sm}px;
`;

export const Title = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

export const CloseButton = styled.Pressable`
  padding: ${spacing.xs}px;
  margin-left: ${spacing.sm}px;
`;

export const Controls = styled.View`
  flex-direction: row;
  padding-horizontal: ${spacing.lg}px;
  gap: ${spacing.sm}px;
  z-index: 10;
`;

export const DropdownWrapper = styled.View<{ $flex: number }>`
  flex: ${({ $flex }) => $flex};
  position: relative;
`;

export const DropdownTrigger = styled.Pressable<{ $active?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.inputRadius}px;
  border-width: 1.5px;
  border-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.border};
  padding-horizontal: ${spacing.md}px;
  height: 36px;
  gap: ${spacing.sm}px;
`;

export const DropdownTriggerText = styled.Text`
  flex: 1;
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
`;

export const DropdownList = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: true,
  keyboardShouldPersistTaps: 'always',
})`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  max-height: 200px;
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.inputRadius}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  z-index: 20;
`;

export const DropdownItem = styled.Pressable<{ $selected?: boolean }>`
  padding-horizontal: ${spacing.md}px;
  padding-vertical: ${spacing.sm}px;
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.backgroundHighlight : 'transparent'};
`;

export const DropdownItemText = styled.Text<{ $selected?: boolean }>`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${({ $selected }) =>
    $selected
      ? typography.bodyBold.fontWeight
      : typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.text};
`;

export const ChartArea = styled.View`
  flex: 1;
  padding-horizontal: ${spacing.lg}px;
  padding-top: ${spacing.sm}px;
  align-items: center;
  justify-content: center;
`;

export const LegendArea = styled.View`
  padding-horizontal: ${spacing.lg}px;
  padding-bottom: ${spacing.sm}px;
  justify-content: center;
`;

export const LegendScroll = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: 'center',
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
})``;

export const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.xs}px;
`;

export const LegendDot = styled.View<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ $color }) => $color};
`;

export const LegendLabel = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.text};
`;
