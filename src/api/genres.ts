import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "expo-constants";
import { FetchAnimeGenresResponse as AnimeGenre } from "../types/jikan";

const APP_NAME = constants.expoConfig?.name ?? "anime-explorer";
const STORAGE_KEY = `${APP_NAME}/anime-genres`;

export async function getAnimeGenresFromStorage(): Promise<AnimeGenre[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (err) {
    console.error(`[${STORAGE_KEY}] READING FROM STORAGE:`, err);
    throw err;
  }
}

export async function saveAnimeGenres(genres: AnimeGenre[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(genres));
  } catch (err) {
    console.error(`[${STORAGE_KEY}] WRITING TO STORAGE:`, err);
    throw err;
  }
}
