# Funcionalidades

Catálogo de features do app com suas composições (telas + services + tabelas).

## Implementadas

- [Autenticação (Login + Cadastro)](autenticacao.md) — Login e cadastro com email/senha via Supabase Auth
- [Criação de Plano de Treino](criacao-plano-treino.md) — criação de planos com divisão ABCDE, dias da semana ou personalizada
- [Sessão de Treino](sessao-treino.md) — execução de treino com cronômetro, registro de cargas e timer de descanso
- [Feedback de Treino](feedback-treino.md) — após finalizar, registro de intensidade, exercícios com dificuldade e comentários
- [Onboarding](onboarding.md) — perfil do usuário no primeiro login (dados pessoais, objetivos de treino, meta semanal)
- [Persistência Supabase](persistencia-supabase.md) — todos os dados persistidos no banco (perfil, planos, sessões, cargas)
- [Persistência Local](persistencia-local.md) — dados de sessão e preferências persistidos no dispositivo (AsyncStorage)
- [Gerenciamento de Fichas](gerenciamento-fichas.md) — fichas ativa/inativa, nome, duração, vencimento, descrição por dia

- [Estatísticas de Treino](estatisticas.md) — métricas, recordes, progressão de carga, stats customizáveis na Home
- [Tema Dark/Light](tema-dark-light.md) — toggle de tema persistente com paletas refinadas e theming completo via styled-components

## Planejadas

- Histórico e gráficos de evolução
