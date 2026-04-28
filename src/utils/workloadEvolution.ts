import type { WorkoutSession } from '../types/workout';

export type WorkloadPoint = {
  dayOffset: number;
  date: string;
  weight: number;
};

export type WorkloadSeries = {
  exerciseName: string;
  points: WorkloadPoint[];
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const startOfDay = (date: Date): Date => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const sessionMaxWeight = (weights: string[]): number => {
  let max = 0;
  for (const raw of weights) {
    const value = parseFloat(raw);
    if (!isNaN(value) && value > max) {
      max = value;
    }
  }
  return max;
};

export const listExerciseNames = (sessions: WorkoutSession[]): string[] => {
  const names = new Set<string>();
  for (const session of sessions) {
    for (const ew of session.exerciseWeights) {
      if (sessionMaxWeight(ew.weights) > 0) {
        names.add(ew.exerciseName);
      }
    }
  }
  return Array.from(names).sort((a, b) => a.localeCompare(b, 'pt-BR'));
};

export const buildWorkloadSeries = (
  sessions: WorkoutSession[],
  days: number,
): WorkloadSeries[] => {
  const today = startOfDay(new Date());
  const windowStart = new Date(today.getTime() - (days - 1) * MS_PER_DAY);

  const grouped = new Map<string, Map<number, number>>();

  for (const session of sessions) {
    const finished = new Date(session.finishedAt);
    if (isNaN(finished.getTime())) {
      continue;
    }
    const sessionDay = startOfDay(finished);
    if (sessionDay < windowStart || sessionDay > today) {
      continue;
    }
    const dayOffset = Math.round(
      (sessionDay.getTime() - windowStart.getTime()) / MS_PER_DAY,
    );

    for (const ew of session.exerciseWeights) {
      const maxWeight = sessionMaxWeight(ew.weights);
      if (maxWeight <= 0) {
        continue;
      }
      let perExercise = grouped.get(ew.exerciseName);
      if (!perExercise) {
        perExercise = new Map();
        grouped.set(ew.exerciseName, perExercise);
      }
      const existing = perExercise.get(dayOffset) ?? 0;
      if (maxWeight > existing) {
        perExercise.set(dayOffset, maxWeight);
      }
    }
  }

  const series: WorkloadSeries[] = [];
  for (const [name, byDay] of grouped) {
    const points: WorkloadPoint[] = Array.from(byDay.entries())
      .sort(([a], [b]) => a - b)
      .map(([dayOffset, weight]) => {
        const date = new Date(windowStart.getTime() + dayOffset * MS_PER_DAY);
        return {
          dayOffset,
          date: date.toISOString(),
          weight,
        };
      });
    series.push({ exerciseName: name, points });
  }

  series.sort((a, b) => a.exerciseName.localeCompare(b.exerciseName, 'pt-BR'));
  return series;
};

export const filterSeriesByExercise = (
  series: WorkloadSeries[],
  exerciseName: string | null,
): WorkloadSeries[] => {
  if (!exerciseName) {
    return series;
  }
  return series.filter((s) => s.exerciseName === exerciseName);
};
