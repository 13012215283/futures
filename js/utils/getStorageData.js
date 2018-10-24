import { AsyncStorage } from 'react-native';
/* eslint-disable no-console */
export async function getStorageData(key) {
  let value;
  try {
    value = await AsyncStorage.getItem(key);
  } catch (e) {
    throw e;
  }
  return value;
}

export async function getStorageAllData(keys) {
  let data;
  try {
    data = await AsyncStorage.multiGet(keys);
  } catch (e) {
    throw e;
  }
  return data;
}
