import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from 'expo-constants';

const APP_NAME = constants.expoConfig?.name ?? 'anime-explorer';
const STORAGE_KEY = `${APP_NAME}/anime-categories`;

export async function getAnimeCategoriesFromStorage() {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
};

export async function saveAnimeCategories(data: any) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}