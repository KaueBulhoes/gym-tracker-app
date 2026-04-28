import React, { useEffect, useMemo, useState } from 'react';
import { Modal, StatusBar, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import { spacing } from '../../constants';
import {
  ALL_EXERCISES,
  type WorkloadChartDays,
  type WorkloadChartExercise,
} from '../../hooks/useWorkloadChartPrefs';
import {
  buildWorkloadSeries,
  filterSeriesByExercise,
  listExerciseNames,
} from '../../utils/workloadEvolution';
import type { WorkoutSession } from '../../types/workout';
import WorkloadChart from '../WorkloadChart';
import { seriesColorForIndex } from '../WorkloadChart/seriesColors';
import {
  Backdrop,
  ChartArea,
  CloseButton,
  Container,
  Controls,
  DropdownItem,
  DropdownItemText,
  DropdownList,
  DropdownTrigger,
  DropdownTriggerText,
  DropdownWrapper,
  LandscapeFrame,
  LegendArea,
  LegendDot,
  LegendItem,
  LegendLabel,
  LegendScroll,
  Title,
  TopBar,
} from './WorkloadEvolutionModal.styles';

interface WorkloadEvolutionModalProps {
  visible: boolean;
  onClose: () => void;
  sessions: WorkoutSession[];
  exercise: WorkloadChartExercise;
  days: WorkloadChartDays;
  onChangeExercise: (value: WorkloadChartExercise) => void;
  onChangeDays: (value: WorkloadChartDays) => void;
}

const DAYS_OPTIONS: WorkloadChartDays[] = [30, 60, 90];

type DropdownOpen = 'exercise' | 'days' | null;

const WorkloadEvolutionModal: React.FC<WorkloadEvolutionModalProps> = ({
  visible,
  onClose,
  sessions,
  exercise,
  days,
  onChangeExercise,
  onChangeDays,
}) => {
  const { colors } = useTheme();
  const { width: winW, height: winH } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState<DropdownOpen>(null);

  useEffect(() => {
    if (!visible) {
      setOpen(null);
    }
  }, [visible]);

  const landscapeWidth = winH;
  const landscapeHeight = winW;

  // Mapeia os insets de portrait para o frame rotacionado 90° (clockwise):
  // - portrait top (status bar/notch) → frame.left
  // - portrait bottom (gesture bar)   → frame.right
  // - portrait right                  → frame.top
  // - portrait left                   → frame.bottom
  const framePaddingLeft = insets.top;
  const framePaddingRight = insets.bottom;
  const framePaddingTop = insets.right;
  const framePaddingBottom = insets.left;

  const exerciseNames = useMemo(() => listExerciseNames(sessions), [sessions]);

  const series = useMemo(() => buildWorkloadSeries(sessions, days), [sessions, days]);

  const visibleSeries = useMemo(() => {
    if (exercise === ALL_EXERCISES) {
      return series;
    }
    return filterSeriesByExercise(series, exercise);
  }, [series, exercise]);

  const exerciseLabel =
    exercise === ALL_EXERCISES ? 'Todos os exercícios' : exercise;

  const showLegend = exercise === ALL_EXERCISES && visibleSeries.length > 1;

  const chartHorizontalPadding = spacing.lg * 2;
  const chartTopOffset = 64;
  const chartBottomOffset = spacing.sm;
  const legendHeight = showLegend ? 36 : 0;
  const chartWidth = Math.max(
    0,
    landscapeWidth - framePaddingLeft - framePaddingRight - chartHorizontalPadding,
  );
  const chartHeight = Math.max(
    140,
    landscapeHeight -
      framePaddingTop -
      framePaddingBottom -
      chartTopOffset -
      chartBottomOffset -
      legendHeight,
  );

  const handlePickExercise = (value: WorkloadChartExercise) => {
    onChangeExercise(value);
    setOpen(null);
  };

  const handlePickDays = (value: WorkloadChartDays) => {
    onChangeDays(value);
    setOpen(null);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent={false}
    >
      <StatusBar hidden />
      <Container>
        <LandscapeFrame
          style={{
            width: landscapeWidth,
            height: landscapeHeight,
            paddingLeft: framePaddingLeft,
            paddingRight: framePaddingRight,
            paddingTop: framePaddingTop,
            paddingBottom: framePaddingBottom,
          }}
        >
          <Backdrop
            onPress={() => setOpen(null)}
            accessible={false}
          >
            <TopBar>
              <Title numberOfLines={1}>Evolução de Carga</Title>
              <CloseButton
                onPress={onClose}
                accessibilityLabel="Fechar gráfico"
              >
                <MaterialCommunityIcons
                  name="close"
                  size={spacing.iconSize.md}
                  color={colors.text}
                />
              </CloseButton>
            </TopBar>

            <Controls>
              <DropdownWrapper $flex={2}>
                <DropdownTrigger
                  onPress={() =>
                    setOpen(open === 'exercise' ? null : 'exercise')
                  }
                  accessibilityLabel="Selecionar exercício"
                  $active={open === 'exercise'}
                >
                  <DropdownTriggerText numberOfLines={1}>
                    {exerciseLabel}
                  </DropdownTriggerText>
                  <MaterialCommunityIcons
                    name={open === 'exercise' ? 'chevron-up' : 'chevron-down'}
                    size={spacing.iconSize.sm}
                    color={colors.text}
                  />
                </DropdownTrigger>
                {open === 'exercise' && (
                  <DropdownList>
                    <DropdownItem
                      onPress={() => handlePickExercise(ALL_EXERCISES)}
                      $selected={exercise === ALL_EXERCISES}
                    >
                      <DropdownItemText
                        $selected={exercise === ALL_EXERCISES}
                      >
                        Todos os exercícios
                      </DropdownItemText>
                    </DropdownItem>
                    {exerciseNames.map((name) => (
                      <DropdownItem
                        key={name}
                        onPress={() => handlePickExercise(name)}
                        $selected={exercise === name}
                      >
                        <DropdownItemText
                          $selected={exercise === name}
                          numberOfLines={1}
                        >
                          {name}
                        </DropdownItemText>
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )}
              </DropdownWrapper>

              <DropdownWrapper $flex={1}>
                <DropdownTrigger
                  onPress={() => setOpen(open === 'days' ? null : 'days')}
                  accessibilityLabel="Selecionar período em dias"
                  $active={open === 'days'}
                >
                  <DropdownTriggerText>{days} dias</DropdownTriggerText>
                  <MaterialCommunityIcons
                    name={open === 'days' ? 'chevron-up' : 'chevron-down'}
                    size={spacing.iconSize.sm}
                    color={colors.text}
                  />
                </DropdownTrigger>
                {open === 'days' && (
                  <DropdownList>
                    {DAYS_OPTIONS.map((value) => (
                      <DropdownItem
                        key={value}
                        onPress={() => handlePickDays(value)}
                        $selected={days === value}
                      >
                        <DropdownItemText $selected={days === value}>
                          {value} dias
                        </DropdownItemText>
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )}
              </DropdownWrapper>
            </Controls>

            <ChartArea>
              <WorkloadChart
                series={visibleSeries}
                totalDays={days}
                width={chartWidth}
                height={chartHeight}
                variant="full"
              />
            </ChartArea>

            {showLegend && (
              <LegendArea style={{ height: legendHeight }}>
                <LegendScroll horizontal>
                  {visibleSeries.map((s, idx) => (
                    <LegendItem key={s.exerciseName}>
                      <LegendDot $color={seriesColorForIndex(idx)} />
                      <LegendLabel numberOfLines={1}>
                        {s.exerciseName}
                      </LegendLabel>
                    </LegendItem>
                  ))}
                </LegendScroll>
              </LegendArea>
            )}
          </Backdrop>
        </LandscapeFrame>
      </Container>
    </Modal>
  );
};

export default WorkloadEvolutionModal;
