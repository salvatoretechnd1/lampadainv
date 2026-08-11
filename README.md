# Lâmpada — do código ao APK

Este projeto já vem com o app pronto (`src/App.jsx`) ligado a um banco de
dados real (Firebase), no lugar do armazenamento que só existe dentro do
Claude. Siga a ordem abaixo.

## 1. Criar o projeto no Firebase (gratuito)

1. Acesse https://console.firebase.google.com e crie um projeto.
2. No menu lateral: **Build > Firestore Database** → "Criar banco de dados"
   → modo produção → escolha uma região (ex: `southamerica-east1`).
3. **Build > Authentication > Sign-in method** → ative **"Anônimo"**.
   (é isso que garante que só a própria pessoa vê o nome que digitou)
4. Clique no ícone de engrenagem → **Configurações do projeto** → aba
   **Geral** → em "Seus apps" clique no ícone **`</>`** (Web) → dê um nome
   → copie o objeto `firebaseConfig` que aparece.
5. Cole esses valores em `src/firebase.js`, substituindo os campos de
   exemplo (`SUA_API_KEY`, `SEU_PROJETO`, etc).

## 2. Rodar localmente

No terminal, dentro da pasta do projeto:

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173` — teste no navegador do celular (mesma
rede Wi-Fi) pra já sentir como fica em tela de telefone.

## 3. Gerar o app web de produção

```bash
npm run build
```

Isso cria a pasta `dist/` com o app pronto (HTML/JS/CSS otimizados).

## 3.1. Publicar como site (sem precisar de APK)

Se por enquanto você só quer o app funcionando como site normal (as pessoas
acessam pelo navegador, sem instalar nada), a forma mais simples é usar o
**Firebase Hosting** — já que o projeto já está configurado com Firebase:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

Nas perguntas do `firebase init hosting`:
- Diretório público: `dist`
- Configurar como single-page app: **Sim**
- Não sobrescreva o `dist/index.html` se ele já existir

Depois, toda vez que quiser publicar uma atualização:

```bash
npm run build
firebase deploy --only hosting
```

Isso te dá um link tipo `https://seu-projeto.web.app` já pronto pra
compartilhar com o grupo. (Outras opções que também funcionam bem: Vercel ou
Netlify — mas como o projeto já usa Firebase, o Hosting é o caminho com menos
configuração extra.)

### ⚠️ Aviso importante sobre o microfone (gravação do devocional)

A gravação de áudio ao vivo (usada no devocional) só funciona em páginas
servidas por **HTTPS** — os navegadores bloqueiam o acesso ao microfone em
sites HTTP comuns, por segurança. Isso não é um bug do app: é uma regra do
próprio navegador. A boa notícia é que **Firebase Hosting, Vercel e Netlify
já servem tudo em HTTPS automaticamente**, então uma vez publicado por
qualquer um desses, a gravação funciona normalmente — só rodando localmente
em `http://` "puro" (fora do `localhost`) é que ela ficaria bloqueada.

## 3.2. Publicar na Vercel (passo a passo)

O projeto já vem com `vercel.json` configurado — é só publicar. Duas formas:

**Opção A — pelo site vercel.com (mais visual, sem instalar nada):**

1. Suba a pasta do projeto pra um repositório no GitHub (crie um repositório
   vazio, depois `git init`, `git add .`, `git commit -m "primeiro commit"`,
   `git remote add origin <link-do-seu-repo>`, `git push -u origin main`).
2. Entre em https://vercel.com, faça login (dá pra usar a conta do GitHub) e
   clique em **"Add New" → "Project"**.
3. Selecione o repositório do Lâmpada. A Vercel já detecta que é um projeto
   Vite automaticamente — não precisa mudar nada nas configurações de build.
4. Clique em **Deploy**. Em cerca de 1 minuto você recebe um link tipo
   `https://lampada-seu-usuario.vercel.app`, já em HTTPS.
5. Toda vez que você der `git push` de novo, a Vercel publica a atualização
   sozinha.

**Opção B — pelo terminal (mais rápido, sem precisar de GitHub):**

```bash
npm install -g vercel
vercel login
vercel
```

Responda as perguntas (pode aceitar as opções padrão sugeridas — a Vercel
detecta o Vite e usa `npm run build` com saída em `dist` automaticamente).
Ao final, ela já devolve o link público. Pra publicar atualizações depois:

```bash
vercel --prod
```

Nos dois casos, o resultado final é o mesmo: um site público em HTTPS, pronto
pra qualquer pessoa do grupo acessar pelo navegador — sem precisar instalar
nada. O caminho do APK (seções 4 e 5 abaixo) continua sendo opcional, só pra
quando você quiser também um ícone instalável na tela do celular.

## 4. Transformar em projeto Android (Capacitor)

```bash
npm install @capacitor/core @capacitor/android
npx cap init "Lâmpada" "com.suaigreja.lampada" --web-dir=dist
npx cap add android
npm run build
npx cap sync
```

- O segundo comando pede um "id" único do app — pode manter o formato
  `com.suaigreja.lampada`, trocando por algo que faça sentido pra vocês.
- `npx cap sync` copia sempre a versão mais nova de `dist/` pro projeto
  Android — rode de novo toda vez que alterar o código e der `npm run build`.

## Sobre o ícone do app

O projeto já vem com `public/icon.svg` (a logo da chama) e `public/manifest.json`
configurados — é o que o navegador usa como favicon e é também a base pro
ícone do aplicativo quando você gerar o projeto Android no passo 4. Se quiser
trocar por um ícone desenhado à mão (em vez do SVG gerado), basta substituir
esse arquivo antes de rodar `npx cap sync`.

## 5. Compilar o APK

Precisa do **Android Studio** instalado (gratuito, https://developer.android.com/studio):

```bash
npx cap open android
```

Isso abre o projeto no Android Studio. Lá dentro:

- Menu **Build > Build Bundle(s) / APK(s) > Build APK(s)**
- O APK final aparece em `android/app/build/outputs/apk/debug/app-debug.apk`
- Esse APK já pode ser instalado direto em qualquer Android (ative
  "instalar de fontes desconhecidas" no aparelho) ou enviado por WhatsApp/Drive
  pro grupo testar.

Pra publicar na Play Store de verdade, o Android Studio também gera um
**AAB assinado** (Build > Generate Signed Bundle), que é o formato que a
Play Store pede — isso já envolve criar uma chave de assinatura e uma
conta de desenvolvedor Google (taxa única).

## Sobre o armazenamento (o que mudou)

O app inteiro continua igual — quiz, escala, membros, devocional, ranking.
A única mudança de verdade foi nos bastidores: em vez de salvar os dados
no armazenamento temporário do Claude, agora eles vão pro Firestore
(banco do Firebase), então funcionam de verdade, em tempo real, fora daqui.

Um detalhe pra ficar de olho: o Firestore tem um limite de ~1MB por
"documento". As fotos de perfil (o app já redimensiona automaticamente)
não chegam nem perto disso. Já um áudio de devocional de até 2 minutos
pode, dependendo do celular que gravou, passar desse limite — se algum
áudio der erro ao salvar, o próximo passo é mover só os áudios para o
**Firebase Storage** (feito pra arquivos grandes) em vez do Firestore.
