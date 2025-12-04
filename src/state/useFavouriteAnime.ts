import { create } from "zustand";
import {
    addFavourite,
    getFavourites,
    removeFavourite,
} from "../api/favourites";
import { FetchAnimeByIdResponse as Anime } from "../types/jikan";

type FavouriteAnimeStore = {
  loading: boolean;
  list: Anime[];
  error: Error | null;

  loadFavourites: () => Promise<void>;
  addFavourite: (anime: Anime) => Promise<void>;
  removeFavourite: (anime: Anime) => Promise<void>;
};

export const useFavouriteAnimeStore = create<FavouriteAnimeStore>(
  (set, get) => ({
    loading: false,
    list: [],
    error: null,

    loadFavourites: async () => {
      if (get().loading) return;

      try {
        set(() => ({ loading: true }));
        const currList = await getFavourites();
        set(() => ({ list: currList }));
      } catch (err) {
        console.error(err);
        set(() => ({ error: err as unknown as Error }));
      } finally {
        set(() => ({ loading: false }));
      }
    },
    addFavourite: async (anime: Anime) => {
      if (get().loading) return;

      try {
        set(() => ({ loading: true }));
        const updatedList = await addFavourite(anime);
        set(() => ({ list: updatedList }));
      } catch (err) {
        console.error(err);
        set(() => ({ error: err as unknown as Error }));
      } finally {
        set(() => ({ loading: false }));
      }
    },
    removeFavourite: async (anime: Anime) => {
      if (get().loading) return;

      try {
        set(() => ({ loading: true }));
        const updatedList = await removeFavourite(anime);
        set(() => ({ list: updatedList }));
      } catch (err) {
        console.error(err);
        set(() => ({ error: err as unknown as Error }));
      } finally {
        set(() => ({ loading: false }));
      }
    },
  })
);
