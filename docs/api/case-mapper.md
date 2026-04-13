# Case Mapper

**Arquivo:** `src/utils/caseMapper.ts`
**Data:** 2026-04-13

## O que faz

Converte dados entre o formato do app (camelCase, TypeScript) e o formato do banco (snake_case, Supabase). Usa funções explícitas por domínio em vez de converter genericamente.

## Funções

### Profile
- `profileToRow(data, userId)` — converte `ProfileData` → row para INSERT
- `profileUpdateToRow(data)` — converte `Partial<ProfileData>` → row parcial para UPDATE
- `rowToProfile(row)` — converte row do banco → `UserProfile`

### Workout Plan (leitura)
- `rowToPlan(row)` — converte plan row com nested days/exercises/schemes → `WorkoutPlan`

### Workout Plan (escrita)
- `dayToRow(day, planId, sortOrder)` — converte `WorkoutDay` → day row
- `exerciseToRow(exercise, dayId, sortOrder)` — converte `Exercise` → exercise row
- `repSchemeToRow(scheme, exerciseId, sortOrder)` — converte `RepScheme` → scheme row

### Session
- `sessionToRow(session, userId)` — converte `WorkoutSession` → session row
- `weightToRow(weight, sessionId)` — converte `ExerciseWeight` → weight row
- `rowToSession(row)` — converte session row com nested weights → `WorkoutSession`

## Conversão de datas

- `brDateToIso(date)` — `DD/MM/YYYY` → `YYYY-MM-DD` (escrita no banco)
- `isoDateToBr(date)` — `YYYY-MM-DD` → `DD/MM/YYYY` (leitura do banco)

## Tipos de row

Definidos em `src/types/database.ts`: `ProfileRow`, `PlanRow`, `DayRow`, `ExerciseRow`, `RepSchemeRow`, `SessionRow`, `WeightRow`.
