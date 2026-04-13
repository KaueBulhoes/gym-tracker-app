# Gerar APK Android (Windows + PowerShell)

Guia para gerar, localizar e instalar o APK do Gym Tracker no celular Android.

## Quando usar este guia

- Você quer instalar o app manualmente no seu celular.
- Você quer gerar um APK de release para testes.
- Você recebeu erro no PowerShell ao rodar `gradlew.bat`.

## Pré-requisitos

- Projeto com dependências instaladas (`npm install`).
- Android SDK configurado.
- PowerShell aberto na pasta `android` do projeto.

## 1. Entrar na pasta Android

Na raiz do projeto:

```powershell
cd android
```

## 2. Comando correto no PowerShell

No PowerShell, comandos na pasta atual precisam do prefixo `./` ou `.\`.

Use:

```powershell
.\gradlew.bat assembleRelease
```

Se rodar sem `.\`, você verá erro como:

```text
The term 'gradlew.bat' is not recognized...
Suggestion: type '.\gradlew.bat'
```

## 3. Caso dê erro de path length (Windows)

Em alguns ambientes Windows (especialmente com caminho longo no OneDrive), o build pode falhar com mensagem parecida com:

```text
Filename longer than 260 characters
```

Nesse caso, gere somente a arquitetura do celular (arm64), que resolve para a maioria dos aparelhos Android atuais:

```powershell
.\gradlew.bat assembleRelease -PreactNativeArchitectures=arm64-v8a
```

## 4. Onde fica o APK gerado

Após sucesso, o arquivo fica em:

`android/app/build/outputs/apk/release/app-release.apk`

Caminho completo neste projeto:

`C:\Users\kaueb\OneDrive\Documents\PROJETOS\gym-tracker\android\app\build\outputs\apk\release\app-release.apk`

Para abrir a pasta no Explorer:

```powershell
explorer .\app\build\outputs\apk\release\
```

## 5. Instalar no celular

### Opção A: via USB com ADB

Com o celular conectado e depuração USB habilitada:

```powershell
adb install -r .\app\build\outputs\apk\release\app-release.apk
```

### Opção B: manual

- Copie o `app-release.apk` para o celular.
- Abra o arquivo no celular para instalar.
- Se necessário, habilite a permissão de instalar apps de fontes externas.

## Observação importante sobre assinatura

Atualmente, o build `release` está configurado com assinatura de debug no projeto. Isso é suficiente para testes no aparelho, mas não é o ideal para distribuição final.

Para distribuição real (ou Play Store), configure keystore de release e assinatura própria.

## Comandos resumidos

```powershell
cd android
.\gradlew.bat assembleRelease -PreactNativeArchitectures=arm64-v8a
explorer .\app\build\outputs\apk\release\
adb install -r .\app\build\outputs\apk\release\app-release.apk
```
