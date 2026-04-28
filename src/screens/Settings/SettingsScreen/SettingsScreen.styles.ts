import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, typography } from '../../../constants';

export const Container = styled(SafeAreaView).attrs({
  edges: ['bottom'] as const,
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const TopBar = styled.View`
  flex-direction: row;
  align-items: flex-end;
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.huge}px;
  padding-bottom: ${spacing.xl}px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
`;

export const BackButton = styled.Pressable`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: rgba(255, 255, 255, 0.15);
  align-items: center;
  justify-content: center;
  margin-right: ${spacing.md}px;
`;

export const TopBarTitle = styled.Text`
  font-size: ${typography.h2.fontSize}px;
  font-weight: ${typography.h2.fontWeight};
  color: ${({ theme }) => theme.colors.onSecondary};
`;

export const Body = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const SideMenu = styled.View`
  width: 100px;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.neutral600};
  padding-top: ${spacing.md}px;
`;

export const SideMenuItem = styled.Pressable<{ $active: boolean }>`
  padding-horizontal: ${spacing.md}px;
  padding-vertical: ${spacing.md}px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.backgroundElevated : 'transparent'};
  border-left-width: 3px;
  border-left-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
`;

export const SideMenuText = styled.Text<{ $active: boolean }>`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${({ $active }) =>
    $active ? typography.bodyBold.fontWeight : typography.body.fontWeight};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.text};
`;

export const TabContent = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-top: ${spacing.lg}px;
`;

export const Section = styled.View`
  margin-bottom: ${spacing.xl}px;
`;

export const SectionLabel = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${spacing.sm}px;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: ${spacing.md}px;
`;

export const SuccessText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.success};
  text-align: center;
`;

export const ErrorText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

export const Footer = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-vertical: ${spacing.base}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.neutral600};
`;
