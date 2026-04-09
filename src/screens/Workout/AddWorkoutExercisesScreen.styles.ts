import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.huge}px;
  padding-bottom: ${spacing.xl}px;
  background-color: ${colors.secondaryDark};
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
  flex: 1;
`;

export const BackButton = styled.Pressable`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const HeaderTitle = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.neutral50};
`;

export const SaveButton = styled.Pressable`
  padding-horizontal: ${spacing.md}px;
  padding-vertical: ${spacing.sm}px;
  border-radius: ${spacing.buttonRadius}px;
  background-color: ${colors.primary};
`;

export const SaveButtonText = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.background};
`;

export const ScrollContent = styled.ScrollView``;

export const Content = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.lg}px;
  padding-bottom: ${spacing.xxxl}px;
  gap: ${spacing.sm}px;
`;

export const DayCard = styled.Pressable<{ $expanded: boolean }>`
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  border-width: 1px;
  border-color: ${({ $expanded }) => ($expanded ? colors.secondary : colors.neutral600)};
  overflow: hidden;
`;

export const DayHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.cardPadding}px;
`;

export const DayHeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
  flex: 1;
`;

export const DayIconContainer = styled.View<{ $expanded: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $expanded }) =>
    $expanded ? 'rgba(139, 92, 246, 0.2)' : colors.backgroundHighlight};
`;

export const DayInfo = styled.View`
  flex: 1;
`;

export const DayName = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${colors.text};
`;

export const DayCount = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.textSecondary};
  margin-top: ${spacing.xxs}px;
`;

export const DayBody = styled.View`
  padding-horizontal: ${spacing.cardPadding}px;
  padding-bottom: ${spacing.cardPadding}px;
  border-top-width: 1px;
  border-top-color: ${colors.neutral600};
  gap: ${spacing.sm}px;
`;

export const ExerciseRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
  padding: ${spacing.sm}px ${spacing.md}px;
  background-color: ${colors.backgroundHighlight};
  border-radius: ${spacing.cardRadius}px;
  margin-top: ${spacing.sm}px;
`;

export const ExerciseName = styled.Text`
  flex: 1;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${colors.text};
`;

export const DeleteButton = styled.Pressable`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

export const InputRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
  margin-top: ${spacing.sm}px;
`;

export const ExerciseInput = styled.TextInput`
  flex: 1;
  height: 44px;
  background-color: ${colors.backgroundInput};
  border-radius: ${spacing.inputRadius}px;
  border-width: 1.5px;
  border-color: ${colors.border};
  padding-horizontal: ${spacing.md}px;
  font-size: ${typography.body.fontSize}px;
  color: ${colors.text};
`;

export const AddButton = styled.Pressable<{ $disabled: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: ${spacing.buttonRadius}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $disabled }) =>
    $disabled ? colors.backgroundElevated : colors.secondary};
  border-width: 1.5px;
  border-color: ${({ $disabled }) =>
    $disabled ? colors.neutral600 : colors.secondary};
`;
