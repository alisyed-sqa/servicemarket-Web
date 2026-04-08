# ServiceMarket Playwright POM

Scaffolded Playwright + TypeScript project using Page Object Model (POM).

Quick start:

1. Install dependencies:

```bash
npm install
npx playwright install
```

2. Set credentials (recommended via env):

Windows PowerShell:

```powershell
$env:SM_USER = 'your-username'
$env:SM_PASS = 'your-password'
npm test
```

3. Tests live in `tests/`. Page objects live in `src/pages/`.
