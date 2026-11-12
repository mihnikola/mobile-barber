# Mobile Barber — Refactoring Project Log

Living document for the restructuring / optimization effort.
Every change and every decision is recorded here. Newest entries go on top of their section.

- **Started:** 2026-11-12
- **Working branch:** `claude` ONLY — no changes on any other branch (user rule). Base: `origin/dev` @ `b4f71be`.
- **Goals (in order):**
  1. Reusability: extract reusable components, logic (hooks/utils) and styling (design tokens).
  2. Apply a completely new visual style on top of that foundation.

---

## 1. Project snapshot (as of 2026-11-12)

### Stack
| Area | Tech |
|---|---|
| Runtime | Expo SDK 58, React Native 0.88, React 19.3 |
| Navigation | expo-router (file-based, route groups) |
| Language | Mixed: ~150 TS/TSX files, ~86 JS/JSX files (`strict: true`, but most props typed `any`) |
| State | 9 React Contexts (no external store) |
| HTTP | axios wrapper in `api/apiService.js` (token, timezone, language headers) |
| Auth | Email/password + OTP, Google Sign-In, Apple Sign-In |
| Push | Firebase Messaging + expo-notifications |
| i18n | Custom: `helpers/en-locale.js` / `helpers/srb-locale.js` via `LocalizationContext` |
| Styling | `StyleSheet.create` per file + `constants/Colors.ts` (`ColorsBarber`) |
| Tests | 1 snapshot test (for an unused Expo template component) |

### Structure
```
app/                     routes (expo-router): (tabs)/01_home, 02_barbers, 03_calendar, 04_settings, (z_auth), (reservation_notification)
components/<feature>/    feature components + feature hooks (login, register, reservation, services, ...)
shared-components/       ~55 "shared" UI pieces (flat folder)
context/                 Auth, Localization, Company, Reservation, Appointment, Navigation, Internet, GlobalError, ForegroundNotification
helpers/                 date utils, token storage, locales, error-handler bus
services/                notifications, internet guard
api/                     axios instance + get/post/put/patch/delete
constants/               Colors + two cover image URLs
```
~16.9k lines of app code (excluding locales assets).

---

## 2. Analysis findings

### 2.1 Styling
- **111 files** each define their own `StyleSheet.create` — no shared style primitives.
- **186** literal `fontFamily: "OldStandard-..."` occurrences. The alias `OldStandard-*` actually loads **Barlow Condensed** (see `app/_layout.tsx`) — misleading name. `OldStandardTT-*` and `SpaceMono` font files are bundled but unused.
- **88** hardcoded hex colors outside `Colors.ts` (`#333`, `#333333`, `#1E1E1E`, `#CCCCCC`, `#FFFFFF`/`#ffffff`/`#fff` …) plus **18** named colors (`"red"`, `"white"`, `"grey"`). Same color written several ways.
- No typography or spacing scale: font sizes 13/14/15/16/18/20/22/25/28/32 used ad hoc.
- `constants/Colors.ts` has `light`/`dark` keys, but the app is dark-only; `light` and `ColorsHairSalon` are effectively dead. Key names are inconsistent (`borderColorDisabeld`, `textColor` vs `text`).
- Expo template theming (`Themed.tsx`, `ThemedText`, `ThemedView`, `useThemeColor`, `useColorScheme*`) exists but is not used by the app.

### 2.2 Component reusability
- `shared-components/` is a flat folder of ~55 files mixing primitives (button, input), domain cards (employer/service/location), screens (SplashScreen, SuccessScreen) and wrappers.
- **Overlapping variants of the same thing:**
  - Buttons: `Button.tsx` (unused), `SharedButton.tsx`, `SharedButtonDateReservation.tsx`, `SharedBackButton.tsx`, `CustomAppleButton`, `CustomGoogleButton`.
  - Inputs: `SharedInput` (handles text, password and phone via prop flags), `InputItem` (unused), `SharedPassword`, `SharedConfirmPassword`, `SharedPhoneNumber`, `SharedInputTextArea`, `SharedInputTextAreaMark`, `SharedNameEdit`.
  - Cards/items: `SharedItem`, `SharedItemEmployer`, `SharedItemEmployerCard`, `SharedEmployerCard`, `SharedDetailsEmployerCard`, `DetailsEmployer`, `SharedItemService`, `SharedItemServiceCard`, `SharedDetailsServiceCard`, `DetailsServices`, `SharedItemLocation` … (several unused).
  - Loaders: `components/Loader`, `components/LoaderDate`, `shared-components/SharedLoader` (modal overlay).
  - Reservation cards: `CardReservation`, `CardReservationItem`, `CardReservationPending`, `CardReservationRejected`, `CardNoReservation`.
- Good existing pieces worth keeping: `TouchableOpacity` (press-lock debounce), `withSafeArea` HOC (18 screens), `HeaderCoverImageContainer` (14 usages).

