# Tela: Configurações

**Arquivo:** `src/screens/Settings/SettingsScreen/SettingsScreen.tsx`
**Data:** 2026-04-12

## O que o usuário faz

Edita seu perfil ou troca sua senha. A tela tem um side menu à esquerda com duas abas: Perfil (padrão) e Senha.

### Aba Perfil
Exibe todos os campos do onboarding preenchidos com os dados atuais. O usuário pode editar nome, sobrenome, data de nascimento, altura, peso, objetivo semanal e objetivos fitness. Botão "Salvar" fixo no rodapé.

### Aba Senha
Campos para senha atual, nova senha e confirmação. Valida senha mínima de 6 caracteres e confirmação em tempo real. Botão "Alterar senha" fixo no rodapé.

## Dados e integrações

| Recurso | Tipo | Descrição |
|---------|------|-----------|
| `useProfileStore.profile` | Store | Carrega dados atuais do perfil |
| `useProfileStore.updateProfile` | Store | Salva alterações no perfil |
| `useAuthStore.changePassword` | Store | Altera senha via Supabase Auth |
| `authService.changePassword` | Service | Verifica senha atual e atualiza |

## Componentes usados

- `Input` — campos de texto e senha
- `ChipSelect` — objetivo semanal (single) e objetivos fitness (multi)
- `Button` — "Salvar" e "Alterar senha"

## Navegação

- **Vem de:** HomeScreen (menu do perfil → "Editar perfil")
- **Vai para:** HomeScreen (botão voltar)
