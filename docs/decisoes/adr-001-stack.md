# ADR-001: Escolha da Stack Tecnológica

**Data:** 2026-04-07
**Status:** Aceito

## Contexto

Precisamos definir a stack para um app mobile de acompanhamento de academia que funcione em Android e iOS.

## Decisão

| Camada | Escolha | Alternativa considerada |
|--------|---------|------------------------|
| Framework | React Native CLI | Expo |
| Linguagem | TypeScript | JavaScript |
| Backend | Supabase | Firebase, SQLite local |
| Estado | Zustand | Redux, Context API |
| Navegação | React Navigation | React Native Navigation |

## Motivos

- **React Native CLI** — mais controle sobre código nativo, sem limitações do Expo
- **TypeScript** — tipagem reduz bugs, padrão do mercado
- **Supabase** — open source, PostgreSQL, auth pronto, sync entre dispositivos
- **Zustand** — mais simples que Redux, menos boilerplate

## Consequências

- Precisa de Android Studio e Xcode configurados (setup mais pesado que Expo)
- Precisa gerenciar um projeto no Supabase (custo free tier generoso)
