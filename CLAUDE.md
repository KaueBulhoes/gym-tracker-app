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

- **profiles** — id mod(uuid, ref auth.users), name, avatar_url, created_at
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
- Estilização com `StyleSheet.create()` no final do arquivo (nunca inline)
- Nomes em PascalCase para componentes, camelCase para hooks e utils

### Hooks
- Prefixo `use` (ex: `useWorkout`, `useTimer`, `useAuth`)
- Um hook por arquivo em `src/hooks/`

### Navegação
- Stack Navigator para fluxos lineares
- Bottom Tab Navigator para navegação principal
- Tipos de rotas definidos em `src/navigation/types.ts`

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

## Regras para o Claude

1. **Sempre TypeScript** — nunca gerar código .js ou .jsx
2. **Não usar Expo** — este projeto usa React Native CLI puro
3. **Não usar class components** — apenas componentes funcionais
4. **Não usar styles inline** — sempre StyleSheet.create()
5. **Não instalar libs sem avisar** — perguntar antes de adicionar dependências
6. **Manter arquivos pequenos** — se um arquivo passar de 200 linhas, sugerir split
7. **Segurança** — nunca expor chaves ou secrets no código; usar .env
8. **Acessibilidade** — incluir accessibilityLabel em elementos interativos
9. **Português nas UI strings** — o app é em português brasileiro
10. **Inglês no código** — nomes de variáveis, funções, types em inglês
