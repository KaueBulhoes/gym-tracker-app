import styled from 'styled-components/native';
import { spacing, typography } from '../../constants';

export const ChartContainer = styled.View`
  flex-direction: column;
`;

export const EmptyWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

export const EmptyMessage = styled.Text`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding-horizontal: ${spacing.md}px;
`;
