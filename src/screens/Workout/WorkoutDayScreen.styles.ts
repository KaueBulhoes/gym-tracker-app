import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.huge}px;
  padding-bottom: ${spacing.xl}px;
  background-color: ${colors.secondaryDark};
`;

export const BackButton = styled.Pressable`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-right: ${spacing.md}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.neutral50};
  flex: 1;
`;

export const ScrollContent = styled.ScrollView``;

export const Content = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.lg}px;
  padding-bottom: ${spacing.xxxl}px;
  gap: ${spacing.md}px;
`;

/* Toggle Section */

export const ToggleSection = styled.View`
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.cardPadding}px;
  gap: ${spacing.sm}px;
  border-width: 1px;
  border-color: ${colors.neutral600};
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ToggleLabel = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${colors.text};
  flex: 1;
  margin-right: ${spacing.md}px;
`;

export const RestInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const RestInput = styled.TextInput`
  width: 80px;
  height: 44px;
  background-color: ${colors.backgroundInput};
  border-radius: ${spacing.inputRadius}px;
  border-width: 1.5px;
  border-color: ${colors.secondary};
  padding-horizontal: ${spacing.md}px;
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.text};
  text-align: center;
`;

export const RestUnit = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${colors.textSecondary};
`;

/* Exercise Cards */

export const ExerciseCard = styled.View`
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.cardPadding}px;
  border-width: 1px;
  border-color: ${colors.neutral600};
  gap: ${spacing.xs}px;
`;

export const ExerciseCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const ExerciseName = styled.Text`
  flex: 1;
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.text};
`;

export const ExerciseMeta = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.textSecondary};
  padding-left: ${spacing.xxl}px;
`;

export const DeleteButton = styled.Pressable`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

/* Add Exercise Button */

export const AddExerciseButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  background-color: ${colors.primary};
  border-radius: ${spacing.cardRadius}px;
  padding-vertical: ${spacing.md}px;
  margin-top: ${spacing.sm}px;
`;

export const AddExerciseButtonText = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.background};
`;

/* Dialog / Modal */

export const Overlay = styled.View`
  flex: 1;
  background-color: ${colors.overlay};
  align-items: center;
  justify-content: center;
  padding-horizontal: ${spacing.xl}px;
`;

export const Dialog = styled.View`
  width: 100%;
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.xl}px;
  gap: ${spacing.md}px;
  border-width: 1px;
  border-color: ${colors.neutral600};
`;

export const DialogTitle = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.text};
  margin-bottom: ${spacing.xs}px;
`;

export const DialogInput = styled.TextInput`
  height: 48px;
  background-color: ${colors.backgroundInput};
  border-radius: ${spacing.inputRadius}px;
  border-width: 1.5px;
  border-color: ${colors.border};
  padding-horizontal: ${spacing.md}px;
  font-size: ${typography.body.fontSize}px;
  color: ${colors.text};
`;

export const DialogRow = styled.View`
  flex-direction: row;
  gap: ${spacing.sm}px;
  margin-top: ${spacing.xs}px;
`;

export const CancelButton = styled.Pressable`
  flex: 1;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: ${spacing.buttonRadius}px;
  border-width: 1.5px;
  border-color: ${colors.neutral500};
`;

export const CancelButtonText = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.textSecondary};
`;

export const ConfirmButton = styled.Pressable`
  flex: 2;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: ${spacing.buttonRadius}px;
  background-color: ${colors.primary};
`;

export const ConfirmButtonText = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.background};
`;
