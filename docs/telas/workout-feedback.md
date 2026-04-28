# Tela: Feedback do Treino

**Arquivo:** `src/screens/Workout/WorkoutFeedbackScreen/WorkoutFeedbackScreen.tsx`
**Data:** 2026-04-27

## O que o usuário faz

Após finalizar um treino, o usuário cai nessa tela para registrar como o treino foi. A tela mostra:

- **Header roxo** com "Treino concluído!" + nome do dia + botão de voltar
- **Tempo total** do treino (cronômetro grande, congelado no momento que clicou Finalizar)
- **Card motivacional** com ícone de troféu e uma mensagem aleatória de incentivo
- **Intensidade do treino** (obrigatório) — dropdown com Leve / Moderado / Intenso
- **Exercícios com dificuldade** (opcional, multi-select) — dropdown com os exercícios daquele dia, marcados com checkbox e confirmados via botão "Confirmar"
- **Comentários** (opcional) — textarea livre, max 500 chars
- **Botão Concluir** (amarelo, fixo no rodapé) — desabilitado até a intensidade ser selecionada

Ao confirmar, salva sessão + feedback no Supabase numa única operação atômica e cai na Home (com `navigation.reset` — não é possível voltar).

Se o usuário voltar pelo botão do header, retorna ao treino ativo (que está pausado). O cronômetro fica como estava — cabe ao usuário retomar manualmente.

## Dados e integrações

| Recurso | Tipo | Descrição |
| ------- | ---- | --------- |
| `useWorkoutStore.activeWorkout` | Store | Lê dados do treino para construir a sessão (planId, dayName, startedAt, elapsedSeconds, exerciseWeights) |
| `useWorkoutStore.plans` | Store | Lê o plano do treino para listar exercícios disponíveis no dropdown de dificuldade |
| `useWorkoutStore.finishWorkout(session)` | Store | Salva sessão + feedback (a session agora carrega `feedback` no payload) |
| `workout_session_feedback` | Tabela | Persistido via [workoutService.saveSession](../api/workout-service.md) |

## Componentes usados

- [Select](../api/) (novo, em `src/components/Select/`) — dropdown reutilizável que abre modal. Suporta single (intensidade) e multi (exercícios). Header do modal em fundo roxo, opções com background highlight quando selecionadas, animação `LayoutAnimation` ao tocar
- `MotivationalCard` — card com border amarela (primary) e ícone de troféu
- `KeyboardAvoidingView` — para manter o textarea acessível com teclado aberto
- Botão "Concluir" — Pressable amarelo full-width, desabilitado até intensidade ser escolhida

## Mensagens motivacionais

Array fixo com 6 frases (sorteia uma por sessão via `useMemo`). Definido no topo do arquivo da tela em `MOTIVATIONAL_MESSAGES`.

## Navegação

- **Vem de:** [Treino Ativo](active-workout.md) (botão "Finalizar" pausa o cronômetro e navega pra cá)
- **Vai para:** Home (via `navigation.reset` ao concluir, evitando voltar pra esta tela)
- **Voltar:** retorna pra [Treino Ativo](active-workout.md) (treino segue pausado, usuário pode retomar)
