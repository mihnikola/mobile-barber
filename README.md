# Barber App (mobile)

Expo / React Native app for booking barber appointments: locations → services → barber → date/time, appointments overview, auth (email + OTP, Google, Apple), push notifications.

- **Stack:** Expo SDK 58 · React Native 0.88 · expo-router · Firebase Messaging
- **Refactor log:** see [PROJECT.md](PROJECT.md) — status, decisions and full change history of the ongoing restructuring (branch `claude`).

> ⚠️ **Expo Go does not work** with this app (Firebase, Google/Apple sign-in are native modules). You always run a native build on a device/emulator.

---

## 1. Requirements

| Tool | Version / note |
|---|---|
| Node.js | 20+ (tested with 24) |
| JDK | 17 (`JAVA_HOME` set) |
| Android SDK | platforms 35/36, NDK 27, `ANDROID_HOME` set, `platform-tools` on PATH |
| Device | Android phone with **USB debugging** on (or an emulator) — check with `adb devices` |
| **Project location (Windows)** | **Short path, e.g. `C:\dev\mb`.** Native C++ builds (react-native-worklets/reanimated) embed the project path twice; deep folders exceed Windows' 260-char limit and fail with `ninja: error: mkdir(...): No such file or directory` |
| iOS | only via EAS cloud build on Windows (local iOS builds need macOS + Xcode) |

## 2. Secret files (not in git — ask the team)

| File | Used for |
|---|---|
| `.env` | `EXPO_PUBLIC_API_URL=<backend url>` |
| `firebase/google-services.json` | Android build (Firebase console → Android app `fta.barber.app`) |
| `firebase/GoogleService-Info.plist` | iOS build |

Without `google-services.json` the Android build fails.

## 3. First run / after native changes

```bash
npm i                       # install dependencies
npx expo install            # optional: same as install when no package is given
npx expo prebuild --clean   # (re)generate the android/ folder from app.config.ts
npx expo run:android        # build, install on the phone, start Metro
```

- `android/` and `ios/` are **generated** (gitignored) — never edit them by hand; change `app.config.ts` or a config plugin instead.
- The first build takes 10–20 min. Later builds are incremental.
- `npx expo install` **with no package name** is just an install. Don't run `npx expo install --fix` / `--check` unless you intend to change dependency versions.

## 4. Daily development (fast)

Once the app is installed on the phone you usually **don't need to rebuild**:

```bash
npx expo start              # start Metro, open the installed app → JS changes hot-reload
```

| You changed… | Do this |
|---|---|
| JS/TS code, styles, images | nothing — Metro reloads (`npx expo start` if it isn't running) |
| Added/removed a package **with native code**, `app.config.ts`, a config plugin, Firebase files | `npx expo run:android` |
| Native build behaves strangely / config changes not applied | `npx expo prebuild --clean` → `npx expo run:android` |
| Switched git branch | `npm i`, then rebuild only if `package.json` / `app.config.ts` differ |

`prebuild --clean` deletes `android/` and throws away Gradle's incremental work — use it only when needed.

## 5. npm scripts

| Script | What it does |
|---|---|
| `npm start` | `expo start` (Metro) |
| `npm run android` | `expo run:android` (native build + run) |
| `npm run ios` | `expo run:ios` (macOS only) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run format -- <files>` | Prettier on given files (don't format the whole repo) |
| `npm run build:apk` | EAS cloud build, Android, profile `development` (APK) |
| `npm run build:ios` | ⚠️ EAS iOS build **+ auto-submit to App Store** |
| `npm run submit:android` | ⚠️ EAS Android build **+ auto-submit to Play Store** |
| `npm run push:update` | ⚠️ publishes an **OTA update to production users** |

## 6. EAS cloud builds

```bash
npx eas-cli login           # account with access to org "fusion-tech-agency"
npx eas-cli build -p android --profile development
```

- EAS uploads your local working copy (no push needed), but **gitignored files are not uploaded** → `.env` and `firebase/` must exist as EAS environment variables: `EXPO_PUBLIC_API_URL`, `GOOGLE_SERVICES_JSON`, `GOOGLE_SERVICE_INFO_PLIST`.
- The `development` profile is a normal APK with the JS bundled in (no dev client) — it does not connect to Metro.

## 7. Making builds faster (Windows)

1. **Windows Defender exclusions** (admin PowerShell) — often the biggest win:
   ```powershell
   Add-MpPreference -ExclusionPath "<path to this repo>"
   Add-MpPreference -ExclusionPath "$env:USERPROFILE\.gradle"
   Add-MpPreference -ExclusionPath "$env:USERPROFILE\.android"
   Add-MpPreference -ExclusionPath "$env:ANDROID_HOME"
   ```
2. Don't rebuild for JS changes (section 4), avoid unnecessary `prebuild --clean`.
3. Debug builds already compile only for the connected phone's CPU architecture (don't pass `--all-arch`).
4. Planned in the refactor (Phase 0.5, see PROJECT.md §4.1): more Gradle memory + build cache via config plugin, removal of unused native modules, EAS build cache.

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| `buildCMakeDebug ... FAILED` + `ninja: error: mkdir(CMakeFiles/...): No such file or directory` | Windows path too long. Move the project to a short path (`C:\dev\mb`), then: `cd android && gradlew --stop`, delete `android/` and all `node_modules/**/android/.cxx`, run `npx expo prebuild --clean` → `npx expo run:android`. Quick temporary alternative: `subst M: "<current project path>"`, `cd /d M:\` and build from `M:` |
| `File google-services.json is missing` | add `firebase/google-services.json` (section 2) |
| `adb devices` shows nothing / `unauthorized` | reconnect USB, accept the "Allow USB debugging" prompt on the phone |
| App opens but can't reach Metro | same Wi-Fi as the PC, or `adb reverse tcp:8081 tcp:8081` |
| Native change not visible | `npx expo run:android` (or `prebuild --clean` first) |
| Weird Gradle errors after branch switch | `npm i` → `npx expo prebuild --clean` → `npx expo run:android` |

## 9. Project structure

```
app/                 screens & routes (expo-router, file-based)
components/          feature components + feature hooks
shared-components/   shared UI (being consolidated into components/ui — see PROJECT.md §3.1)
context/             React contexts (auth, localization, reservation, …)
api/                 axios client
helpers/             utilities, locales (en / sr)
services/            notifications, internet guard
constants/           colors, image URLs
```
