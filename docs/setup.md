# Setup do Ambiente

## Requisitos

- [ ] Node.js v18+
- [ ] JDK 17
- [ ] Android Studio (SDK + Emulador)
- [ ] VSCode com extensões (React Native Tools, ESLint, Prettier)
- [ ] Git

## Variáveis de Ambiente

```
ANDROID_HOME = C:\Users\<user>\AppData\Local\Android\Sdk
PATH += %ANDROID_HOME%\platform-tools
```

## Supabase

- [ ] Criar projeto no Supabase
- [ ] Configurar `.env` com SUPABASE_URL e SUPABASE_ANON_KEY
- [ ] Criar tabelas e habilitar RLS

## Como rodar

```bash
npm install
npx react-native run-android
```
