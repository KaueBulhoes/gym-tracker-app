import styled from 'styled-components/native';
import { spacing, typography } from '../../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const KeyboardArea = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Header = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.huge}px;
  padding-bottom: ${spacing.xl}px;
  min-height: 132px;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
`;

export const HeaderRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const HeaderLeft = styled.View`
  width: 60px;
`;

export const HeaderCenter = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const HeaderRight = styled.View`
  width: 60px;
`;

export const BackButton = styled.Pressable`
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const HeaderTitle = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.onSecondary};
`;

export const HeaderSubtitle = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.onSecondaryMuted};
  margin-top: ${spacing.xxs}px;
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
`;

export const Content = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.lg}px;
  gap: ${spacing.lg}px;
`;

export const TimerWrapper = styled.View`
  align-items: center;
  padding-vertical: ${spacing.sm}px;
`;

export const TimerLabel = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${spacing.xs}px;
`;

export const TimerText = styled.Text`
  font-size: 40px;
  font-weight: ${typography.number.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
  font-variant: tabular-nums;
`;

export const MotivationalCard = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.base}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const MotivationalText = styled.Text`
  flex: 1;
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${typography.body.lineHeight}px;
`;

export const OptionalHint = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CommentLabel = styled.View`
  gap: ${spacing.xs}px;
`;

export const CommentLabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CommentLabelText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.neutral200};
`;

export const CommentInput = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.backgroundInput};
  border-radius: ${spacing.inputRadius}px;
  padding: ${spacing.base}px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  min-height: 100px;
`;

export const Footer = styled.View<{ $bottomInset: number }>`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.md}px;
  padding-bottom: ${({ $bottomInset }) => spacing.md + $bottomInset}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.neutral600};
`;

export const ConcludeButton = styled.Pressable<{ $disabled: boolean }>`
  padding-vertical: ${spacing.md}px;
  border-radius: ${spacing.buttonRadius}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const ConcludeButtonText = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.textInverse};
`;
