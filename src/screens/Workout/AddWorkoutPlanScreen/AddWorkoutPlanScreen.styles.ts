import styled from 'styled-components/native';
import { spacing, typography } from '../../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.huge}px;
  padding-bottom: ${spacing.xl}px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
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

export const ScrollContent = styled.ScrollView``;

export const Content = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.xl}px;
  padding-bottom: 55px;
  gap: ${spacing.base}px;
`;

export const SectionLabel = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
`;

export const RadioGroup = styled.View`
  gap: ${spacing.sm}px;
`;

export const RadioOption = styled.Pressable<{ $selected: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.md}px;
  border-radius: ${spacing.cardRadius}px;
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-width: 1.5px;
  border-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : theme.colors.border};
`;

export const RadioLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
`;

export const RadioCircle = styled.View<{ $selected: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  border-width: 2px;
  border-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : theme.colors.border};
  align-items: center;
  justify-content: center;
`;

export const RadioDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const RadioTextGroup = styled.View`
  gap: ${spacing.xxs}px;
`;

export const RadioLabel = styled.Text<{ $selected: boolean }>`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : theme.colors.text};
`;

export const RadioDescription = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Panel = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.neutral600};
`;

export const PanelLabel = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
