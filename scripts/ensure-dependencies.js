#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const requiredPackages = [
  'expo',
  'react',
  'react-native',
  'expo-router',
  '@tanstack/react-query',
  '@hookform/resolvers',
  'zod',
];

const missingPackages = requiredPackages.filter((packageName) => {
  const packageJsonPath = path.join(projectRoot, 'node_modules', ...packageName.split('/'), 'package.json');
  return !fs.existsSync(packageJsonPath);
});

if (missingPackages.length === 0) {
  process.exit(0);
}

console.error('\nNo se encontraron dependencias instaladas para Worship Flow Mobile.');
console.error('Paquetes faltantes:');
for (const packageName of missingPackages) {
  console.error(`- ${packageName}`);
}
console.error('\nEjecuta estos comandos desde la raíz del repositorio antes de iniciar Expo:');
console.error('  npm install');
console.error('  npm start');
console.error('\nEvita ejecutar `npx expo start` antes de instalar dependencias: cuando `node_modules/expo` no existe, npx puede intentar usar el expo-cli global/deprecado y mostrará "Unable to find expo in this project".\n');
process.exit(1);
