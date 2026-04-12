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

export const SaveButton = styled.Pressable<{ $disabled?: boolean }>`
  padding-vertical: ${spacing.md}px;
  border-radius: ${spacing.buttonRadius}px;
  background-color: ${colors.primary};
  align-items: center;
  justify-content: center;
  margin-top: ${spacing.md}px;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
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

export const DayCard = styled.Pressable`
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  border-width: 1px;
  border-color: ${colors.neutral600};
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
  background-color: ${colors.backgroundHighlight};
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
