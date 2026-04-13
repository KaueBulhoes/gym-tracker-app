# Tabela: profiles

**Status:** A criar

## Descrição

Dados do perfil do usuário, preenchidos no onboarding (primeiro login) e editáveis nas configurações. Relação 1:1 com `auth.users`.

## Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | PK |
| `user_id` | `uuid` | NOT NULL | — | FK → `auth.users.id`, UNIQUE |
| `first_name` | `text` | NOT NULL | — | Nome |
| `last_name` | `text` | NOT NULL | — | Sobrenome |
| `birth_date` | `date` | NOT NULL | — | Data de nascimento |
| `height_cm` | `integer` | NOT NULL | — | Altura em centímetros |
| `weight_kg` | `numeric(5,1)` | NOT NULL | — | Peso em quilos |
| `weekly_goal` | `integer` | NOT NULL | `3` | Meta de treinos por semana (1–7) |
| `fitness_goals` | `text[]` | NOT NULL | `'{}'` | Array de objetivos: hypertrophy, weight_loss, maintenance, wellness |
| `onboarding_completed_at` | `timestamptz` | NULL | — | Quando completou o onboarding |
| `created_at` | `timestamptz` | NOT NULL | `now()` | Criação do registro |
| `updated_at` | `timestamptz` | NOT NULL | `now()` | Última atualização |

## Índices

- PK: `id`
- UNIQUE: `user_id`

## RLS

- `SELECT / INSERT / UPDATE / DELETE`: `auth.uid() = user_id`

## Mapeamento com o código

| Coluna DB | Campo TypeScript | Arquivo |
|-----------|-----------------|---------|
| `first_name` | `UserProfile.firstName` | `src/types/profile.ts` |
| `last_name` | `UserProfile.lastName` | `src/types/profile.ts` |
| `birth_date` | `UserProfile.birthDate` | `src/types/profile.ts` |
| `height_cm` | `UserProfile.heightCm` | `src/types/profile.ts` |
| `weight_kg` | `UserProfile.weightKg` | `src/types/profile.ts` |
| `weekly_goal` | `UserProfile.weeklyGoal` | `src/types/profile.ts` |
| `fitness_goals` | `UserProfile.fitnessGoals` | `src/types/profile.ts` |
| `onboarding_completed_at` | `UserProfile.onboardingCompletedAt` | `src/types/profile.ts` |

## Services que usam

- `profileService.ts` (a criar) — CRUD do perfil
- `profileStore.ts` — `saveProfile()`, `updateProfile()`

## Telas que dependem

- OnboardingScreen (insert)
- SettingsScreen (select, update)
- HomeScreen (select — firstName, weeklyGoal)
- AppNavigator (select — onboardingCompletedAt)
