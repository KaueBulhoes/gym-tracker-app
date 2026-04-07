# ADR-002: Padrão de Tratamento de Erros

**Data:** 2026-04-07
**Status:** Aceito

## Contexto

Os services jogavam `throw error` com o erro cru do Supabase, resultando em mensagens técnicas em inglês na UI e dificuldade de debug.

## Decisão

| Camada | Responsabilidade |
|--------|-----------------|
| `src/types/errors.ts` | Classe `AppError` com `code` + `message` (PT-BR) + `originalError` |
| `src/utils/errorMapper.ts` | Funções `mapAuthError` e `mapDatabaseError` que traduzem erros do Supabase |
| Services | Chamam o mapper: `if (error) { throw mapAuthError(error); }` |
| Stores | Capturam `AppError` e expõem `message` para a UI |

## Fluxo

```
Supabase Error → errorMapper (traduz) → AppError → Store → UI (mensagem em PT-BR)
```

Se o erro não está mapeado, usa a mensagem original do Supabase como fallback.

## Motivos

- Mensagens em português para o usuário
- Códigos programáticos (`INVALID_CREDENTIALS`, etc.) para lógica condicional
- `originalError` preservado para debug
- Fácil de estender: basta adicionar entradas nos mapas

## Consequências

- Todo novo service deve usar `mapAuthError` ou `mapDatabaseError`
- Novos códigos de erro devem ser adicionados ao mapper quando identificados
