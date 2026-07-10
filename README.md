# FSC Site 2.0

Sito ufficiale FSC Racing Team sviluppato con **React + TypeScript + Vite**.

Il progetto contiene il frontend pubblico, le pagine dei reparti, l'area admin e l'integrazione con Decap CMS per la gestione dei contenuti del team.

---

## Stato attuale del progetto

La repo è organizzata così:

- `main` contiene il codice sorgente del sito.
- `gh-pages` contiene il sito compilato e pubblicato.
- Il dominio di produzione è `https://www.fscracing.it`.
- Il deploy viene fatto manualmente tramite `npm run deploy`.
- Decap CMS è configurato per lavorare sulla repo `FSC-Racing-Team/FSCSite-2.0` e sul branch `gh-pages`.

> Importante: lavorare su `main` o su un branch di sviluppo non modifica direttamente il sito online.  
> Il sito online viene aggiornato solo quando viene eseguito il deploy verso `gh-pages`.

---

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Three.js / React Three Fiber
- GSAP / animazioni custom
- Decap CMS
- GitHub Pages

---

## Struttura principale

```text
FSCSite-2.0/
├─ public/
│  ├─ admin/
│  │  ├─ index.html
│  │  └─ config.yml
│  ├─ dev/
│  │  └─ data/
│  │     └─ members.json
│  ├─ images/
│  ├─ fonts/
│  └─ CNAME
├─ src/
│  ├─ components/
│  ├─ data/
│  ├─ hooks/
│  ├─ lib/
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ styles.css
├─ index.html
├─ package.json
├─ vite.config.ts
└─ README.md
```

---

## Prerequisiti

Per lavorare in locale servono:

- Node.js 20+
- npm 10+

Verifica versioni:

```bash
node -v
npm -v
```

---

## Installazione locale

Clona la repo:

```bash
git clone https://github.com/FSC-Racing-Team/FSCSite-2.0.git
cd FSCSite-2.0
```

Installa le dipendenze:

```bash
npm ci
```

Avvia il sito in sviluppo:

```bash
npm run dev
```

Poi apri:

```text
http://localhost:5173
```

---

## Lavorare in sicurezza

Per sviluppare una nuova versione del sito, non lavorare direttamente su `main`.

Crea un branch dedicato:

```bash
git checkout main
git pull
git checkout -b revamp-2026
```

Poi lavora sempre su quel branch:

```bash
git status
git add .
git commit -m "Descrizione modifiche"
git push -u origin revamp-2026
```

Quando il lavoro è pronto, apri una Pull Request verso `main`.

---

# GitHub Codespaces

Il progetto può essere aperto direttamente in GitHub Codespaces, senza configurare tutto il PC locale.

## Avvio rapido Codespace

Da GitHub:

1. Apri la repo `FSC-Racing-Team/FSCSite-2.0`.
2. Clicca su **Code**.
3. Vai su **Codespaces**.
4. Crea un Codespace sul branch di lavoro, ad esempio `revamp-2026`.
5. Attendi l'apertura dell'ambiente VS Code online.

Nel terminale del Codespace:

```bash
npm ci
npm run dev -- --host 0.0.0.0
```

Apri la porta `5173` dalla tab **Ports**.

Il sito sarà visibile tramite l'URL generato da Codespaces.

---

## Configurazione consigliata Codespaces

Per rendere Codespaces più semplice e automatico, aggiungere questo file:

```text
.devcontainer/devcontainer.json
```

Contenuto consigliato:

```json
{
  "name": "FSC Site 2.0",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm",

  "postCreateCommand": "npm ci",

  "forwardPorts": [5173, 8081],

  "portsAttributes": {
    "5173": {
      "label": "Vite dev server",
      "onAutoForward": "openPreview"
    },
    "8081": {
      "label": "Decap local proxy"
    }
  },

  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "bradlc.vscode-tailwindcss"
      ]
    }
  }
}
```

Dopo averlo aggiunto:

```bash
git add .devcontainer/devcontainer.json
git commit -m "Add Codespaces configuration"
git push
```