### 2.3 Logic reusability
- **Duplicated form hooks:** `useEmail` ×3, `usePassword` ×3, `useConfirmPassword` ×2 across login/register/forgotPass/changePass — each with slightly different validation (regexes copy-pasted, one uses `setTimeout` for validation without cleanup).
- **Duplicated fetch pattern:** every `useFetch*` hook re-implements `isLoading / error / data` + try/catch + `response.status === 200` check.
- **Navigation inside data hooks** (e.g. `useFetchServices` calls `router.push`) — mixes concerns.
- `helpers/index.js` (362 lines) is a grab-bag of date utilities with near-duplicates (`formatDateBrate` vs `formatDatePrettier`, month arrays repeated).
- API endpoints are string literals scattered in hooks/contexts.
- `apiService.js`: every method is `try { … } catch (e) { throw e }` (no-op); response interceptor returns `undefined` (instead of rejecting) when error has no `data.message` — network errors silently resolve.

### 2.4 Bugs / risks found during analysis
| # | Issue | Location |
|---|---|---|
| B1 | `convertDate` and `convertDateDetails` call `useLocalization()` (a hook) inside plain functions → Rules of Hooks violation, fragile | `helpers/index.js` |
| B2 | Response interceptor swallows errors without `response.data.message` (timeouts, network) | `api/apiService.js` |
| B3 | `useCallback(..., [])` captures stale `localization` → validation messages don't change after language switch | `components/*/hooks/useEmail.js` |
| B4 | `SharedInput` reads `props.value.length` → crash if `value` is undefined | `shared-components/SharedInput.tsx` |
| B5 | Google client IDs hardcoded in source | `context/AuthContext.jsx` |
| B6 | `tsconfig.json` `include` lists files that no longer exist | `tsconfig.json` |
| B7 | `i18next` / `react-i18next` installed but unused | `package.json` |

### 2.5 Dead code (candidates, verified by import search)
Not imported anywhere:
`components/changePass/SplashScreenEmail.js`, `components/ExternalLink.tsx`, `components/forgotPass/RadioButton.js`, `components/HapticTab.tsx`, `components/HelloWave.tsx`, `components/notFound/index.jsx`, `components/otpCode/hooks/useSendEmailVerification.js`, `components/reservation/datereservation.tsx`, `components/reservation/DateTimeReservation.tsx`, `components/reservation/hooks/{useCancelReservation, useFetchReservation, useRateReservation, useReservationCancellationAlert, useReservationHandler, useReservationRateAlert, useSubmitReservation}.js`, `components/settings/SettingsHeaderTitle.jsx`, `components/SignForm/RegisterForm.jsx`, `components/StyledText.tsx`, `components/ThemedView.tsx`, `components/useClientOnlyValue*.ts`, `shared-components/{Avatar, Button, CustomCheckbox, DetailsEmployer, DetailsServices, InfoComponent, InputItem, SharedEmployerCard, SharedImageForgotPass, SharedItem, SharedItemEmployer, SharedItemService, SharedLabel, SplashScreen, SuccessScreen}`, `context/ForegroundNotificationHandler.tsx`.
(~40 files. To be re-verified with the TS compiler/bundler before deletion.)

> ✅ Done 2026-11-12 (Phase 0.2). Re-verification corrected the list: `components/notFound/index.jsx` **is used** (by `components/locations/Locations.jsx`) → kept; `components/useColorScheme.web.ts` is the web variant of a used file → kept. Added the unused Expo template chain (`ThemedText` + its test/snapshot, `hooks/useThemeColor`, `hooks/useColorScheme*`) and 4 never-loaded fonts (`OldStandardTT-*`, `SpaceMono`). Total: 43 source files + 4 fonts removed.

### 2.6 Hygiene
- 72 `console.log/error/warn` calls left in code.
- 26 `any` usages in props; most shared components untyped.
- No ESLint / Prettier config.
- Comments mix Serbian and English.
- `node_modules` not installed locally yet → no compile baseline captured.

---

## 3. Target architecture (proposed)

```
theme/
  colors.ts        semantic color tokens (background, surface, text.primary, text.muted, accent, danger, border …)
  typography.ts    font families + text variants (h1, h2, title, body, caption, button)
  spacing.ts       spacing scale (4-pt), radii, shadows
  index.ts         `theme` object + `useTheme()` hook
components/ui/     design-system primitives (no business logic)
  AppText, Button (variants: primary/secondary/ghost/social, loading, disabled),
  TextInput (+ PasswordInput, PhoneInput), TextArea, Card, ListItem,
  Screen (safe area + background + scroll), ScreenHeader / CoverHeader,
  Loader (inline | overlay), EmptyState, Avatar/Initials, Divider, Modal/Dialog, Pressable (press-lock)
components/<domain>/  domain components built from ui/ (EmployeeCard, ServiceCard, LocationCard, ReservationCard …)
features/<feature>/   screen-level containers + feature hooks (auth, booking, appointments, settings, home)
hooks/             generic hooks: useAsync/useQuery, useForm/useField, useDebounce
lib/
  api/             client + endpoints.ts (all URLs in one place) + typed service functions
  date/            pure date utils (locale passed in, no hooks)
  validation/      email/password/phone validators
  storage/         AsyncStorage wrappers
```

