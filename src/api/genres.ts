import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_NAME } from "../constants";
import { FetchAnimeGenresResponse as AnimeGenre } from "../types/jikan";

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
    if (!Array.isArray(genres) || !genres?.length) {
      throw new Error('No genres provided');
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(genres));
  } catch (err) {
    console.error(`[${STORAGE_KEY}] WRITING TO STORAGE:`, err);
    throw err;
  }
}
