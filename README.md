# Worship Flow Mobile

Expo/React Native mobile client for Worship Flow.

## First-time setup

The TypeScript errors that say modules such as `react-native`, `react/jsx-runtime`, `expo-router`, `@tanstack/react-query`, `zod`, or `@hookform/resolvers/zod` cannot be found mean that the project dependencies have not been installed in the current checkout.

Run these commands from the repository root:

```bash
npm install
npm run typecheck
npm start
```

If VS Code still shows the same errors after installing dependencies:

1. Make sure VS Code is opened at the repository root, not inside `src/` or `app/`.
2. Run **TypeScript: Restart TS Server** from the command palette.
3. Confirm `node_modules/expo/tsconfig.base.json`, `node_modules/react/jsx-runtime.js`, and `node_modules/react-native/package.json` exist.

## Useful scripts

```bash
npm run typecheck
npm start
npm run android
npm run ios
npm run web
```