I nuovi Codespace installeranno automaticamente le dipendenze e inoltreranno la porta del server Vite.

---

## Script disponibili

Gli script principali sono definiti in `package.json`.

```bash
npm run dev
```

Avvia il server di sviluppo Vite.

```bash
npm run build
```

Esegue type-check e build di produzione.

```bash
npm run build:pages
```

Esegue il build pensato per GitHub Pages.

```bash
npm run preview
```

Mostra in locale il risultato del build.

```bash
npm run lint
```

Controlla il codice con ESLint.

```bash
npm run decap:proxy
```

Avvia il proxy locale Decap.

```bash
npm run deploy
```

Pubblica la cartella `dist/` sul branch `gh-pages`.

---

## Comandi consigliati durante lo sviluppo

Durante lo sviluppo normale:

```bash
npm run dev
```

Prima di aprire una Pull Request:

```bash
npm run lint
npm run build
```

Per controllare il build finale:

```bash
npm run preview
```

In Codespaces usare preferibilmente:

```bash
npm run dev -- --host 0.0.0.0
```

---

## Decap CMS

L'area Decap si trova in:

```text
/admin/
```

La configurazione è in:

```text
public/admin/config.yml
```

Attualmente il backend Decap è configurato su GitHub:

```yml
backend:
  name: github
  repo: FSC-Racing-Team/FSCSite-2.0
  branch: gh-pages
  base_url: https://fscracing-decap-proxy.fsc-generale.workers.dev
  auth_endpoint: /auth
```

I dati dei membri vengono gestiti nel file:

```text
dev/data/members.json
```

Attenzione: il CMS lavora sul branch `gh-pages`. Prima di modificare contenuti dal CMS, verificare sempre che il flusso sia quello desiderato.

---

## Variabili ambiente

Creare un file `.env` locale solo se necessario.

Esempio:

```env
VITE_ADMIN_GITHUB_ALLOWLIST=username1,username2
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

Non committare file `.env` contenenti chiavi private o configurazioni sensibili.

---

## Deploy

Il deploy pubblico avviene su GitHub Pages tramite branch `gh-pages`.

Per pubblicare:

```bash
npm run build:pages
npm run deploy
```

oppure direttamente:

```bash
npm run deploy
```

perché `predeploy` esegue automaticamente `npm run build:pages`.

> Non eseguire `npm run deploy` da branch di test se non si vuole aggiornare il sito online.

---

## Workflow consigliato

### Sviluppo nuova versione

```bash
git checkout main
git pull
git checkout -b revamp-2026
npm ci
npm run dev
```

### Test prima della PR

```bash
npm run lint
npm run build
npm run preview
```

### Merge

Aprire Pull Request:

```text
revamp-2026 -> main
```

### Pubblicazione

Dopo merge e controllo finale:

```bash
npm run deploy
```

---

## Troubleshooting rapido

### Il sito non parte

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Le immagini non si vedono

Controllare:

- percorsi in `public/`
- uso corretto di `import.meta.env.BASE_URL`
- maiuscole/minuscole nei nomi file

### Le modifiche ai membri non compaiono

Controllare:

- `public/dev/data/members.json`
- mapping reparto/sottoreparto
- console Network del browser

### Il Codespace non apre il sito

Controllare che il comando sia:

```bash
npm run dev -- --host 0.0.0.0
```

e che la porta `5173` sia inoltrata nella tab **Ports**.

### Il deploy ha aggiornato il sito per errore

Controllare subito il branch `gh-pages` e, se necessario, ripristinare il commit precedente da GitHub.

---

## Note operative

- Non usare `npm run deploy` durante lo sviluppo normale.
- Usare sempre branch separati per modifiche grosse.
- Testare sempre con `npm run build` prima della Pull Request.
- Le modifiche strutturali al CMS vanno coordinate con la configurazione Decap e il branch `gh-pages`.
- Il branch `gh-pages` è produzione: trattarlo come ramo sensibile.

---

## Licenza

Repository FSC Racing Team.  
Uso interno/progetto team salvo diversa indicazione del maintainer.
