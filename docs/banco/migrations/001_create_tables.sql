-- ============================================================
-- Gym Tracker — Criação de todas as tabelas
-- Rodar no Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================

-- 1. profiles (1:1 com auth.users)
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  birth_date date not null,
  height_cm integer not null,
  weight_kg numeric(5,1) not null,
  weekly_goal integer not null default 3,
  fitness_goals text[] not null default '{}',
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_user_id_unique unique (user_id)
);

-- 2. workout_plans
create table public.workout_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- 3. workout_plan_days
create table public.workout_plan_days (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.workout_plans(id) on delete cascade,
  day_name text not null,
  default_rest boolean not null default true,
  default_rest_seconds integer not null default 90,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 4. workout_plan_exercises
create table public.workout_plan_exercises (
  id uuid primary key default gen_random_uuid(),
  day_id uuid not null references public.workout_plan_days(id) on delete cascade,
  name text not null,
  sets text not null default '3',
  reps text not null default '12',
  fixed_reps boolean not null default true,
  rest_seconds integer,
  notes text,
  conjugated_id uuid references public.workout_plan_exercises(id) on delete set null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 5. exercise_rep_schemes (drop sets)
create table public.exercise_rep_schemes (
  id uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references public.workout_plan_exercises(id) on delete cascade,
  sets text not null,
  reps text not null,
  sort_order integer not null default 0
);

-- 6. workout_sessions
create table public.workout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid not null references public.workout_plans(id) on delete cascade,
  day_name text not null,
  started_at timestamptz not null,
  finished_at timestamptz not null,
  duration_seconds integer not null,
  created_at timestamptz not null default now()
);

-- 7. workout_session_weights
create table public.workout_session_weights (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.workout_sessions(id) on delete cascade,
  exercise_name text not null,
  uniform boolean not null default true,
  weights text[] not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Índices
-- ============================================================

create index idx_profiles_user_id on public.profiles(user_id);
create index idx_workout_plans_user_id on public.workout_plans(user_id);
create index idx_workout_plan_days_plan_id on public.workout_plan_days(plan_id);
create index idx_workout_plan_exercises_day_id on public.workout_plan_exercises(day_id);
create index idx_exercise_rep_schemes_exercise_id on public.exercise_rep_schemes(exercise_id);
create index idx_workout_sessions_user_id on public.workout_sessions(user_id);
create index idx_workout_sessions_plan_id on public.workout_sessions(plan_id);
create index idx_workout_sessions_finished_at on public.workout_sessions(finished_at);
create index idx_workout_session_weights_session_id on public.workout_session_weights(session_id);
create index idx_workout_session_weights_exercise_name on public.workout_session_weights(exercise_name);

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

-- Habilitar RLS em todas as tabelas
alter table public.profiles enable row level security;
alter table public.workout_plans enable row level security;
alter table public.workout_plan_days enable row level security;
alter table public.workout_plan_exercises enable row level security;
alter table public.exercise_rep_schemes enable row level security;
alter table public.workout_sessions enable row level security;
alter table public.workout_session_weights enable row level security;

-- profiles: acesso direto via user_id
create policy "profiles_select" on public.profiles for select using (auth.uid() = user_id);
create policy "profiles_insert" on public.profiles for insert with check (auth.uid() = user_id);
create policy "profiles_update" on public.profiles for update using (auth.uid() = user_id);
create policy "profiles_delete" on public.profiles for delete using (auth.uid() = user_id);

-- workout_plans: acesso direto via user_id
create policy "workout_plans_select" on public.workout_plans for select using (auth.uid() = user_id);
create policy "workout_plans_insert" on public.workout_plans for insert with check (auth.uid() = user_id);
create policy "workout_plans_update" on public.workout_plans for update using (auth.uid() = user_id);
create policy "workout_plans_delete" on public.workout_plans for delete using (auth.uid() = user_id);

-- workout_plan_days: via JOIN com workout_plans
create policy "workout_plan_days_select" on public.workout_plan_days for select
  using (exists (select 1 from public.workout_plans where id = plan_id and user_id = auth.uid()));
create policy "workout_plan_days_insert" on public.workout_plan_days for insert
  with check (exists (select 1 from public.workout_plans where id = plan_id and user_id = auth.uid()));
create policy "workout_plan_days_update" on public.workout_plan_days for update
  using (exists (select 1 from public.workout_plans where id = plan_id and user_id = auth.uid()));
create policy "workout_plan_days_delete" on public.workout_plan_days for delete
  using (exists (select 1 from public.workout_plans where id = plan_id and user_id = auth.uid()));

-- workout_plan_exercises: via JOIN com workout_plan_days → workout_plans
create policy "workout_plan_exercises_select" on public.workout_plan_exercises for select
  using (exists (
    select 1 from public.workout_plan_days d
    join public.workout_plans p on p.id = d.plan_id
    where d.id = day_id and p.user_id = auth.uid()
  ));
create policy "workout_plan_exercises_insert" on public.workout_plan_exercises for insert
  with check (exists (
    select 1 from public.workout_plan_days d
    join public.workout_plans p on p.id = d.plan_id
    where d.id = day_id and p.user_id = auth.uid()
  ));
create policy "workout_plan_exercises_update" on public.workout_plan_exercises for update
  using (exists (
    select 1 from public.workout_plan_days d
    join public.workout_plans p on p.id = d.plan_id
    where d.id = day_id and p.user_id = auth.uid()
  ));
create policy "workout_plan_exercises_delete" on public.workout_plan_exercises for delete
  using (exists (
    select 1 from public.workout_plan_days d
    join public.workout_plans p on p.id = d.plan_id
    where d.id = day_id and p.user_id = auth.uid()
  ));

-- exercise_rep_schemes: via JOIN com workout_plan_exercises → ... → workout_plans
create policy "exercise_rep_schemes_select" on public.exercise_rep_schemes for select
  using (exists (
    select 1 from public.workout_plan_exercises e
    join public.workout_plan_days d on d.id = e.day_id
    join public.workout_plans p on p.id = d.plan_id
    where e.id = exercise_id and p.user_id = auth.uid()
  ));
create policy "exercise_rep_schemes_insert" on public.exercise_rep_schemes for insert
  with check (exists (
    select 1 from public.workout_plan_exercises e
    join public.workout_plan_days d on d.id = e.day_id
    join public.workout_plans p on p.id = d.plan_id
    where e.id = exercise_id and p.user_id = auth.uid()
  ));
create policy "exercise_rep_schemes_update" on public.exercise_rep_schemes for update
  using (exists (
    select 1 from public.workout_plan_exercises e
    join public.workout_plan_days d on d.id = e.day_id
    join public.workout_plans p on p.id = d.plan_id
    where e.id = exercise_id and p.user_id = auth.uid()
  ));
create policy "exercise_rep_schemes_delete" on public.exercise_rep_schemes for delete
  using (exists (
    select 1 from public.workout_plan_exercises e
    join public.workout_plan_days d on d.id = e.day_id
    join public.workout_plans p on p.id = d.plan_id
    where e.id = exercise_id and p.user_id = auth.uid()
  ));

-- workout_sessions: acesso direto via user_id
create policy "workout_sessions_select" on public.workout_sessions for select using (auth.uid() = user_id);
create policy "workout_sessions_insert" on public.workout_sessions for insert with check (auth.uid() = user_id);
create policy "workout_sessions_update" on public.workout_sessions for update using (auth.uid() = user_id);
create policy "workout_sessions_delete" on public.workout_sessions for delete using (auth.uid() = user_id);

-- workout_session_weights: via JOIN com workout_sessions
create policy "workout_session_weights_select" on public.workout_session_weights for select
  using (exists (select 1 from public.workout_sessions where id = session_id and user_id = auth.uid()));
create policy "workout_session_weights_insert" on public.workout_session_weights for insert
  with check (exists (select 1 from public.workout_sessions where id = session_id and user_id = auth.uid()));
create policy "workout_session_weights_update" on public.workout_session_weights for update
  using (exists (select 1 from public.workout_sessions where id = session_id and user_id = auth.uid()));
create policy "workout_session_weights_delete" on public.workout_session_weights for delete
  using (exists (select 1 from public.workout_sessions where id = session_id and user_id = auth.uid()));

-- ============================================================
-- Trigger: atualizar updated_at automaticamente em profiles
-- ============================================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();
