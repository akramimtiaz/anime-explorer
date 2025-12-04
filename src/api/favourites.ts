import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchAnimeByIdResponse as Anime } from "../types/jikan";

const STORAGE_KEY = `anime-explorer/favourite-anime`;

export async function getFavourites(): Promise<Anime[]> {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return (jsonValue != null ? JSON.parse(jsonValue) : []) as Anime[];
}

export async function addFavourite(anime: Anime) {
    const list = await getFavourites();
    const updated = [...list, anime];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
}

export async function removeFavourite(anime: Anime) {
    const list = await getFavourites();
    const updated = list.filter(a => a.mal_id !== anime.mal_id);
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
}
