import { create } from "zustand";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "../api/favourites";
import { FetchAnimeByIdResponse as Anime } from "../types/jikan";

type FavouriteAnimeStore = {
  loading: boolean;
  favourites: Record<string, Anime>;
  error: Error | null;

  loadFavourites: () => Promise<void>;
  isFavourite: (id: string) => boolean;
  toggleFavourite: (anime: Anime) => Promise<void>;
};

export const useFavouriteAnimeStore = create<FavouriteAnimeStore>(
  (set, get) => ({
    loading: false,
    favourites: {},
    error: null,

    loadFavourites: async () => {
      if (get().loading) return;

      try {
        set(() => ({ loading: true }));

        const currFavs = await getFavourites();
        set(() => ({ favourites: currFavs }));
      } catch (err) {
        console.error(err);
        set(() => ({ error: err as unknown as Error }));
      } finally {
        set(() => ({ loading: false }));
      }
    },
    toggleFavourite: async (anime: Anime) => {
      if (get().loading) return;

      try {
        set(() => ({ loading: true }));
        const exists = !!get().favourites[String(anime.mal_id)];
        
        let updatedFavs = {};
        if (!exists) {
           updatedFavs = await addFavourite(anime);
        } else {
           updatedFavs = await removeFavourite(anime);
        }

        set(() => ({ favourites: updatedFavs }));
      } catch (err) {
        console.error(err);
        set(() => ({ error: err as unknown as Error }));
      } finally {
        set(() => ({ loading: false }));
      }
    },
    isFavourite: (id: string) => !!get().favourites[id],
  })
);
