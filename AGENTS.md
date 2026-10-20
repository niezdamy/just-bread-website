# Agent instructions

## Project overview

Just Bread is the public website for the Just Bread app ([justbread.app](https://justbread.app/)). It is a Vue 3 + TypeScript application built with Vite and `vite-ssg`, styled with Tailwind CSS, and localized in Polish and English with Vue I18n.

The main application code is in `src/`:

- `src/pages/` contains the home page, calculators, hydration guide, FAQ, privacy, and contact pages.
- `src/components/` contains shared UI such as navigation and app download buttons.
- `src/locales/` contains the Polish (`pl.json`) and English (`en.json`) translations.
- `src/router.ts` defines the site routes; `src/main.ts` sets up the app, localization, SSG, and analytics.
- `src/assets/` contains images and other assets used by the site.

Vitest tests live alongside the components and pages in `src/`. The production build runs `vue-tsc` before generating the static site with `vite-ssg`.

## Working agreements

- Read the relevant code, tests, and configuration before making a change. Follow existing patterns and keep changes focused.
- Preserve the site's existing behavior, accessibility, responsive layout, and Polish/English support. When changing user-facing copy, update both locale files where applicable.
- Add or update tests for changed behavior. After code changes, run the relevant tests; before handing off, run the full checks listed below.
- If tests fail, determine whether the failure is a regression or an intended behavior change. Fix regressions in the implementation; update tests only when the expected behavior has intentionally changed. Do not delete or weaken tests just to make them pass.
- Do not edit generated output in `dist/` or installed dependencies in `node_modules/`. Update source files instead.
- Use `npm ci` to install the locked dependencies. If dependencies change, update and commit `package-lock.json` with the manifest.
- Do not add secrets or commit local environment files. Follow `.env.example` for environment variable names.
- Do not claim checks passed unless they have been run successfully; report any checks that could not be run.

## Checks required before a PR to `main`

The GitHub Actions CI workflow runs on every pull request and on pushes to `main`. It uses Node.js 22, installs dependencies with `npm ci`, and runs these checks in order:

```bash
npm ci
npm run lint
npm test
npm run build
```

Run all four commands locally before opening a PR to `main`, and make sure the CI workflow is green before merging. The production build in CI sets `VITE_GA_MEASUREMENT_ID` from the `GA_MEASUREMENT_ID` secret and sets `VITE_SITE_URL` to `https://justbread.app`; deployment also provides the PostHog environment variables.
