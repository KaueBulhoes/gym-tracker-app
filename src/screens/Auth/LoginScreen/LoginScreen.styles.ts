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

export const ForgotPasswordButton = styled.Pressable`
  align-self: flex-start;
`;

export const ForgotPasswordText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration-line: underline;
`;

export const ErrorText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;
