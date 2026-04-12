Compare o estado atual do código com a documentação em `docs/` e reporte inconsistências.

## Passo 1: Levantar o que existe no código

Verifique cada camada do `src/`:

1. **Telas** — liste todas as pastas em `src/screens/` (recursivo, cada pasta com `.tsx` é uma tela)
2. **Services** — liste todos os `.ts` em `src/services/`
3. **Stores** — liste todos os `.ts` em `src/stores/`
4. **Componentes** — liste todas as pastas em `src/components/`
5. **Hooks** — liste todos os `.ts` em `src/hooks/`

## Passo 2: Levantar o que está documentado

1. Leia `docs/telas/index.md` — extraia as telas listadas
2. Leia `docs/api/index.md` — extraia os services/stores listados
3. Leia `docs/funcionalidades/index.md` — extraia as features listadas
4. Leia `docs/backlog.md` — veja o status dos itens

## Passo 3: Comparar e reportar

Gere um relatório com estas seções:

### Telas
- **Sem doc:** telas que existem em `src/screens/` mas não têm arquivo em `docs/telas/`
- **Doc órfã:** docs em `docs/telas/` que referenciam telas que não existem mais
- **Desatualizada:** telas cujo arquivo `.tsx` foi modificado depois da data no doc (use `git log --format=%ai -1 -- <arquivo>` para pegar a data)

### Services/Stores
- **Sem doc:** services em `src/services/` ou stores em `src/stores/` sem arquivo em `docs/api/`
- **Doc órfã:** docs em `docs/api/` que referenciam arquivos que não existem mais

### Funcionalidades
- **Sem doc:** features que parecem completas (tela + store/service conectados) mas não estão em `docs/funcionalidades/`
- **Status incorreto:** features marcadas como "Em desenvolvimento" que já parecem implementadas, ou vice-versa

### Backlog
- **Desatualizado:** itens marcados como `[ ]` que já foram implementados (baseado nas telas e features existentes)
- **Faltando:** funcionalidades que existem no código mas não aparecem no backlog

### Convenções
- **Pasta sem index.ts:** componentes visuais (telas, componentes, navegadores) que não têm `index.ts` barrel
- **Styles inline/faltando:** telas ou componentes sem `.styles.ts` separado

## Passo 4: Sugerir ações

Para cada problema encontrado, sugira a ação corretiva:
- "Criar doc `docs/telas/nome.md`"
- "Remover doc órfã `docs/telas/nome.md`"
- "Atualizar status no backlog"
- "Adicionar `index.ts` em `src/components/X/`"

Apresente o relatório de forma concisa, agrupado por severidade:
1. **Faltando** (docs que precisam ser criados)
2. **Desatualizado** (docs que precisam de update)
3. **Órfão** (docs que podem ser removidos)
4. **Convenções** (problemas de estrutura de pasta)
