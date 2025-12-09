import { create } from "zustand";
import {
  addFavourite,
  getFavouritesFromStorage,
  removeFavourite,
} from "../api/favourites";
import { FetchAnimeByIdResponse as Anime } from "../types/jikan";

type FavouriteStore = {
  favourites: Record<string, Anime>;
  loadingFavourites: boolean;

  loadFavourites: () => Promise<void>;
  toggleFavourite: (anime: Anime) => Promise<void>;
};

export const useFavouriteStore = create<FavouriteStore>((set, get) => ({
  favourites: {},
  loadingFavourites: false,

  loadFavourites: async () => {
    set(() => ({ loadingFavourites: true }));
    try {
      const favourites = await getFavouritesFromStorage();
      set(() => ({ favourites }));
    } finally {
      set(() => ({ loadingFavourites: false }));
    }
  },
  toggleFavourite: async (anime: Anime) => {
    const exists = get().favourites.hasOwnProperty(anime.mal_id);

    let updatedFavs = {};
    if (!exists) {
      updatedFavs = await addFavourite(anime);
    } else {
      updatedFavs = await removeFavourite(anime);
    }

    set(() => ({ favourites: updatedFavs }));
  },
}));
