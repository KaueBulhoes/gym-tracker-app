import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../constants';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${colors.background};
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
  color: ${colors.primary};
  margin-bottom: ${spacing.sm}px;
`;

export const Subtitle = styled.Text`
  font-size: ${typography.body.fontSize}px;
  font-weight: ${typography.body.fontWeight};
  color: ${colors.textSecondary};
`;

export const Form = styled.View`
  gap: ${spacing.base}px;
`;

export const ErrorText = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${colors.error};
  text-align: center;
`;
