import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../constants';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.cardPadding}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.neutral600};
`;

export const IconContainer = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ theme }) => theme.colors.backgroundHighlight};
  align-items: center;
  justify-content: center;
  margin-right: ${spacing.md}px;
`;

export const Info = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
`;

export const Subtitle = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${spacing.xxs}px;
`;
