export type Workout = {
  id: string;
  type: string;
  description: string;
  durationMinutes: number;
  completedAt?: string;
};

export type WeeklyGoal = {
  target: number;
  completed: number;
};

export type UserProfile = {
  name: string;
};

export const mockUser: UserProfile = {
  name: 'Atleta',
};

export const mockWeeklyGoal: WeeklyGoal = {
  target: 5,
  completed: 4,
};

export const mockWorkoutPlan: Workout[] = [
  {
    id: '1',
    type: 'A',
    description: 'Peito',
    durationMinutes: 45,
  },
  {
    id: '2',
    type: 'B',
    description: 'Costas',
    durationMinutes: 50,
  },
  {
    id: '3',
    type: 'C',
    description: 'Perna - Quadríceps',
    durationMinutes: 60,
  },
  {
    id: '4',
    type: 'D',
    description: 'Ombros e Braços',
    durationMinutes: 40,
  },
];

export const mockRecentWorkouts: Workout[] = [
  {
    id: '101',
    type: 'A',
    description: 'Peito',
    durationMinutes: 45,
    completedAt: '2026-04-07T10:00:00Z',
  },
  {
    id: '102',
    type: 'D',
    description: 'Ombros e Braços',
    durationMinutes: 40,
    completedAt: '2026-04-05T09:30:00Z',
  },
  {
    id: '103',
    type: 'C',
    description: 'Perna - Quadríceps',
    durationMinutes: 60,
    completedAt: '2026-04-03T08:00:00Z',
  },
];

export const mockLastWorkout: Workout = mockRecentWorkouts[0];

export const mockNextWorkout: Workout = mockWorkoutPlan[1];

export const mockMonthlyTotal = 12;
