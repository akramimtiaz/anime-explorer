import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchAnimeByIdResponse as Anime } from "../types/jikan";

const STORAGE_KEY = `anime-explorer/favourite-anime`;

export async function getFavourites(): Promise<Record<string, Anime>> {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return (jsonValue != null ? JSON.parse(jsonValue) : {});
}

export async function addFavourite(anime: Anime) {
    const favourites = await getFavourites();
    const updated = { ...favourites, [String(anime.mal_id)]: anime };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
}

export async function removeFavourite(anime: Anime) {
    const favourites = await getFavourites();
    const { [String(anime.mal_id)]: _, ...updated } = favourites;
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
}