Principle: **phases 1–4 are visually neutral** (same look, new structure). Then the new design is applied mostly by changing `theme/` and `components/ui/`, not 100+ screens.

---

## 4. Roadmap

| Phase | Scope | Visual change? | Status |
|---|---|---|---|
| 0 | Safety net: install deps, capture `tsc` baseline, add ESLint + Prettier, fix `tsconfig` include, remove verified dead code, fix B1–B4 | No | Planned |
| 1 | Design tokens: `theme/` (colors, typography, spacing, radii); replace hardcoded hex / font literals; rename font alias | No | Planned |
| 2 | UI primitives in `components/ui/`; consolidate button/input/loader/card variants; migrate usages | No | Planned |
| 3 | Shared logic: API endpoints + typed services, `useAsync` fetch hook, unified form/validation hooks, pure date utils | No | Planned |
| 4 | Feature restructure: domain components, move nav out of data hooks, JS→TS conversion per touched file, slim contexts | No | Planned |
| 5 | New styling: new tokens + restyled primitives, screen-by-screen polish | **Yes** | Planned |

All work is committed on the `claude` branch only (small commits per step). Merging into `dev` is done by the user via PR.

### Verification after every step
1. `npx tsc --noEmit` — error count must not grow (baseline below).
2. `npx expo export --platform android --output-dir <tmp>` — JS bundle must build (catches broken imports).
3. Manual smoke test in the app by the user at the end of each phase.

| Metric | Baseline (b4f71be) | Current |
|---|---|---|
| TS errors (`tsc --noEmit`) | 305 | 277 |
| Android bundle export | OK (5.4 MB hbc) | OK |
| `expo-doctor` | 1 check failed (12 packages behind SDK 58 patch versions — out of scope) | — |

---

## 5. Decision log

Format: `D-<n> | date | status | decision — reason`. Status: Proposed / Accepted / Rejected / Superseded.

- **D-001 | 2026-11-12 | Accepted** | Keep custom localization (`LocalizationContext`) for now; remove unused `i18next` deps. — Migrating i18n is out of scope for reusability/styling; fewer deps.
- **D-002 | 2026-11-12 | Accepted** | Do structure first, visuals last; phases 0–4 must not change the look. — Makes regressions easy to spot and makes the redesign a token/primitive swap.
- **D-003 | 2026-11-12 | Accepted** | Plain `StyleSheet` + a typed `theme` object, no styling library (NativeWind/Tamagui/Unistyles). — Lowest migration risk, no new build tooling; can revisit before phase 5.
- **D-004 | 2026-11-12 | Accepted** | App stays dark-only; theme has a single palette (structured so a light palette could be added later). — Current app has no light mode in use.
- **D-005 | 2026-11-12 | Accepted** | Convert files to TypeScript when they are touched, not in a big-bang pass. — Keeps PRs reviewable.
- **D-006 | 2026-11-12 | Accepted** | Keep `TouchableOpacity` press-lock behaviour and `withSafeArea`, absorbed into `ui/Pressable` and `ui/Screen`. — Proven pieces already used widely.
- **D-007 | 2026-11-12 | Accepted** | All refactor work happens on the `claude` branch only; nothing is changed on `dev` or other branches. `claude` was fast-forwarded to `origin/dev` (`b4f71be`) before starting. — User rule; fast-forward keeps us on the team's latest code without touching other branches.
- **D-008 | 2026-11-12 | Accepted** | Dependency version upgrades (expo-doctor warnings, npm audit) are out of scope for this refactor. — Avoids mixing behavioural risk with structural changes.

---

## 6. Change log

### 2026-11-12
- **Phase 0.2 — dead code removed.** 43 unused source files + 4 unused fonts deleted (see §2.5). TS errors 305 → 277, bundle OK. Note: `npm test` now has no tests (the only test covered a dead template component); real tests come with pure utils in Phase 3.
- Phase 0 started. Decisions D-001…D-006 accepted by user; D-007, D-008 added.
- `claude` fast-forwarded to `origin/dev` (`b4f71be`, NotificationService cleanup by team).
- Installed deps with `npm ci` (lockfile untouched). Captured baseline: 305 TS errors, Android bundle builds.
- Created `PROJECT.md` with initial analysis, target architecture, roadmap and proposed decisions. No code changes.
