import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const MMKVStorage = {
  getItem: (key: string): Promise<string | null> => {
    const value = storage.getString(key);

    return Promise.resolve(value !== undefined ? value : null);
  },
  setItem: (key: string, value: any): Promise<void> => {
    storage.set(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string): Promise<void> => {
    storage.delete(key);
    return Promise.resolve();
  },
  getallItems: (): Promise<string[]> => {
    const keys = storage.getAllKeys();
    return Promise.resolve(keys);
  },
};

export default MMKVStorage;
