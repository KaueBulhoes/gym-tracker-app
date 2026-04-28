# Feedback de Treino

**Status:** Implementada
**Data:** 2026-04-27

## O que faz

Após finalizar um treino, o usuário registra como o treino foi: intensidade percebida (Leve / Moderado / Intenso, obrigatório), exercícios em que sentiu dificuldade (multi-select, opcional) e um comentário livre (opcional). Tudo salvo junto com a sessão num único fluxo.

A tela mostra também o tempo total do treino congelado e uma mensagem motivacional aleatória, antes de o usuário voltar pra Home.

## Composição

| Camada | Arquivo | Descrição |
| ------ | ------- | --------- |
| Tela | `src/screens/Workout/WorkoutFeedbackScreen/WorkoutFeedbackScreen.tsx` | Coleta o feedback e dispara o salvamento |
| Componente | `src/components/Select/Select.tsx` | Dropdown reutilizável (single/multi) com modal e animação `LayoutAnimation` |
| Service | `src/services/workoutService.ts` (`saveSession`) | Insere sessão + cargas + feedback numa sequência atômica |
| Store | `src/stores/workoutStore.ts` (`finishWorkout`) | Recebe a session já com feedback e delega ao service |
| Mapper | `src/utils/caseMapper.ts` (`feedbackToRow`, `rowToSession`) | Conversão snake_case ↔ camelCase do feedback |
| Tipos | `src/types/workout.ts` | `WorkoutIntensity`, `WorkoutFeedback`, `WorkoutSession.feedback` |
| Banco | `docs/banco/workout-session-feedback.md` | Tabela 1:1 com `workout_sessions` |

## Tabelas Supabase envolvidas

- [workout_session_feedback](../banco/workout-session-feedback.md) — 1:1 com session, guarda `intensity`, `difficult_exercises text[]`, `comment` opcional. RLS via JOIN com `workout_sessions`.

## Fluxo

```
ActiveWorkout (Finalizar) → pausa cronômetro → navega WorkoutFeedback
WorkoutFeedback → preenche intensidade (obrig.), exercícios difíceis (opc.), comentário (opc.)
WorkoutFeedback (Concluir) → finishWorkout(session + feedback) → reset stack para Home
```

Se o usuário voltar do feedback (botão back do header), retorna ao Treino Ativo com o cronômetro pausado — pode retomar manualmente.

## Decisões de design

- **Tabela única (não normalizada)** — `difficult_exercises text[]` ao invés de tabela filha 1:N. Os dados são atômicos com o feedback (nunca consultados isoladamente) e o projeto já usa `text[]` em casos análogos (`workout_session_weights.weights`, `profiles.fitness_goals`).
- **Sem boolean `had_difficulty`** — array vazio já indica ausência de dificuldade; coluna boolean seria redundante e fonte de inconsistência.
- **Salvamento atômico** — sessão + cargas + feedback são inseridos em sequência no mesmo fluxo de `saveSession`. Se algum passo falhar, a UI mantém o usuário na tela de feedback para tentar de novo (a session pode ter sido criada órfã sem feedback — comportamento aceito enquanto o Supabase JS não suporta transações).
- **Intensidade obrigatória** — botão "Concluir" desabilitado até o usuário escolher. Demais campos opcionais.
- **Reset da stack** — após concluir, `navigation.reset` para Home, evitando que o usuário volte pra tela de feedback de uma sessão já salva.
