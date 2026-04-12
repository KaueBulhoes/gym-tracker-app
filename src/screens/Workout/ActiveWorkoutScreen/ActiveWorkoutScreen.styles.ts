import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  align-items: center;
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.huge}px;
  padding-bottom: ${spacing.lg}px;
  background-color: ${colors.secondaryDark};
`;

export const BackButton = styled.Pressable`
  position: absolute;
  left: ${spacing.screenHorizontal}px;
  top: ${spacing.huge}px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const TimerText = styled.Text`
  font-size: 36px;
  font-weight: ${typography.number.fontWeight};
  color: ${colors.primary};
  font-variant: tabular-nums;
`;

export const DayTitle = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.neutral50};
  margin-top: ${spacing.xs}px;
`;

export const DaySubtitle = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.neutral200};
  margin-top: ${spacing.xxs}px;
`;

export const ScrollContent = styled.ScrollView``;

export const Content = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.lg}px;
  padding-bottom: ${spacing.xxxl}px;
  gap: ${spacing.sm}px;
`;

export const ExerciseAccordion = styled.Pressable<{ $done: boolean }>`
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  border-width: 1px;
  border-color: ${({ $done }) => ($done ? colors.success : colors.neutral600)};
  overflow: hidden;
`;

export const ExerciseHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${spacing.cardPadding}px;
`;

export const Checkbox = styled.Pressable<{ $checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border-width: 2px;
  border-color: ${({ $checked }) =>
    $checked ? colors.success : colors.neutral500};
  background-color: ${({ $checked }) =>
    $checked ? colors.success : 'transparent'};
  align-items: center;
  justify-content: center;
  margin-right: ${spacing.md}px;
`;

export const ExerciseInfo = styled.View`
  flex: 1;
`;

export const ExerciseName = styled.Text<{ $done: boolean }>`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ $done }) => ($done ? colors.success : colors.text)};
`;

export const ExerciseMeta = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.textSecondary};
  margin-top: ${spacing.xxs}px;
`;

export const ExerciseHeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const WeightButton = styled.Pressable`
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin-right: 10px;
`;

export const WeightButtonLabel = styled.Text`
  font-size: 10px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.primary};
`;

export const ExerciseBody = styled.View`
  padding-horizontal: ${spacing.cardPadding}px;
  padding-bottom: ${spacing.cardPadding}px;
  border-top-width: 1px;
  border-top-color: ${colors.neutral600};
  gap: ${spacing.xs}px;
  padding-top: ${spacing.sm}px;
`;

export const SetRow = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${spacing.xs}px;
`;

export const SetCheckbox = styled.View<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${({ $checked }) =>
    $checked ? colors.success : colors.neutral500};
  background-color: ${({ $checked }) =>
    $checked ? colors.success : 'transparent'};
  align-items: center;
  justify-content: center;
  margin-right: ${spacing.md}px;
`;

export const SetText = styled.Text<{ $checked: boolean }>`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ $checked }) => ($checked ? colors.neutral400 : colors.text)};
  flex: 1;
`;

export const SetWeight = styled.Text<{ $checked: boolean }>`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ $checked }) => ($checked ? colors.neutral500 : colors.primary)};
`;

export const FinishButton = styled.Pressable`
  margin-horizontal: ${spacing.screenHorizontal}px;
  margin-bottom: ${spacing.lg}px;
  padding-vertical: ${spacing.md}px;
  border-radius: ${spacing.buttonRadius}px;
  background-color: ${colors.error};
  align-items: center;
  justify-content: center;
`;

export const FinishButtonText = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.neutral50};
`;

export const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.overlay};
`;

export const RestModal = styled.View`
  width: 220px;
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.xl}px;
  align-items: center;
  gap: ${spacing.md}px;
  border-width: 1px;
  border-color: ${colors.neutral600};
`;

export const RestModalTitle = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.text};
`;

export const RestModalTimer = styled.Text`
  font-size: 48px;
  font-weight: ${typography.number.fontWeight};
  color: ${colors.primary};
  font-variant: tabular-nums;
`;

export const RestModalSkip = styled.Pressable`
  padding-horizontal: ${spacing.lg}px;
  padding-vertical: ${spacing.sm}px;
  border-radius: ${spacing.buttonRadius}px;
  background-color: ${colors.backgroundHighlight};
`;

export const RestModalSkipText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.neutral300};
`;

export const WeightModal = styled.View`
  width: 300px;
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.xl}px;
  gap: ${spacing.md}px;
  border-width: 1px;
  border-color: ${colors.neutral600};
`;

export const WeightModalTitle = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.text};
  text-align: center;
`;

export const WeightToggleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const WeightToggleLabel = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.textSecondary};
  flex: 1;
`;

export const WeightSetRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const WeightSetLabel = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.textSecondary};
  width: 55px;
`;

export const WeightInput = styled.TextInput`
  flex: 1;
  background-color: ${colors.backgroundInput};
  border-radius: ${spacing.buttonRadius}px;
  padding-horizontal: ${spacing.md}px;
  padding-vertical: ${spacing.sm}px;
  color: ${colors.text};
  font-size: ${typography.bodyBold.fontSize}px;
  text-align: center;
`;

export const WeightUnit = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.neutral400};
  width: 24px;
`;

export const WeightSaveButton = styled.Pressable`
  padding-vertical: ${spacing.sm}px;
  border-radius: ${spacing.buttonRadius}px;
  background-color: ${colors.primary};
  align-items: center;
  margin-top: ${spacing.xs}px;
`;

export const WeightSaveButtonText = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.textInverse};
`;
