---
agent: agent
description: Registra atividades na documentação e faz o commit com mensagem padronizada
---

Registre atividades relevantes na documentação e depois faça o commit de tudo junto.

## Passo 1: Analisar o que mudou

1. Rode `git status` para ver arquivos modificados e não rastreados
2. Rode `git diff --stat` para entender o que mudou
3. Rode `git log --oneline -5` para seguir o estilo de commits do projeto

## Passo 2: Registrar atividade (se relevante)

Rode `/registre-atividade` ANTES do commit se houve algo relevante como:

- Nova tela criada ou modificada significativamente
- Novo service/API criado
- Nova funcionalidade implementada
- Novo componente reutilizável criado
- Mudança arquitetural relevante

NÃO rode `/registre-atividade` para:

- Ajustes de estilo (padding, cor, fonte)
- Correções pequenas de bug
- Mudanças de config
- Ajustes de lint/formatação

## Passo 3: Commit

1. Adicione os arquivos relevantes ao staging, incluindo as docs atualizadas (nunca adicione .env, config.ts, ou secrets)
2. Crie um ÚNICO commit com mensagem clara seguindo o padrão:
   - `feat:` para nova funcionalidade
   - `fix:` para correção de bug
   - `chore:` para setup, config, dependências
   - `refactor:` para refatoração sem mudança de comportamento
   - `docs:` para documentação
3. Inclua o trailer: `Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>`

## Passo 4: Push (apenas se solicitado)

NÃO faça push automaticamente. Apenas faça push se o usuário pedir explicitamente.
