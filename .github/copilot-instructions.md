# Gym Tracker - Guia do Projeto

## Visão Geral

App mobile de acompanhamento de academia. Permite registrar treinos, séries, repetições e carga, acompanhar evolução ao longo do tempo, seguir planos de treino e usar timer de descanso entre séries.

## Stack Tecnológica

- **Mobile:** React Native CLI (sem Expo)
- **Linguagem:** TypeScript (strict mode)
- **Navegação:** React Navigation v6+
- **Estado global:** Zustand
- **Backend:** Supabase (Auth, Database PostgreSQL, Realtime)
- **Gráficos:** react-native-chart-kit ou victory-native
- **Testes:** Jest + React Native Testing Library
- **Estilização:** styled-components/native
- **Lint/Format:** ESLint + Prettier

## Estrutura de Pastas

```
src/
├── components/        # Componentes reutilizáveis (Button, Card, Input, etc.)
├── screens/           # Telas do app (uma pasta por feature)
│   ├── Auth/
│   ├── Home/
│   ├── Workout/
│   ├── History/
│   └── Profile/
├── navigation/        # Configuração do React Navigation
├── hooks/             # Custom hooks
├── services/          # Integrações externas (Supabase client, API calls)
├── stores/            # Zustand stores
├── types/             # TypeScript types e interfaces
├── utils/             # Funções utilitárias
├── constants/         # Cores, dimensões, strings
└── assets/            # Imagens, fontes, ícones
```

## Comandos

```bash
# Instalar dependências
npm install

# Rodar no Android
npx react-native run-android

# Rodar no iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Testes
npm test

# Lint
npm run lint

# TypeScript check
npx tsc --noEmit
```

## Modelo de Dados (Supabase)

### Tabelas principais

- **profiles** — id (uuid, ref auth.users), name, avatar_url, created_at
- **exercises** — id, name, muscle_group, equipment, user_id (null = exercício padrão)
- **workout_plans** — id, user_id, name, description, days_per_week
- **workout_plan_exercises** — id, plan_id, exercise_id, sets, reps, rest_seconds, order
- **workouts** — id, user_id, plan_id (nullable), started_at, finished_at, notes
- **workout_sets** — id, workout_id, exercise_id, set_number, reps, weight_kg, completed, rest_seconds

### Grupos musculares padrão

Peito, Costas, Ombros, Bíceps, Tríceps, Pernas (Quadríceps), Pernas (Posterior), Glúteos, Abdômen, Panturrilha

## Convenções de Código

### TypeScript

- Strict mode sempre habilitado
- Interfaces para props de componentes: `interface NomeComponenteProps {}`
- Types para modelos de dados: `type Workout = {}`
- Evitar `any` — usar `unknown` se necessário e fazer type narrowing
- Enums apenas quando necessário; preferir union types (`type MuscleGroup = 'chest' | 'back' | ...`)

### Componentes

- Sempre funcionais com arrow functions
- Um componente por arquivo
- Props tipadas com interface dedicada
- Estilização com `styled-components/native` (não usar StyleSheet.create nem styles inline)
- Cada componente fica em sua própria pasta com o nome do componente:
  ```
  Button/
  ├── Button.tsx          # lógica e JSX
  ├── Button.styles.ts    # styled-components
  └── index.ts            # re-exporta o default para imports limpos
  ```
- O `index.ts` deve conter apenas: `export { default } from './Button';`
- Nomes em PascalCase para componentes, camelCase para hooks e utils

### Hooks

- Prefixo `use` (ex: `useWorkout`, `useTimer`, `useAuth`)
- Um hook por arquivo em `src/hooks/`

### Navegação

- Stack Navigator para fluxos lineares
- Bottom Tab Navigator para navegação principal
- Tipos de rotas definidos em `src/navigation/types.ts`

### Persistência de dados

- Toda informação produzida pelo usuário (treinos, cargas, sessões, planos) deve ser salva no Zustand store
- Nunca descartar dados silenciosamente — se o usuário inseriu, persiste
- Stores ficam em `src/stores/` e tipos em `src/types/`
- Ao criar uma nova feature, sempre incluir a action de salvar no store e conectar na UI
- Se houver persistência local/remota nova ou alterada, documentar em `docs/funcionalidades/` e detalhar em `docs/api/`

### Supabase

