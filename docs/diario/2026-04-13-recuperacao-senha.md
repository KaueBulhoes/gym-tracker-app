# 2026-04-13 (Recuperação) — Fluxo de recuperação e redefinição de senha

## Resumo

Implementado fluxo completo de recuperação de senha com Supabase Auth em duas etapas: solicitação por e-mail e redefinição via deep link no app.

## O que foi feito

### Telas
- `LoginScreen` — adicionado link "Esqueceu sua senha?"
- `RecoverPasswordScreen` — nova tela para solicitar envio do link
- `ResetPasswordScreen` — nova tela para definir nova senha

### Auth Service / Store
- `authService.resetPassword(email)`
- `authService.handleAuthDeepLink(url)`
- `authService.updatePassword(newPassword)`
- `authStore.resetPassword(email)`
- `authStore.updatePassword(newPassword)`
- `authStore.isRecoveryFlow` + `setRecoveryFlow`

### Navegação / Deep Link
- `src/navigation/linking.ts` com mapeamento de rotas deep link
- `App.tsx` processa URL inicial e listener de runtime
- `RootNavigator` prioriza `ResetPassword` quando `isRecoveryFlow` está ativo
- Android: intent-filter para esquema `gymtracker`
- iOS: URL Scheme `gymtracker`

## Documentação
- [Autenticação](../funcionalidades/autenticacao.md) — atualizado
- [authService](../api/auth-service.md) — atualizado
- [authStore](../api/auth-store.md) — atualizado
- [Login](../telas/login.md) — atualizado
- [Recuperar senha](../telas/recuperar-senha.md) — novo
- [Redefinir senha](../telas/redefinir-senha.md) — novo
