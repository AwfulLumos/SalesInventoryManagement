# Automation Setup (2026-05-03)

This project now includes basic automation for linting, formatting, type checking, and tests.

## What was added
- ESLint configuration and scripts
- Prettier configuration and scripts
- Vitest setup with a small smoke test

## Scripts
- Lint: `npm run lint`
- Fix lint: `npm run lint:fix`
- Format check: `npm run format`
- Format write: `npm run format:write`
- Type check: `npm run typecheck`
- Tests (watch): `npm run test`
- Tests (single run): `npm run test:run`

## Notes
- Vitest uses `jsdom` for browser-like tests.
- The sample test lives in `src/shared/data/mockData.test.ts`.
