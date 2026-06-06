# Worship Flow Mobile

Expo/React Native mobile client for Worship Flow.

## First-time setup

If Expo prints this message:

```text
Unable to find expo in this project - have you run yarn / npm install yet?
```

or TypeScript says modules such as `react-native`, `react/jsx-runtime`, `expo-router`, `@tanstack/react-query`, `zod`, or `@hookform/resolvers/zod` cannot be found, the project dependencies have not been installed in the current checkout.

Run these commands from the repository root:

```bash
npm install
npm run typecheck
npm start
```

Use `npm start` after installing dependencies. Avoid running `npx expo start` before `npm install`; if `node_modules/expo` does not exist, `npx` may fall back to the deprecated global `expo-cli`, which is the warning shown in older terminals.

## VS Code troubleshooting

If VS Code still shows missing-module errors after installing dependencies:

1. Make sure VS Code is opened at the repository root, not inside `src/` or `app/`.
2. Run **TypeScript: Restart TS Server** from the command palette.
3. Confirm these files exist:
   - `node_modules/expo/tsconfig.base.json`
   - `node_modules/react/jsx-runtime.js`
   - `node_modules/react-native/package.json`

## Useful scripts

```bash
npm run setup
npm run check:deps
npm run typecheck
npm start
npm run android
npm run ios
npm run web
```
