import { create } from "zustand";
import { fetchAnimesByGenre } from "../api/jikan";
import { FetchAnimeByGenreResponse } from "../types/jikan";

type AnimeStore = {
  currentPage: number;
  pagination: FetchAnimeByGenreResponse["pagination"] | null;
  list: FetchAnimeByGenreResponse["data"];
  prevSelectedGenreId?: number;
  fetchNextPage: (genreId?: number) => Promise<void>;
};

export const useAnimeStore = create<AnimeStore>(
  (set, get) => ({
    currentPage: 0,
    pagination: null,
    prevSelectedGenreId: undefined,
    list: [],

    fetchNextPage: async (genreId?: number) => {
      if (get().pagination?.has_next_page === false) return;

      if (get().prevSelectedGenreId !== genreId) {
        set(() => ({ currentPage: 0, list: [] }));
      }
      set(() => ({ prevSelectedGenreId: genreId }));

      const response = await fetchAnimesByGenre(get().currentPage + 1, genreId);

      set((state) => ({
        currentPage: state.currentPage + 1,
        pagination: response.pagination,
        list: [...state.list, ...response?.data],
      }));
    },
  }),
);
