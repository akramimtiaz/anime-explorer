import { create } from "zustand";
import { fetchAnimeList } from "../api/jikan";
import { FetchAnimeListResponse } from "../types/jikan";

type FetchAnimeListStore = {
  currentPage: number;
  loading: boolean;
  error: Error | null;
  pagination: FetchAnimeListResponse["pagination"] | null;
  list: FetchAnimeListResponse["data"];
  prevSelectedGenreId?: number;
  fetchNextPage: (genreId?: number) => Promise<void>;
};

export const useFetchAnimeListStore = create<FetchAnimeListStore>(
  (set, get) => ({
    currentPage: 0,
    loading: false,
    pagination: null,
    error: null,
    prevSelectedGenreId: undefined,
    list: [],

    fetchNextPage: async (genreId?: number) => {
      if (get().loading) return;
      if (get().pagination?.has_next_page === false) return;

      if (get().prevSelectedGenreId !== genreId) {
        set(() => ({ currentPage: 0, list: [] }));
      }

      try {
        set(() => ({ loading: true }));
        set(() => ({ prevSelectedGenreId: genreId }));
        const response = await fetchAnimeList(get().currentPage + 1, genreId);

        set((state) => ({
          currentPage: state.currentPage + 1,
          pagination: response.pagination,
          list: [...state.list, ...response?.data],
        }));
      } catch (err) {
        console.error(err);
        set(() => ({ error: err as unknown as Error }));
      } finally {
        set(() => ({ loading: false }));
      }
    },
  }),
);
