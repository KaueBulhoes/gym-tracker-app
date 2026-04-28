# Politica de Execucao com Dois Agentes de IA

## Objetivo

Definir um padrao unico para rodar dois ou mais agentes de IA ao mesmo tempo sem conflito de arquivos, sem sobrescrita de trabalho e sem merge desatualizado.

## Escopo

- Repositorio: gym-tracker-app
- Branch base: main
- Documento de referencia para implementacao futura

## Regras obrigatorias

1. Cada agente deve trabalhar em branch propria.
2. Cada agente deve trabalhar em worktree propria (pastas separadas).
3. Nenhum agente faz commit direto em main.
4. Todo merge acontece via Pull Request.
5. Antes do merge, a branch do agente deve ser atualizada com main.
6. Se houver conflito, resolver antes do merge e revalidar checks.
7. Apenas KaueBulhoes pode aprovar PR.
8. Agentes de IA (ou bots) nao podem aprovar PR.

## Padrao de nomenclatura

Use este formato para branches de agentes:

- <tipo-de-implementacao>/<nome-do-agente>-<slug>

Exemplos:

- feat/claude-ajuste-darkmode
- refactor/copilot-melhoria-de-codigo

Observacao:

- Se voce criar agentes nomeados no futuro, usar o nome real do agente em <nome-do-agente>.

## Fluxo recomendado (quando for executar)

### 1) Criar uma worktree por agente

Objetivo: isolamento total entre agentes.

Exemplo:

```bash
git fetch origin
git worktree add ../gym-tracker-agent-1 -b feat/claude-ajuste-darkmode origin/main
git worktree add ../gym-tracker-agent-2 -b refactor/copilot-melhoria-de-codigo origin/main
```

### 2) Rodar cada agente em sua pasta

- Agente 1: ../gym-tracker-agent-1
- Agente 2: ../gym-tracker-agent-2

Regra:

- Um agente nunca escreve na pasta do outro.

### 3) Abrir PR separado por agente

- Um PR por branch
- Escopo pequeno por PR
- Sem misturar features diferentes no mesmo PR

### 4) Atualizar branch com main antes de merge

```bash
git fetch origin
git checkout <branch-do-agente>
git rebase origin/main
```

Se preferir merge em vez de rebase:

```bash
git fetch origin
git checkout <branch-do-agente>
git merge origin/main
```

### 5) Revalidar checks apos atualizacao

- lint
- testes
- typecheck
- checks de CI obrigatorios

### 6) Realizar merge do PR

- Apenas com branch atualizada e checks verdes

## Automacao para garantir o padrao

### A) Branch protection da main

Configurar no GitHub:

- Require a pull request before merging
- Require approvals (1 ou mais)
- Require review from Code Owners
- Require status checks to pass before merging
- Require branches to be up to date before merging
- (Opcional) Require merge queue

Complemento para garantir aprovacao apenas sua:

- Definir CODEOWNERS com owner global: @KaueBulhoes
- Revisar permissoes de apps/bots para impedir aprovacao automatica

### B) Workflow de politica (CI)

Criar workflow para falhar PR quando:

1. Nome da branch nao segue padrao <tipo>/<agente>-<slug>
2. Branch esta desatualizada em relacao a main
3. Checks obrigatorios falham

Tipos sugeridos para <tipo>:

- feat
- fix
- refactor
- docs
- chore

### C) Instrucoes dos agentes no repositorio

Reforcar o fluxo nos arquivos de agente e instrucoes gerais:

- .github/copilot-instructions.md
- .github/agents/\*.agent.md

Texto minimo recomendado para instrucoes:

1. Sempre criar branch propria no padrao definido.
2. Nunca trabalhar diretamente em main.
3. Sempre atualizar branch com main antes de solicitar merge.
4. Sempre operar em pasta/worktree isolada quando houver execucao paralela.
5. Nunca aprovar PR automaticamente; aprovacao final somente de KaueBulhoes.

## Riscos comuns e como evitar

1. Dois agentes alteram o mesmo arquivo

- Mitigacao: separar escopo por dominio e manter PRs pequenos.

2. Branch ficou velha durante desenvolvimento

- Mitigacao: rebase/merge com main antes de finalizar PR.

3. Um agente sobrescreve mudancas do outro localmente

- Mitigacao: worktrees separadas e uma sessao por pasta.

## Checklist rapido

- Cada agente tem branch propria
- Cada agente tem worktree propria
- Nenhum commit foi para main
- PR aberto por branch
- Somente KaueBulhoes aprovou o PR
- Branch sincronizada com main antes do merge
- CI passou apos sincronizacao

## Estado

Documento preparado para implementacao futura.
Nenhuma configuracao automatica foi aplicada neste momento.
