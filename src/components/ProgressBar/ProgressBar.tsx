import React from 'react';
import { useTheme } from 'styled-components/native';
import { Track, Fill } from './ProgressBar.styles';

interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, color }) => {
  const { colors } = useTheme();
  const progress = total > 0 ? Math.min(current / total, 1) : 0;
  const fillColor = color ?? colors.primary;

  return (
    <Track>
      <Fill $progress={progress} $color={fillColor} />
    </Track>
  );
};

export default ProgressBar;
