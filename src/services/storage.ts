import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'worship-flow-secure-session' });

export const secureStorage = {
  getString: (key: string) => storage.getString(key),
  setString: (key: string, value: string) => storage.set(key, value),
  delete: (key: string) => storage.delete(key),
};
