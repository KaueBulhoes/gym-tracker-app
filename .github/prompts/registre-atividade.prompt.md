---
agent: agent
description: Analisa tudo que foi criado/modificado na sessão e registra automaticamente na documentação
---

Analise tudo que foi criado ou modificado nesta sessão e registre automaticamente na documentação.

## Passo 1: Detectar o que mudou

Verifique os arquivos criados/modificados na sessão. Classifique cada mudança:

- **Tela** — arquivos em `src/screens/` ou novos componentes de tela
- **Service/API** — arquivos em `src/services/`, queries Supabase, novas funções de dados
- **Componente** — arquivos em `src/components/`
- **Hook** — arquivos em `src/hooks/`
- **Store** — arquivos em `src/stores/`
- **Persistência** — qualquer mecanismo de persistência local/remota (AsyncStorage, auth session, banco, cache persistente)
- **Config/Setup** — configurações, dependências, estrutura do projeto

## Passo 2: Registrar cada tela criada/modificada

Para cada tela, crie ou atualize um arquivo em `docs/telas/` com o nome em kebab-case:

```markdown
# Tela: [Nome]

**Arquivo:** `src/screens/.../NomeScreen.tsx`
**Data:** YYYY-MM-DD

## O que o usuário faz

[Descrição do ponto de vista do usuário]

## Dados e integrações

| Recurso                   | Tipo    | Descrição      |
| ------------------------- | ------- | -------------- |
| `useWorkout`              | Hook    | [o que faz]    |
| `workoutService.create()` | Service | [o que faz]    |
| `workouts`                | Tabela  | [como é usada] |

## Componentes usados

- `ComponenteX` — [função]

## Navegação

- **Vem de:** [tela anterior]
- **Vai para:** [próximas telas]
```

Atualize `docs/telas/index.md` (lista e mapa de navegação).

## Passo 3: Registrar cada service/API criado/modificado

Para cada service, crie ou atualize um arquivo em `docs/api/` com o nome em kebab-case:

```markdown
# [Nome do Service]

**Arquivo:** `src/services/[nome].ts`
**Data:** YYYY-MM-DD

## Funções

### `nomeFuncao(params): ReturnType`

- **O que faz:** [descrição]
- **Tabelas:** [quais tabelas Supabase acessa]
- **Usada em:** [quais telas/hooks usam esta função]

## Regras de negócio

- [RLS, validações, lógica importante]
```

Atualize `docs/api/index.md`.

## Passo 4: Registrar funcionalidades

Se uma feature completa foi implementada (tela + service + lógica funcionando juntos), crie ou atualize em `docs/funcionalidades/`:

```markdown
# [Nome da Funcionalidade]

**Status:** Implementada | Em desenvolvimento
**Data:** YYYY-MM-DD

## O que faz

[Descrição do ponto de vista do usuário]

## Composição

| Camada  | Arquivo            | Descrição            |
| ------- | ------------------ | -------------------- |
| Tela    | `src/screens/...`  | [o que mostra]       |
| Service | `src/services/...` | [o que busca/salva]  |
| Store   | `src/stores/...`   | [estado gerenciado]  |
| Hook    | `src/hooks/...`    | [lógica reutilizada] |

## Tabelas Supabase envolvidas

- `tabela` — [como é usada nesta feature]
```

Atualize `docs/funcionalidades/index.md`.

## Passo 4.1: Registrar mudanças de persistência (obrigatório quando houver)

Se houver qualquer persistência criada ou alterada, documente explicitamente:

- **Persistência local** (AsyncStorage, Zustand persist, MMKV, SQLite, secure storage): atualizar/criar `docs/funcionalidades/persistencia-local.md`
- **Persistência Supabase/remota** (Auth session, CRUD, tabelas, políticas): atualizar `docs/funcionalidades/persistencia-supabase.md` e/ou `docs/banco/`
- **Detalhamento técnico** em `docs/api/` para stores/services envolvidos (chave de storage, momento de hidratação, reset/limpeza, fallback de erro)

Não finalize o registro sem esse passo quando o código tocar em persistência.

## Passo 5: Entrada no diário

Crie a entrada do dia em `docs/diario/YYYY-MM-DD.md` com um resumo de tudo que foi registrado acima, e atualize `docs/diario/index.md`.

## Regras importantes

- **Não duplique informação** — se um service já está documentado, apenas atualize se mudou
- **Conecte tudo** — na doc da tela, referencie os services; no service, referencie as telas que usam
- **Persistência é obrigatória em docs** — se houve persistência nova/alterada, registre em `docs/funcionalidades/` e refs em `docs/api/`
- **Seja conciso** — descreva o suficiente para alguém entender sem ler o código
- **Use links entre docs** — ex: `[workoutService](../api/workout-service.md)`
