import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "expo-constants";
import { FetchAnimeByIdResponse as Anime } from "../types/jikan";

const APP_NAME = constants.expoConfig?.name ?? "anime-explorer";
const STORAGE_KEY = `${APP_NAME}/favourites`;

export async function getFavouritesFromStorage(): Promise<
  Record<string, Anime>
> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (err) {
    console.error(`[${STORAGE_KEY}] READING FROM STORAGE:`, err);
    throw err;
  }
}

export async function addFavourite(anime: Anime) {
  try {
    const favourites = await getFavouritesFromStorage();
    const updated = { ...favourites, [anime.mal_id]: anime };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error(`[${STORAGE_KEY}] SAVE FAVOURITE TO STORAGE:`, err);
    throw err;
  }
}

export async function removeFavourite(anime: Anime) {
  try {
    const favourites = await getFavouritesFromStorage();
    const { [anime.mal_id]: _, ...updated } = favourites;

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error(`[${STORAGE_KEY}] REMOVE FAVOURITE FROM STORAGE:`, err);
    throw err;
  }
}
