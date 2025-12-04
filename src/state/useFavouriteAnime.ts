import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { FetchAnimeByIdResponse as Anime } from "../types/jikan";


const STORAGE_KEY = "favourite-anime";

type FavouriteAnimeStore = {
  loading: boolean;
  list: Anime[];
  error: Error | null;
  didTryLoad: boolean;

  loadFavourites: () => Promise<void>;
  addFavourite: (anime: Anime) => Promise<void>;
  removeFavourite: (anime: Anime) => Promise<void>;
};

export const useFavouriteAnimeStore = create<FavouriteAnimeStore>(
  (set, get) => ({
    loading: false,
    list: [],
    error: null,
    didTryLoad: false,

    loadFavourites: async () => {
      if (get().loading) return;
    
      try {
        set(() => ({ loading: true }));
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const currList = (jsonValue != null ? JSON.parse(jsonValue) : []) as Anime[];

        set(() => ({ list: currList, didTryLoad: true }));
      } catch (err) {
        console.error(err);
      } finally {
        set(() => ({ loading: false }));
      }
    },
    addFavourite: async (anime: Anime) => {
        if (get().loading) return;

        try {
            set(() => ({ loading: true }));
            let currList = get().list; 

            if (!currList?.length && !get().didTryLoad) {
                const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
                currList = (jsonValue != null ? JSON.parse(jsonValue) : []) as Anime[];
            }

            const updatedList = [...currList, anime];

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
            set(() => ({ list: updatedList }));
        } catch (err) {
            console.error(err);
        } finally {
            set(() => ({ loading: false }));
        }
    },
    removeFavourite: async (anime: Anime) => {
        if (get().loading) return;

        try {
            set(() => ({ loading: true }));
            let currList = get().list; 

            if (!currList?.length && !get().didTryLoad) {
                const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
                currList = (jsonValue != null ? JSON.parse(jsonValue) : []) as Anime[];
            }

            const updatedList = currList.filter(a => a.mal_id !== anime.mal_id);

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
            set(() => ({ list: updatedList }));
        } catch (err) {
            console.error(err);
        } finally {
            set(() => ({ loading: false }));
        }
    },
  })
);
