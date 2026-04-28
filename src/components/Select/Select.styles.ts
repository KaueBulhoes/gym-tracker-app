import styled from 'styled-components/native';
import { spacing, typography } from '../../constants';

export const Wrapper = styled.View``;

export const LabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.xs}px;
`;

export const Label = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.neutral200};
`;

export const LabelHint = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Trigger = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.backgroundInput};
  border-radius: ${spacing.inputRadius}px;
  border-width: 1.5px;
  border-color: transparent;
  padding-horizontal: ${spacing.base}px;
  height: 48px;
  gap: ${spacing.sm}px;
  overflow: hidden;
`;

export const TriggerText = styled.Text<{ $isPlaceholder: boolean }>`
  flex: 1;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${({ $isPlaceholder, theme }) =>
    $isPlaceholder ? theme.colors.neutral300 : theme.colors.text};
`;

export const Overlay = styled.Pressable`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.overlay};
  justify-content: center;
  align-items: center;
  padding-horizontal: ${spacing.lg}px;
`;

export const ModalCard = styled.View`
  width: 100%;
  max-width: 360px;
  max-height: 70%;
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.neutral600};
  overflow: hidden;
`;

export const ModalHeader = styled.View`
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  padding-horizontal: ${spacing.lg}px;
  padding-vertical: ${spacing.md}px;
`;

export const ModalTitle = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.onSecondary};
`;

export const ModalBody = styled.View`
  padding-horizontal: ${spacing.sm}px;
  padding-vertical: ${spacing.sm}px;
`;

export const ModalScroll = styled.ScrollView``;

export const ModalFooter = styled.View`
  padding-horizontal: ${spacing.lg}px;
  padding-vertical: ${spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.neutral600};
`;

export const Option = styled.Pressable<{ $selected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${spacing.md}px;
  padding-horizontal: ${spacing.md}px;
  gap: ${spacing.md}px;
  border-radius: ${spacing.buttonRadius}px;
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.backgroundHighlight : 'transparent'};
`;

export const OptionCheckbox = styled.View<{ $checked: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 5px;
  border-width: 2px;
  align-items: center;
  justify-content: center;
  border-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : theme.colors.neutral500};
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : 'transparent'};
`;

export const OptionText = styled.Text<{ $selected: boolean }>`
  flex: 1;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${({ $selected }) =>
    $selected
      ? typography.bodyBold.fontWeight
      : typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.text};
`;

export const EmptyHint = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding-vertical: ${spacing.md}px;
`;

export const ConfirmButton = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${spacing.buttonRadius}px;
  padding-vertical: ${spacing.md}px;
  align-items: center;
  justify-content: center;
`;

export const ConfirmButtonText = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.textInverse};
`;
