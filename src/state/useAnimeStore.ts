import { create } from "zustand";
import { fetchAnimesByGenre } from "../api/jikan";
import { FetchAnimeByGenreResponse } from "../types/jikan";

type AnimeStore = {
  currentPage: number;
  pagination: FetchAnimeByGenreResponse["pagination"] | null;
  list: FetchAnimeByGenreResponse["data"];
  currentGenreId?: number;
  fetchFirstPage: (genreId?: number) => Promise<void>;
  fetchNextPage: () => Promise<void>;
};

export const useAnimeStore = create<AnimeStore>(
  (set, get) => ({
    currentPage: 0,
    pagination: null,
    currentGenreId: undefined,
    list: [],

    fetchFirstPage: async (genreId?: number) => {
      if (get().currentGenreId && get().currentGenreId === genreId) return;

      if (get().currentGenreId !== genreId) {
        set(() => ({ currentGenreId: genreId }));
      }

      const response = await fetchAnimesByGenre(1, genreId);
      set(() => ({
        currentPage: 1,
        pagination: response.pagination,
        list: response.data,
      }));
    },
    fetchNextPage: async () => {
      if (get().pagination?.has_next_page === false) return;

      const response = await fetchAnimesByGenre(get().currentPage + 1, get().currentGenreId);

      set((state) => ({
        currentPage: state.currentPage + 1,
        pagination: response.pagination,
        list: [...state.list, ...response?.data],
      }));
    },
  }),
);
