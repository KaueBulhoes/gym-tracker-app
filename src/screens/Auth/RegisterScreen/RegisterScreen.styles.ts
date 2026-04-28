import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../../constants';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView`
  padding-horizontal: ${spacing.screenHorizontal}px;
  padding-vertical: ${spacing.xxxl}px;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: ${spacing.xxxl}px;
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

export const Form = styled.View`
  gap: ${spacing.base}px;
`;

export const ErrorText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.overlay};
  justify-content: center;
  align-items: center;
  padding-horizontal: ${spacing.screenHorizontal}px;
`;

export const ModalCard = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.xxl}px;
  width: 100%;
  align-items: center;
`;

export const ModalIcon = styled.Text`
  font-size: 48px;
  margin-bottom: ${spacing.base}px;
`;

export const ModalTitle = styled.Text`
  font-size: ${typography.h2.fontSize}px;
  font-weight: ${typography.h2.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${spacing.md}px;
`;

export const ModalMessage = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  line-height: ${typography.body.lineHeight}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${spacing.xl}px;
`;
