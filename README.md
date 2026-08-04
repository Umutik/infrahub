# InfraHub

InfraHub is a full-stack infrastructure asset management application built as a portfolio project to practice modern QA Automation and full-stack development.

The project includes authentication, asset management, filtering, search, dashboard statistics, and an end-to-end Playwright automation framework following the Page Object Model (POM) pattern.

---

## Tech Stack

### Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Backend
- Supabase
- PostgreSQL
- Supabase Authentication

### Testing
- Playwright
- Page Object Model (POM)

---

## Features

- User authentication
- Dashboard with asset statistics
- Create, edit, delete assets
- Search assets
- Filter by:
  - Status
  - Asset Type
  - Environment
- Responsive UI

---

## Test Coverage

Playwright end-to-end tests cover:

- Login
- Dashboard
- Asset CRUD
- Search
- Status filter
- Asset Type filter
- Environment filter
- Clear filters
- Smoke test

Current suite:

- ✅ 14 Playwright tests
- ✅ Page Object Model architecture
- ✅ Independent test data
- ✅ Smoke test for critical user journey

---

## Running the Project

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

Run all Playwright tests:

```bash
npx playwright test
```

Run smoke tests:

```bash
npx playwright test tests/e2e/smoke/smoke.spec.ts
```

Open the Playwright HTML report:

```bash
npx playwright show-report
```

---

## Project Structure

```text
app/
components/
lib/
pages/
tests/
  e2e/
    auth/
    assets/
    smoke/
pages/
  LoginPage.ts
  DashboardPage.ts
  AssetsPage.ts
  AssetFormPage.ts
```

---

## Future Improvements

- GitHub Actions CI
- Docker support
- Deployment
- Device management module
- Business Services module
- API test expansion

---

## Author

Built by Uma as a QA Automation portfolio project using Next.js, Supabase, and Playwright.