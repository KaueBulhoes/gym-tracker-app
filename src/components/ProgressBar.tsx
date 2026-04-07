import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../constants';

interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  color = colors.primary,
}) => {
  const progress = total > 0 ? Math.min(current / total, 1) : 0;

  return (
    <Track>
      <Fill $progress={progress} $color={color} />
    </Track>
  );
};

const Track = styled.View`
  height: 8px;
  border-radius: 4px;
  background-color: ${colors.neutral600};
  overflow: hidden;
`;

const Fill = styled.View<{ $progress: number; $color: string }>`
  height: 100%;
  border-radius: 4px;
  width: ${({ $progress }) => $progress * 100}%;
  background-color: ${({ $color }) => $color};
`;

export default ProgressBar;
