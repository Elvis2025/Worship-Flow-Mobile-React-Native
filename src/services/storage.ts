import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'worship-flow-session' });

export const secureStorage = {
  getString(key: string): string | null {
    return storage.getString(key) ?? null;
  },
  setString(key: string, value: string): void {
    storage.set(key, value);
  },
  delete(key: string): void {
    storage.delete(key);
  },
};
