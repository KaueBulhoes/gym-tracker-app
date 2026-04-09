import React from 'react';
import { colors } from '../../constants';
import { Track, Fill } from './ProgressBar.styles';

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

export default ProgressBar;
