# Supabase Client

**Arquivo:** `src/services/supabase.ts`
**Data:** 2026-04-07

## Funções

### `supabase` (instância exportada)

- **O que faz:** Inicializa e exporta o client Supabase configurado com `AsyncStorage` para persistência de sessão entre aberturas do app
- **Tabelas:** Todas (é o client base para todas as queries)
- **Usada em:** `RootNavigator`, `authService` (a implementar), todas as queries do app

## Configuração

- `storage: AsyncStorage` — sessão persiste entre restarts do app
- `autoRefreshToken: true` — renova o JWT automaticamente antes de expirar
- `persistSession: true` — salva a sessão no AsyncStorage
- `detectSessionInUrl: false` — desabilitado pois RN não usa URL para auth

## Regras de negócio

- Chaves (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) importadas de `src/config.ts` (gitignored)
- `src/config.ts` **nunca** deve ser commitado
- Template disponível em `src/config.example.ts`
