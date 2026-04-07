Faça o commit das mudanças atuais e registre atividades relevantes na documentação.

## Passo 1: Commit

1. Rode `git status` para ver arquivos modificados e não rastreados
2. Rode `git diff --stat` para entender o que mudou
3. Rode `git log --oneline -5` para seguir o estilo de commits do projeto
4. Adicione os arquivos relevantes ao staging (nunca adicione .env, config.ts, ou secrets)
5. Crie um commit com mensagem clara seguindo o padrão:
   - `feat:` para nova funcionalidade
   - `fix:` para correção de bug
   - `chore:` para setup, config, dependências
   - `refactor:` para refatoração sem mudança de comportamento
   - `docs:` para documentação
6. Inclua o trailer: `Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>`

## Passo 2: Avaliar se deve registrar atividade

Rode `/registre-atividade` APENAS se houve algo relevante como:
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

## Passo 3: Push (apenas se solicitado)

NÃO faça push automaticamente. Apenas faça push se o usuário pedir explicitamente.
