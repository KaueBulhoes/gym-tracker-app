import styled from 'styled-components/native';
import { spacing, typography } from '../../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.huge}px;
  padding-bottom: ${spacing.xl}px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
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
  color: ${({ theme }) => theme.colors.onSecondary};
`;

export const SaveButton = styled.Pressable<{ $disabled?: boolean }>`
  padding-vertical: ${spacing.md}px;
  border-radius: ${spacing.buttonRadius}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-top: ${spacing.md}px;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const SaveButtonText = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.textInverse};
`;

export const ScrollContent = styled.ScrollView``;

export const Content = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.lg}px;
  padding-bottom: ${spacing.xxxl}px;
  gap: ${spacing.sm}px;
`;

export const DurationRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${spacing.md}px;
  gap: ${spacing.sm}px;
`;

export const DurationLabel = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.text};
`;

export const DurationInput = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.inputRadius}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.neutral600};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${typography.body.fontSize}px;
  padding-horizontal: ${spacing.md}px;
  padding-vertical: ${spacing.sm}px;
  width: 70px;
  text-align: center;
`;

export const DurationUnit = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DayCard = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.neutral600};
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

export const DayIconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.backgroundHighlight};
`;

export const DayInfo = styled.View`
  flex: 1;
`;

export const DayName = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
`;

export const DayCount = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${spacing.xxs}px;
`;
