---
agent: agent
description: Lê os arquivos .claude/ e CLAUDE.md e atualiza os equivalentes em .github/
---

Sincronize os arquivos do Copilot com os arquivos do Claude.

## Passo 1: Ler as fontes

1. Leia `CLAUDE.md` — fonte de verdade para as instruções gerais do projeto
2. Liste os arquivos em `.claude/commands/` — cada um pode ter um prompt equivalente em `.github/prompts/`

## Passo 2: Atualizar `.github/copilot-instructions.md`

Compare o conteúdo atual de `.github/copilot-instructions.md` com `CLAUDE.md`.

- Aplique todas as diferenças: seções novas, seções removidas, regras alteradas
- Mantenha a seção `## Regras de Desenvolvimento` (não `## Regras para o Claude`)
- Preservar formatação e estrutura do arquivo existente quando possível

## Passo 3: Sincronizar prompts

Para cada arquivo em `.claude/commands/`:

1. Verifique se existe um equivalente em `.github/prompts/` com o nome `<comando>.prompt.md`
2. Se **não existe**: crie o arquivo com o mesmo conteúdo, adicionando o frontmatter:
   ```
   ---
   mode: agent
   description: [descrição curta do que o comando faz]
   ---
   ```
3. Se **existe mas está desatualizado**: atualize o conteúdo mantendo o frontmatter

## Passo 4: Relatar

Liste o que foi alterado:

- Arquivos atualizados em `.github/copilot-instructions.md`
- Prompts criados ou atualizados em `.github/prompts/`
- Arquivos que já estavam em sincronia (sem alteração necessária)
