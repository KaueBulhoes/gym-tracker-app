import React, { useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import Svg, { Circle, G, Line, Path, Text as SvgText } from 'react-native-svg';
import type { WorkloadSeries } from '../../utils/workloadEvolution';
import { seriesColorForIndex } from './seriesColors';
import {
  ChartContainer,
  EmptyMessage,
  EmptyWrapper,
} from './WorkloadChart.styles';

interface WorkloadChartProps {
  series: WorkloadSeries[];
  totalDays: number;
  width: number;
  height: number;
  variant?: 'full' | 'preview';
}

const niceMax = (raw: number): number => {
  if (raw <= 0) {
    return 10;
  }
  const exponent = Math.floor(Math.log10(raw));
  const fraction = raw / Math.pow(10, exponent);
  let nice: number;
  if (fraction <= 1) {
    nice = 1;
  } else if (fraction <= 2) {
    nice = 2;
  } else if (fraction <= 5) {
    nice = 5;
  } else {
    nice = 10;
  }
  return nice * Math.pow(10, exponent);
};

const WorkloadChart: React.FC<WorkloadChartProps> = ({
  series,
  totalDays,
  width,
  height,
  variant = 'full',
}) => {
  const { colors } = useTheme();

  const isPreview = variant === 'preview';
  const padding = isPreview
    ? { top: 4, right: 6, bottom: 4, left: 6 }
    : { top: 16, right: 20, bottom: 32, left: 44 };

  const innerWidth = Math.max(0, width - padding.left - padding.right);
  const innerHeight = Math.max(0, height - padding.top - padding.bottom);

  const { maxWeight, hasData } = useMemo(() => {
    let max = 0;
    let any = false;
    for (const s of series) {
      for (const p of s.points) {
        any = true;
        if (p.weight > max) {
          max = p.weight;
        }
      }
    }
    return { maxWeight: max, hasData: any };
  }, [series]);

  const yMax = niceMax(maxWeight);
  const xMax = Math.max(1, totalDays - 1);

  const xFor = (dayOffset: number): number =>
    padding.left + (dayOffset / xMax) * innerWidth;

  const yFor = (weight: number): number =>
    padding.top + innerHeight - (weight / yMax) * innerHeight;

  const yTicks = useMemo(() => {
    const count = 4;
    const ticks: number[] = [];
    for (let i = 0; i <= count; i += 1) {
      ticks.push((yMax / count) * i);
    }
    return ticks;
  }, [yMax]);

  const xTicks = useMemo(() => {
    const count = 4;
    const ticks: number[] = [];
    for (let i = 0; i <= count; i += 1) {
      ticks.push(Math.round((xMax / count) * i));
    }
    return ticks;
  }, [xMax]);

  if (!hasData) {
    return (
      <EmptyWrapper style={{ width, height }}>
        <EmptyMessage>
          {isPreview
            ? 'Sem dados'
            : 'Nenhuma carga registrada no período selecionado.'}
        </EmptyMessage>
      </EmptyWrapper>
    );
  }

  return (
    <ChartContainer>
      <Svg width={width} height={height}>
        {!isPreview &&
          yTicks.map((tick) => {
            const y = yFor(tick);
            return (
              <G key={`y-${tick}`}>
                <Line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + innerWidth}
                  y2={y}
                  stroke={colors.border}
                  strokeWidth={1}
                  strokeDasharray="3,4"
                />
                <SvgText
                  x={padding.left - 8}
                  y={y + 4}
                  fontSize={11}
                  fill={colors.textSecondary}
                  textAnchor="end"
                >
                  {Math.round(tick)}
                </SvgText>
              </G>
            );
          })}

        {!isPreview && (
          <>
            <Line
              x1={padding.left}
              y1={padding.top}
              x2={padding.left}
              y2={padding.top + innerHeight}
              stroke={colors.neutral500}
              strokeWidth={1}
            />
            <Line
              x1={padding.left}
              y1={padding.top + innerHeight}
              x2={padding.left + innerWidth}
              y2={padding.top + innerHeight}
              stroke={colors.neutral500}
              strokeWidth={1}
            />
          </>
        )}

        {!isPreview &&
          xTicks.map((tick) => {
            const x = xFor(tick);
            const y = padding.top + innerHeight;
            const label = tick === 0 ? '-' + (totalDays - 1) + 'd' : tick === xMax ? 'hoje' : '-' + (totalDays - 1 - tick) + 'd';
            return (
              <G key={`x-${tick}`}>
                <Line
                  x1={x}
                  y1={y}
                  x2={x}
                  y2={y + 4}
                  stroke={colors.neutral500}
                  strokeWidth={1}
                />
                <SvgText
                  x={x}
                  y={y + 18}
                  fontSize={11}
                  fill={colors.textSecondary}
                  textAnchor="middle"
                >
                  {label}
                </SvgText>
              </G>
            );
          })}

        {series.map((s, seriesIndex) => {
          if (s.points.length === 0) {
            return null;
          }
          const stroke = seriesColorForIndex(seriesIndex);
          const path = s.points
            .map((p, idx) => {
              const x = xFor(p.dayOffset);
              const y = yFor(p.weight);
              return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');

          return (
            <G key={s.exerciseName}>
              <Path
                d={path}
                stroke={stroke}
                strokeWidth={isPreview ? 1.5 : 2.5}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {!isPreview &&
                s.points.map((p) => (
                  <Circle
                    key={`${s.exerciseName}-${p.dayOffset}`}
                    cx={xFor(p.dayOffset)}
                    cy={yFor(p.weight)}
                    r={3}
                    fill={stroke}
                  />
                ))}
            </G>
          );
        })}
      </Svg>
    </ChartContainer>
  );
};

export default WorkloadChart;
