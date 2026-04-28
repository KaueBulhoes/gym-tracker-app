import styled from 'styled-components/native';
import { colors } from '../../constants';

export const Track = styled.View`
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral600};
  overflow: hidden;
`;

export const Fill = styled.View<{ $progress: number; $color: string }>`
  height: 100%;
  border-radius: 4px;
  width: ${({ $progress }) => $progress * 100}%;
  background-color: ${({ $color }) => $color};
`;
