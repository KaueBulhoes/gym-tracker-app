import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
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
`;

export const HeaderTitle = styled.Text`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.neutral50};
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
  color: ${colors.text};
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
  background-color: ${colors.backgroundElevated};
  border-width: 1.5px;
  border-color: ${({ $selected }) =>
    $selected ? colors.primary : colors.border};
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
  border-color: ${({ $selected }) =>
    $selected ? colors.primary : colors.border};
  align-items: center;
  justify-content: center;
`;

export const RadioDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${colors.primary};
`;

export const RadioTextGroup = styled.View`
  gap: ${spacing.xxs}px;
`;

export const RadioLabel = styled.Text<{ $selected: boolean }>`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ $selected }) => ($selected ? colors.primary : colors.text)};
`;

export const RadioDescription = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.small.fontWeight};
  color: ${colors.textSecondary};
`;

export const Panel = styled.View`
  background-color: ${colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.md}px;
  border-width: 1px;
  border-color: ${colors.neutral600};
`;

export const PanelLabel = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.textSecondary};
`;
