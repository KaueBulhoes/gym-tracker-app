# Tela: Adicionar Plano de Treino

**Arquivo:** `src/screens/Workout/AddWorkoutPlanScreen.tsx`
**Data:** 2026-04-09

## O que o usuário faz

O usuário escolhe o tipo de divisão do plano de treino entre três opções via radio button:

- **Treino ABCDE** — seleciona quais letras (A a E) compõem o plano; pode adicionar mais divisões (F, G…) após selecionar todas as anteriores
- **Seg a Sex** — seleciona os dias da semana; pode adicionar Sáb e Dom após selecionar os dias base
- **Personalizável** — digita livremente o nome de cada dia do plano; pode renomear ou deletar cada dia adicionado

Ao finalizar, pressiona "Criar Plano" (habilitado somente quando há ao menos uma seleção).

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `DayChipSelector` | Componente local | Chips togláveis para modos ABCDE e Seg a Sex |
| `CustomDayForm` | Componente local | Formulário sequencial para o modo personalizável |

> Ainda sem integração com Supabase — lógica de persistência a implementar.

## Componentes usados

- [`DayChipSelector`](../../src/screens/Workout/components/DayChipSelector.tsx) — exibe chips selecionáveis com suporte a itens extras e auto-seleção ao adicionar
- [`CustomDayForm`](../../src/screens/Workout/components/CustomDayForm.tsx) — lista itens confirmados com botões de renomear (inline) e deletar, mais input para o próximo item
- `Button` — botão "Criar Plano" desabilitado quando sem seleção

## Navegação

- **Vem de:** `HomeScreen` (FAB "+" no rodapé)
- **Vai para:** — (fluxo de adição de exercícios ao plano, a implementar)
