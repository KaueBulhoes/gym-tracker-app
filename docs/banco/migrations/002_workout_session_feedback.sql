-- ============================================================
-- Gym Tracker — Feedback do treino
-- Adiciona tabela única para feedback de intensidade, comentário
-- e exercícios em que o usuário sentiu dificuldade.
-- Rodar no Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================

-- 1. workout_session_feedback (1:1 com workout_sessions)
create table public.workout_session_feedback (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.workout_sessions(id) on delete cascade,
  intensity text not null check (intensity in ('light', 'moderate', 'intense')),
  difficult_exercises text[] not null default '{}',
  comment text,
  created_at timestamptz not null default now(),
  constraint workout_session_feedback_session_id_unique unique (session_id)
);

-- ============================================================
-- Índices
-- ============================================================

create index idx_workout_session_feedback_session_id on public.workout_session_feedback(session_id);

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

alter table public.workout_session_feedback enable row level security;

-- workout_session_feedback: via JOIN com workout_sessions
create policy "workout_session_feedback_select" on public.workout_session_feedback for select
  using (exists (select 1 from public.workout_sessions where id = session_id and user_id = auth.uid()));
create policy "workout_session_feedback_insert" on public.workout_session_feedback for insert
  with check (exists (select 1 from public.workout_sessions where id = session_id and user_id = auth.uid()));
create policy "workout_session_feedback_update" on public.workout_session_feedback for update
  using (exists (select 1 from public.workout_sessions where id = session_id and user_id = auth.uid()));
create policy "workout_session_feedback_delete" on public.workout_session_feedback for delete
  using (exists (select 1 from public.workout_sessions where id = session_id and user_id = auth.uid()));