- Client inicializado em `src/services/supabase.ts`
- Queries encapsuladas em funções em `src/services/` (ex: `workoutService.ts`)
- Row Level Security (RLS) habilitado em todas as tabelas
- Chaves do Supabase em variáveis de ambiente (.env), nunca hardcoded

### Tratamento de Erros

- Nunca `throw error` cru do Supabase — sempre usar `mapAuthError(error)` ou `mapDatabaseError(error)`
- Classe `AppError` em `src/types/errors.ts` com `code` (programático) + `message` (PT-BR para o usuário) + `originalError` (debug)
- Mappers em `src/utils/errorMapper.ts` traduzem erros do Supabase para mensagens amigáveis
- Nos stores: capturar com `err instanceof AppError` e exibir `appError.message` na UI
- Novos services devem seguir o padrão: `if (error) { throw mapXxxError(error); }`
- Para erros de auth: usar `mapAuthError`
- Para erros de banco (CRUD): usar `mapDatabaseError`
- Ao adicionar novas operações: verificar se o código de erro já está mapeado, senão adicionar ao mapper

### Estilo e UI

- Tema de cores definido em `src/constants/colors.ts`
- Espaçamentos padronizados em `src/constants/spacing.ts`
- Componentes base reutilizáveis (Button, Input, Card) antes de compor telas
- Estilos em arquivo separado do componente: `NomeComponente.styles.ts` na mesma pasta do `.tsx`
  - **Todo componente visual** (telas, navegadores, componentes reutilizáveis) fica em pasta própria:
    `NomeScreen/NomeScreen.tsx` + `NomeScreen.styles.ts` + `index.ts`
  - Isso inclui telas (`src/screens/`), navegadores (`src/navigation/`) e componentes (`src/components/`)
  - Módulos não-visuais (stores, services, types, utils, constants) ficam flat, sem pasta
  - O arquivo de estilos exporta os styled-components nomeados; o componente apenas importa

## Documentação (Obsidian)

O projeto mantém uma base de documentação em `docs/` estruturada para Obsidian. Ela é a fonte de verdade sobre o que foi implementado.

### Estrutura

```
docs/
├── README.md              # Índice geral
├── setup.md               # Setup do ambiente
├── backlog.md             # MVP, Fase 2, Fase 3 com status
├── diario/                # Entradas diárias (YYYY-MM-DD.md)
├── funcionalidades/       # Features completas (tela + service + lógica)
├── api/                   # Services e integração Supabase
├── banco/                 # Tabelas Supabase (schema, RLS, relacionamentos)
├── telas/                 # Registro de cada tela (navegação, dados, componentes)
└── decisoes/              # ADRs (Architecture Decision Records)
```

### Workflow de documentação

1. Ao criar/modificar telas, services ou features: rodar `/registre-atividade`
2. Ao finalizar o dia: rodar `/registre-diario-hoje`
3. Ao commitar: rodar `/commit` (que inclui docs no commit)
4. Para verificar se docs estão em dia: rodar `/revisar-docs`

### Regras

- Docs acompanham o código — se criou tela nova, documenta em `docs/telas/`
- Se criou service novo, documenta em `docs/api/`
- Se criou ou alterou tabela Supabase, documenta em `docs/banco/`
- Se completou feature, documenta em `docs/funcionalidades/`
- Se criou/alterou persistência (AsyncStorage, sessão Auth, banco, cache persistente), atualizar `docs/funcionalidades/persistencia-local.md` e/ou `docs/funcionalidades/persistencia-supabase.md`
- Links entre docs: usar caminhos relativos (ex: `[workoutStore](../api/workout-store.md)`)
- Datas absolutas (nunca "hoje" ou "ontem" nos docs)

## Regras de Desenvolvimento

1. **Sempre TypeScript** — nunca gerar código .js ou .jsx
2. **Não usar Expo** — este projeto usa React Native CLI puro
3. **Não usar class components** — apenas componentes funcionais
4. **Usar styled-components** — não usar StyleSheet.create() nem styles inline
5. **Não instalar libs sem avisar** — perguntar antes de adicionar dependências
6. **Manter arquivos pequenos** — se um arquivo passar de 200 linhas, sugerir split
7. **Segurança** — nunca expor chaves ou secrets no código; usar .env
8. **Acessibilidade** — incluir accessibilityLabel em elementos interativos
9. **Português nas UI strings** — o app é em português brasileiro
10. **Inglês no código** — nomes de variáveis, funções, types em inglês
