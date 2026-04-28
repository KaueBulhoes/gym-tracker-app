import styled from 'styled-components/native';
import { spacing, typography } from '../../constants';

export const CardContainer = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.backgroundElevated};
  border-radius: ${spacing.cardRadius}px;
  padding: ${spacing.base}px;
  margin-bottom: ${spacing.sm}px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.xs}px;
`;

export const CardTitle = styled.Text`
  flex: 1;
  font-size: ${typography.bodyBold.fontSize}px;
  font-weight: ${typography.bodyBold.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${spacing.xs}px;
`;

export const CardSubtitle = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${spacing.xs}px;
`;

export const PreviewArea = styled.View`
  margin-top: ${spacing.sm}px;
  align-items: center;
  justify-content: center;
  min-height: 96px;
`;

export const EmptyText = styled.Text`
  font-size: ${typography.small.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding-vertical: ${spacing.md}px;
`;
