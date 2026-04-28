import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../../constants';

export const Container = styled(SafeAreaView).attrs({
  edges: ['bottom'] as const,
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding-horizontal: ${spacing.screenHorizontal}px;
`;

export const Header = styled.View`
  margin-top: ${spacing.xxxl}px;
  margin-bottom: ${spacing.xxl}px;
`;

export const Title = styled.Text`
  font-size: ${typography.h1.fontSize}px;
  font-weight: ${typography.h1.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${spacing.sm}px;
`;

export const Subtitle = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
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

export const ErrorText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin-top: ${spacing.sm}px;
`;

export const Footer = styled.View`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-vertical: ${spacing.base}px;
`;
